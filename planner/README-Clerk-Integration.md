# Clerk認証統合 - LangGraphJS チャットボット

このプロジェクトは、Clerkを使用したユーザー認証とセッション管理を統合したLangGraphJSチャットボットです。

## 🔐 Clerk認証機能

### 主な機能
- **ユーザー認証**: サインアップ/サインイン/サインアウト
- **セッション管理**: ユーザー固有のチャット履歴
- **ユーザーコンテキスト**: AIがユーザー情報を認識
- **パーソナライズ**: ユーザー名での挨拶と個別対応

### 認証フロー
1. **未認証ユーザー**: ログイン画面を表示
2. **認証中**: ローディング表示
3. **認証済み**: パーソナライズされたチャット画面

## 🚀 セットアップ手順

### 1. Clerkアカウントの作成
1. [Clerk Dashboard](https://dashboard.clerk.com/) でアカウントを作成
2. 新しいアプリケーションを作成
3. APIキーを取得

### 2. 環境変数の設定
```bash
# 完全セットアップ
make setup

# または手動で
make setup-env
```

`.env`ファイルを編集してClerkキーを設定：
```env
# Clerk認証キー
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Anthropic APIキー
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. 設定確認
```bash
# Clerk設定を確認
make check-clerk
```

## 🏗️ アーキテクチャ

### コンポーネント構造
```
src/
├── components/
│   ├── auth/
│   │   └── AuthenticatedChat.tsx    # 認証機能付きチャット
│   └── chat/
│       ├── ChatContainer.tsx        # チャットUI
│       ├── ChatMessage.tsx          # メッセージ表示
│       └── ChatInput.tsx           # メッセージ入力
├── lib/
│   └── langgraph-client.ts         # ユーザーコンテキスト対応
└── react-app/
    ├── main.tsx                    # ClerkProvider設定
    └── App.tsx                     # メインアプリ
```

### 認証統合ポイント

#### 1. ClerkProvider (main.tsx)
```tsx
<ClerkProvider publishableKey={clerkPubKey}>
  <App />
</ClerkProvider>
```

#### 2. 認証状態管理 (AuthenticatedChat.tsx)
```tsx
const { isSignedIn, user, isLoaded } = useUser();
const { getToken } = useAuth();
```

#### 3. ユーザーコンテキスト (LangGraphClient)
```tsx
const userContext = {
  userId: user.id,
  username: user.username || user.firstName,
  email: user.primaryEmailAddress?.emailAddress,
};
```

## 💻 開発コマンド

```bash
# 完全セットアップ
make setup

# 開発サーバー起動 (2つのターミナルで実行)
make dev         # LangGraph サーバー
make dev-react   # React アプリ

# 設定確認
make check-clerk

# ヘルプ
make help
```

## 🎯 使用方法

### 1. サーバー起動
```bash
# ターミナル1: LangGraphサーバー
make dev

# ターミナル2: Reactアプリ
make dev-react
```

### 2. アクセス
- React アプリ: `http://localhost:5173`
- LangGraph Studio: `http://localhost:8123`

### 3. 認証フロー
1. ブラウザでアプリにアクセス
2. "ログイン / サインアップ" ボタンをクリック
3. Clerkの認証モーダルでサインアップ/サインイン
4. 認証後、パーソナライズされたチャットを開始

## 🔧 カスタマイズ

### 認証設定のカスタマイズ
`src/components/auth/AuthenticatedChat.tsx`で以下をカスタマイズ可能：
- ウェルカムメッセージ
- ユーザー情報の表示
- 認証エラーハンドリング

### ユーザーコンテキストの拡張
`src/lib/langgraph-client.ts`の`UserContext`インターフェースを拡張：
```tsx
export interface UserContext {
  userId?: string;
  username?: string;
  email?: string;
  // 追加のユーザー情報
  role?: string;
  preferences?: any;
}
```

## 🛠️ トラブルシューティング

### よくある問題

#### 1. Clerk Publishable Key エラー
```
Error: Clerk Publishable Key が設定されていません
```
**解決方法**: `.env`ファイルで`VITE_CLERK_PUBLISHABLE_KEY`を設定

#### 2. 認証ループ
**症状**: ログイン後に再度ログイン画面が表示される
**解決方法**: 
- ブラウザのキャッシュをクリア
- Clerkダッシュボードでドメイン設定を確認

#### 3. LangGraph接続エラー
**症状**: `[認証済みフォールバック]`メッセージが表示される
**解決方法**: 
- `make dev`でLangGraphサーバーが起動しているか確認
- `http://localhost:8123`にアクセスできるか確認

### 設定確認コマンド
```bash
# 環境変数の確認
make check-clerk

# 依存関係の確認
npm list @clerk/clerk-react @langchain/langgraph
```

## 📚 参考リンク

- [Clerk Documentation](https://clerk.com/docs)
- [LangGraphJS Documentation](https://langchain-ai.github.io/langgraphjs/)
- [Anthropic Claude API](https://docs.anthropic.com/)

## 🚀 本番デプロイ

### 環境変数の設定
本番環境では以下の環境変数を設定：
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret
ANTHROPIC_API_KEY=your_production_api_key
LANGGRAPH_API_URL=your_production_langgraph_url
```

### セキュリティ考慮事項
1. **APIキーの管理**: 本番環境では環境変数を安全に管理
2. **CORS設定**: LangGraphサーバーのCORS設定を適切に構成
3. **認証設定**: Clerkの本番環境設定を適用
