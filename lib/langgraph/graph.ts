import { StateGraph, END, START } from "@langchain/langgraph";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

// Define the state interface
export interface GraphState {
  messages: BaseMessage[];
  userId?: string;
  sessionId?: string;
}

// Initialize the LLM
const llm = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

// Define nodes
async function callModel(state: GraphState): Promise<Partial<GraphState>> {
  const response = await llm.invoke(state.messages);
  return {
    messages: [...state.messages, response],
  };
}

async function shouldContinue(state: GraphState): Promise<string> {
  const lastMessage = state.messages[state.messages.length - 1];

  // Simple logic: if the last message is from AI, end the conversation
  if (lastMessage instanceof AIMessage) {
    return END;
  }

  return "call_model";
}

// Create the graph
export function createChatGraph() {
  const workflow = new StateGraph<GraphState>({
    channels: {
      messages: {
        reducer: (left: BaseMessage[], right: BaseMessage[]) =>
          left.concat(right),
        default: () => [],
      },
      userId: {
        default: () => undefined,
      },
      sessionId: {
        default: () => undefined,
      },
    },
  });

  // Add nodes
  workflow.addNode("call_model", callModel);

  // Add edges
  workflow.addEdge(START, "call_model");
  workflow.addConditionalEdges("call_model", shouldContinue, {
    call_model: "call_model",
    [END]: END,
  });

  return workflow.compile();
}

// Export a default instance
export const chatGraph = createChatGraph();

// Export for LangGraph CLI
export default chatGraph;
