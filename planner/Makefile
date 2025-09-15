# LangGraphJS Development Makefile

.PHONY: help dev build lint test clean install

# デフォルトターゲット
help:
	@echo "利用可能なコマンド:"
	@echo "  make setup      - 完全なプロジェクトセットアップ"
	@echo "  make dev        - LangGraph開発サーバーを起動"
	@echo "  make dev-react  - React開発サーバーを起動"
	@echo "  make build      - プロジェクトをビルド"
	@echo "  make lint       - ESLintでコードをチェック"
	@echo "  make test       - テストを実行"
	@echo "  make install    - 依存関係をインストール"
	@echo "  make clean      - ビルド成果物をクリーン"
	@echo "  make setup-env  - .envファイルを作成"
	@echo "  make check-clerk - Clerk設定を確認"

# LangGraph開発サーバーを起動
dev:
	@echo "🚀 LangGraph開発サーバーを起動中..."
	npx @langchain/langgraph-cli dev

# React開発サーバーを起動
dev-react:
	@echo "🚀 React開発サーバーを起動中..."
	npm run dev

# プロジェクトをビルド
build:
	@echo "🔨 プロジェクトをビルド中..."
	npm run build

# ESLintでコードをチェック
lint:
	@echo "🔍 コードをチェック中..."
	npm run lint

# テストを実行
test:
	@echo "🧪 テストを実行中..."
	npm test

# 依存関係をインストール
install:
	@echo "📦 依存関係をインストール中..."
	npm install

# ビルド成果物をクリーン
clean:
	@echo "🧹 クリーンアップ中..."
	rm -rf dist/
	rm -rf node_modules/.cache/
	npm run build --clean

# 環境設定ファイルをコピー
setup-env:
	@if [ ! -f .env ]; then \
		echo "📝 .envファイルを作成中..."; \
		cp .env.example .env; \
		echo "✅ .envファイルが作成されました。"; \
		echo ""; \
		echo "🔧 必要な設定:"; \
		echo "  1. Anthropic APIキー: https://console.anthropic.com/"; \
		echo "  2. Clerk認証キー: https://dashboard.clerk.com/"; \
		echo "  3. LangSmith APIキー (オプション): https://smith.langchain.com/"; \
		echo ""; \
		echo "📝 .envファイルを編集してAPIキーを設定してください。"; \
	else \
		echo "ℹ️  .envファイルは既に存在します。"; \
	fi

# Clerk設定の確認
check-clerk:
	@echo "🔍 Clerk設定を確認中..."
	@if [ -z "$$VITE_CLERK_PUBLISHABLE_KEY" ]; then \
		echo "❌ VITE_CLERK_PUBLISHABLE_KEYが設定されていません"; \
		echo "   Clerkダッシュボードから取得してください: https://dashboard.clerk.com/"; \
	else \
		echo "✅ VITE_CLERK_PUBLISHABLE_KEY: 設定済み"; \
	fi
	@if [ -z "$$CLERK_SECRET_KEY" ]; then \
		echo "❌ CLERK_SECRET_KEYが設定されていません"; \
	else \
		echo "✅ CLERK_SECRET_KEY: 設定済み"; \
	fi

# 完全なセットアップ
setup:
	@echo "🚀 プロジェクトセットアップを開始..."
	make install
	make setup-env
	@echo ""
	@echo "✅ セットアップ完了！"
	@echo ""
	@echo "📋 次のステップ:"
	@echo "  1. .envファイルを編集してAPIキーを設定"
	@echo "  2. make check-clerk でClerk設定を確認"
	@echo "  3. make dev でLangGraphサーバーを起動"
	@echo "  4. make dev-react でReactアプリを起動"
