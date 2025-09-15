# Prisma + Zod + SQLite 使用例

このプロジェクトでは、Prisma ORM、Zod バリデーション、SQLite データベースを使用しています。

## セットアップ

### 1. データベースの初期化
```bash
npx prisma generate  # Prismaクライアントと Zodスキーマを生成
npx prisma db push   # データベーススキーマを同期
```

### 2. データベースのリセット（必要な場合）
```bash
npx prisma db push --force-reset
```

## API エンドポイント

### ユーザー関連
- `GET /api/users` - 全ユーザー取得
- `GET /api/users/:id` - 特定ユーザー取得
- `POST /api/users` - ユーザー作成
- `PUT /api/users/:id` - ユーザー更新
- `DELETE /api/users/:id` - ユーザー削除

### 投稿関連
- `GET /api/posts` - 全投稿取得（`?published=true`で公開済みのみ）
- `GET /api/posts/:id` - 特定投稿取得
- `POST /api/posts` - 投稿作成
- `PUT /api/posts/:id` - 投稿更新
- `DELETE /api/posts/:id` - 投稿削除
- `GET /api/users/:id/posts` - 特定ユーザーの投稿一覧

## 使用例

### ユーザー作成
```bash
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "Test User"
  }'
```

### 投稿作成
```bash
curl -X POST http://localhost:8787/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "published": true,
    "authorId": 1
  }'
```

### ユーザー一覧取得
```bash
curl http://localhost:8787/api/users
```

### 公開済み投稿一覧取得
```bash
curl http://localhost:8787/api/posts?published=true
```

## データベーススキーマ

### User
- `id`: Integer (主キー、自動増分)
- `email`: String (ユニーク)
- `name`: String (オプション)
- `createdAt`: DateTime (自動設定)
- `updatedAt`: DateTime (自動更新)
- `posts`: Post[] (リレーション)

### Post
- `id`: Integer (主キー、自動増分)
- `title`: String
- `content`: String (オプション)
- `published`: Boolean (デフォルト: false)
- `authorId`: Integer (外部キー)
- `author`: User (リレーション)
- `createdAt`: DateTime (自動設定)
- `updatedAt`: DateTime (自動更新)

## Zod バリデーション

各API エンドポイントでは、Prisma から自動生成された Zod スキーマを使用してデータをバリデーションしています。

生成されたスキーマは `src/generated/zod/` ディレクトリに保存されています。

## 開発

### 開発サーバー起動
```bash
npm run dev
```

### データベースブラウザ（Prisma Studio）
```bash
npx prisma studio
```

### 型安全性
- Prisma Client により、データベース操作が型安全になっています
- Zod により、API の入力データがバリデーションされています
- TypeScript により、コード全体が型チェックされています
