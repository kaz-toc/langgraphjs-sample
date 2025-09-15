import { Hono } from "hono";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../lib/user-service";
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsByUser,
} from "../lib/post-service";
import {
  createMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
  getMessagesByUser,
  getMessagesBySession,
} from "../lib/message-service";
import { graph, saveMessage } from "../agent/graph";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const app = new Hono<{ Bindings: Env }>();

// ヘルスチェック
app.get("/api/", (c) => c.json({ name: "Cloudflare", status: "ok" }));

// ユーザー関連のAPI
app.get("/api/users", async (c) => {
  try {
    const users = await getUsers();
    return c.json(users);
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

app.get("/api/users/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const user = await getUser(id);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user);
  } catch (error) {
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

app.post("/api/users", async (c) => {
  try {
    const data = await c.req.json();
    const user = await createUser(data);
    return c.json(user, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to create user", details: message }, 400);
  }
});

app.put("/api/users/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const user = await updateUser(id, data);
    return c.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to update user", details: message }, 400);
  }
});

app.delete("/api/users/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const user = await deleteUser(id);
    return c.json(user);
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
});

// 投稿関連のAPI
app.get("/api/posts", async (c) => {
  try {
    const published = c.req.query("published");
    const publishedFilter = published ? published === "true" : undefined;
    const posts = await getPosts(publishedFilter);
    return c.json(posts);
  } catch (error) {
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

app.get("/api/posts/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const post = await getPost(id);
    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }
    return c.json(post);
  } catch (error) {
    return c.json({ error: "Failed to fetch post" }, 500);
  }
});

app.post("/api/posts", async (c) => {
  try {
    const data = await c.req.json();
    const post = await createPost(data);
    return c.json(post, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to create post", details: message }, 400);
  }
});

app.put("/api/posts/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const post = await updatePost(id, data);
    return c.json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to update post", details: message }, 400);
  }
});

app.delete("/api/posts/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const post = await deletePost(id);
    return c.json(post);
  } catch (error) {
    return c.json({ error: "Failed to delete post" }, 500);
  }
});

app.get("/api/users/:id/posts", async (c) => {
  try {
    const authorId = parseInt(c.req.param("id"));
    const posts = await getPostsByUser(authorId);
    return c.json(posts);
  } catch (error) {
    return c.json({ error: "Failed to fetch user posts" }, 500);
  }
});

// チャット関連のAPI
app.post("/api/chat", async (c) => {
  try {
    const {
      message,
      userId,
      sessionId,
      mode = "with-history",
    } = await c.req.json();

    if (!message || typeof message !== "string") {
      return c.json({ error: "Message is required" }, 400);
    }

    // チャットモードを検証
    if (!["with-history", "without-history"].includes(mode)) {
      return c.json({ error: "Invalid chat mode" }, 400);
    }

    // ユーザーメッセージを保存（履歴保持モードの場合のみ）
    let userMessage = null;
    if (mode === "with-history") {
      userMessage = await saveMessage(message, "user", sessionId, userId);
    }

    // LangGraphでメッセージを処理
    let messages = [new HumanMessage(message)];

    // 履歴保持モードの場合、過去のメッセージも含める
    if (mode === "with-history" && sessionId) {
      try {
        const pastMessages = await getMessagesBySession(sessionId);
        // 過去のメッセージをLangChainのメッセージ形式に変換
        const langchainMessages = pastMessages.map((msg) => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          } else {
            return new AIMessage(msg.content);
          }
        });

        // 現在のメッセージを最後に追加
        messages = [...langchainMessages, new HumanMessage(message)];
      } catch (historyError) {
        console.warn("Failed to retrieve message history:", historyError);
        // 履歴取得に失敗した場合は現在のメッセージのみで処理を続行
      }
    }

    const result = await graph.invoke({
      messages,
    });

    // アシスタントの応答を取得
    const assistantResponse = result.messages[result.messages.length - 1];
    const responseContent = assistantResponse.content as string;

    // アシスタントメッセージを保存（履歴保持モードの場合のみ）
    let assistantMessage = null;
    if (mode === "with-history") {
      assistantMessage = await saveMessage(
        responseContent,
        "assistant",
        sessionId,
        userId
      );
    }

    return c.json({
      userMessage,
      assistantMessage,
      response: responseContent,
      mode,
    });
  } catch (error) {
    console.error("Chat error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to process chat", details: message }, 500);
  }
});

// メッセージ関連のAPI
app.get("/api/messages", async (c) => {
  try {
    const sessionId = c.req.query("sessionId");
    const messages = await getMessages(sessionId);
    return c.json(messages);
  } catch (error) {
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

app.get("/api/messages/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const message = await getMessage(id);
    if (!message) {
      return c.json({ error: "Message not found" }, 404);
    }
    return c.json(message);
  } catch (error) {
    return c.json({ error: "Failed to fetch message" }, 500);
  }
});

app.post("/api/messages", async (c) => {
  try {
    const data = await c.req.json();
    const message = await createMessage(data);
    return c.json(message, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to create message", details: message }, 400);
  }
});

app.put("/api/messages/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const data = await c.req.json();
    const message = await updateMessage(id, data);
    return c.json(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return c.json({ error: "Failed to update message", details: message }, 400);
  }
});

app.delete("/api/messages/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const message = await deleteMessage(id);
    return c.json(message);
  } catch (error) {
    return c.json({ error: "Failed to delete message" }, 500);
  }
});

app.get("/api/users/:id/messages", async (c) => {
  try {
    const userId = parseInt(c.req.param("id"));
    const messages = await getMessagesByUser(userId);
    return c.json(messages);
  } catch (error) {
    return c.json({ error: "Failed to fetch user messages" }, 500);
  }
});

app.get("/api/sessions/:sessionId/messages", async (c) => {
  try {
    const sessionId = c.req.param("sessionId");
    const messages = await getMessagesBySession(sessionId);
    return c.json(messages);
  } catch (error) {
    return c.json({ error: "Failed to fetch session messages" }, 500);
  }
});

export default app;
