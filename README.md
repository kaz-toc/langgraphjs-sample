# LangGraph.js Sample with Next.js

LangChain.jsとLangGraphを使ったNext.jsベースのハンズオン用チャットボットアプリケーション

## 概要

このプロジェクトは以下の技術を統合したサンプルアプリケーションです：

- **Next.js 15** - React フレームワーク
- **LangGraph.js** - AIワークフローの状態管理
- **LangChain.js** - LLM統合ライブラリ
- **Prisma** - データベースORM
- **SQLite** - 軽量データベース
- **pnpm** - パッケージマネージャー
- **shadcn/ui** - UIコンポーネント
- **Tailwind CSS** - スタイリング

## 機能

- 🤖 LangGraphによる状態管理されたチャットボット
- 💾 Prisma + SQLiteによるチャット履歴保存
- 🔐 NextAuth.jsによる認証
- 📱 レスポンシブUI
- 🎨 モダンなデザイン (shadcn/ui)

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# Database
DATABASE_URL="file:./dev.db"

# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

### 3. データベースのセットアップ

```bash
# Prisma クライアントの生成
pnpm prisma:generate

# データベースマイグレーション
pnpm prisma:migrate
```

### 4. 開発サーバーの起動

#### Option A: Makefileを使用（推奨）
```bash
# Next.js開発サーバーを起動
make dev

# LangGraph Studioを起動
make studio

# 両方を並列で起動
make dev-all
```

#### Option B: pnpmコマンドを直接使用
```bash
pnpm dev
```

アプリケーションは http://localhost:33333 で起動します。

## プロジェクト構造

```
├── app/                    # Next.js App Router
│   ├── api/               # API ルート
│   │   └── chat/         # チャット関連API
│   ├── (auth)/           # 認証関連
│   └── (chat)/           # チャット画面
├── lib/
│   ├── langgraph/        # LangGraphの設定
│   ├── services/         # ビジネスロジック
│   └── prisma.ts         # Prismaクライアント
├── prisma/
│   └── schema.prisma     # データベーススキーマ
└── components/           # UIコンポーネント
```

## 主要なファイル

- `lib/langgraph/graph.ts` - LangGraphのワークフロー定義
- `lib/services/chat-service.ts` - チャット機能のビジネスロジック
- `prisma/schema.prisma` - データベーススキーマ
- `app/api/chat/langgraph/route.ts` - LangGraph統合API

## 使用方法

1. アプリケーションを起動
2. ユーザー登録/ログイン
3. 新しいチャットを作成
4. LangGraphによる状態管理されたチャットボットと対話

## 開発者向けコマンド

```bash
# 開発サーバー
pnpm dev

# ビルド
pnpm build

# Prisma Studio（データベース管理）
pnpm prisma:studio

# データベースリセット
pnpm prisma:reset

# リンター
pnpm lint

# フォーマッター
pnpm format

# LangGraph CLI
pnpm langgraph:dev    # 開発モードでLangGraph APIサーバー起動
pnpm langgraph:studio # LangGraph Studio起動
pnpm langgraph:build  # Docker イメージビルド
```

## Makefileコマンド

便利なMakefileコマンドが利用できます：

```bash
# 🚀 開発用コマンド
make dev          # Next.js開発サーバーを起動 (port 33333)
make studio       # LangGraph Studioを起動
make dev-all      # Next.js + LangGraph Studioを並列起動

# 🗄️ データベース関連
make db-setup     # データベースの初期セットアップ
make db-reset     # データベースをリセット
make prisma-studio # Prisma Studioを起動

# 📦 プロジェクト管理
make install      # 依存関係をインストール
make setup        # プロジェクトの初期セットアップ
make build        # プロジェクトをビルド
make clean        # プロジェクトをクリーンアップ

# 🔧 コード品質
make lint         # コードをリント
make format       # コードをフォーマット
make test         # テストを実行

# ❓ ヘルプ
make help         # 利用可能なコマンドを表示
```

## ハンズオン内容

このプロジェクトは以下のトピックをカバーします：

1. **LangGraph.js基礎**
   - 状態管理の概念
   - ノードとエッジの定義
   - 条件分岐の実装

2. **Next.js統合**
   - API Routesでの統合
   - Server Componentsの活用
   - ストリーミングレスポンス

3. **データベース設計**
   - Prismaスキーマ設計
   - チャット履歴の永続化
   - セッション管理

4. **UI/UX設計**
   - リアルタイムチャット
   - ローディング状態
   - エラーハンドリング

## 元のプロジェクトについて

このプロジェクトは [Vercel AI Chatbot](https://github.com/vercel/ai-chatbot) をベースにして、LangGraph.jsとPrismaを統合したものです。

## ライセンス

MIT License