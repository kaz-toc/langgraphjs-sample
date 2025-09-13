import { StateGraph, END, START, Annotation } from "@langchain/langgraph";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatAnthropic } from "@langchain/anthropic";

// Define the state annotation
const GraphState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (left: BaseMessage[], right: BaseMessage[]) => left.concat(right),
    default: () => [],
  }),
  userId: Annotation<string | undefined>({
    reducer: (left: string | undefined, right: string | undefined) =>
      right ?? left,
    default: () => undefined,
  }),
  sessionId: Annotation<string | undefined>({
    reducer: (left: string | undefined, right: string | undefined) =>
      right ?? left,
    default: () => undefined,
  }),
});

// Define the state type
export type GraphStateType = typeof GraphState.State;

// Initialize the LLM
const llm = new ChatAnthropic({
  model: "claude-3-sonnet-20240229",
  temperature: 0.7,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Define nodes
async function callModel(
  state: GraphStateType
): Promise<Partial<GraphStateType>> {
  const response = await llm.invoke(state.messages);
  return {
    messages: [response],
  };
}

async function shouldContinue(state: GraphStateType): Promise<string> {
  const lastMessage = state.messages[state.messages.length - 1];

  // Simple logic: if the last message is from AI, end the conversation
  if (lastMessage instanceof AIMessage) {
    return END;
  }

  return "call_model";
}

// Create the graph
export function createChatGraph() {
  const workflow = new StateGraph(GraphState)
    .addNode("call_model", callModel)
    .addEdge(START, "call_model")
    .addConditionalEdges("call_model", shouldContinue, {
      call_model: "call_model",
      [END]: END,
    });

  return workflow.compile();
}

// Export a default instance
export const chatGraph = createChatGraph();

// Export for LangGraph CLI
export default chatGraph;
