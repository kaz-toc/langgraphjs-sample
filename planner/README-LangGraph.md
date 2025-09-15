# LangGraphJS チャットボット

このプロジェクトは、LangGraphJSとAnthropic Claude APIを使用したチャットボットアプリケーションです。

## セットアップ

### 1. 依存関係のインストール
```bash
make install
```

### 2. 環境変数の設定
```bash
# .envファイルを作成
make setup-env

# .envファイルを編集してAPIキーを設定
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. 開発サーバーの起動

#### LangGraphサーバーを起動（ターミナル1）
```bash
make dev
```
LangGraph Studio が `http://localhost:8123` で起動します。

#### Reactアプリを起動（ターミナル2）
```bash
make dev-react
```
React開発サーバーが `http://localhost:5173` で起動します。

## Makefileコマンド

| コマンド | 説明 |
|---------|------|
| `make help` | 利用可能なコマンドを表示 |
| `make dev` | LangGraph開発サーバーを起動 |
| `make dev-react` | React開発サーバーを起動 |
| `make build` | プロジェクトをビルド |
| `make lint` | ESLintでコードをチェック |
| `make test` | テストを実行 |
| `make install` | 依存関係をインストール |
| `make clean` | ビルド成果物をクリーン |
| `make setup-env` | .envファイルを作成 |

## プロジェクト構造

```
planner/
├── src/
│   ├── agent/
│   │   └── graph.ts          # LangGraphワークフロー定義
│   ├── components/
│   │   └── chat/             # チャットUIコンポーネント
│   ├── lib/
│   │   └── langgraph-client.ts # LangGraph APIクライアント
│   └── react-app/
│       └── App.tsx           # メインReactアプリ
├── langgraph.json            # LangGraph設定
├── .env.example              # 環境変数テンプレート
├── .env                      # 実際の環境変数（要設定）
└── Makefile                  # 開発コマンド
```

## 使用方法

1. **LangGraphサーバーを起動**: `make dev`
2. **Reactアプリを起動**: `make dev-react`
3. ブラウザで `http://localhost:5173` にアクセス
4. チャットUIでClaude AIと会話

## デバッグ

- LangGraph Studio: `http://localhost:8123` でワークフローを視覚的にデバッグ
- React DevTools: ブラウザでReactコンポーネントをデバッグ

## APIキーの取得

1. [Anthropic Console](https://console.anthropic.com/) でAPIキーを取得
2. `.env` ファイルの `ANTHROPIC_API_KEY` に設定

## トラブルシューティング

- LangGraphサーバーが起動しない場合は、`langgraph.json` の設定を確認
- Anthropic APIエラーの場合は、APIキーと利用制限を確認
- フォールバックモードが動作している場合は、LangGraphサーバーの起動状況を確認
