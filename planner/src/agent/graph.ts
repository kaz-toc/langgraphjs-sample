import {
  StateGraph,
  MessagesAnnotation,
  START,
  END,
} from "@langchain/langgraph";
import { ChatOllama } from "@langchain/ollama";
import { AIMessage } from "@langchain/core/messages";
import { createMessage } from "../lib/message-service";

let model: ChatOllama | null = null;
let modelProvider: "ollama" | null = null;

// Ollamaを使用（ローカルLLM）
try {
  model = new ChatOllama({
    baseUrl: "http://localhost:11434", // デフォルトのOllamaポート
    model: "llama3.1:8b", // 利用可能なモデルを使用
    temperature: 0.7,
  });
  modelProvider = "ollama";
  console.log("🦙 Ollama (llama3.1:8b) をローカルで使用します");
} catch (error) {
  console.warn("Ollama初期化に失敗しました:", error);
  model = null;
  modelProvider = null;
}

// チャットボット関数（Ollamaを使用、エラー時は例外をスロー）
async function chatbot(state: typeof MessagesAnnotation.State) {
  if (!model) {
    throw new Error(
      "Ollamaが利用できません。http://localhost:11434 でOllamaサーバーが起動していることを確認してください。"
    );
  }

  try {
    // ローカルOllama APIを使用
    const response = await model.invoke(state.messages);
    console.log(`🦙 Ollama API呼び出し成功`);
    return { messages: [response] };
  } catch (error) {
    console.error(`🦙 Ollama API呼び出しに失敗しました:`, error);
    // エラーを再スローして、上位でキャッチされるようにする
    throw error;
  }
}

// メッセージを保存する関数
export async function saveMessage(
  content: string,
  role: "user" | "assistant",
  sessionId?: string,
  userId?: number
) {
  return await createMessage({
    content,
    role,
    sessionId,
    userId: userId || undefined, // nullをundefinedに変換
  });
}

// LangGraphのワークフローを定義
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("chatbot", chatbot)
  .addEdge(START, "chatbot")
  .addEdge("chatbot", END);

// グラフをコンパイル
export const graph = workflow.compile();
