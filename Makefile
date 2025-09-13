.PHONY: dev graph install setup clean help db-setup db-reset prisma-studio

# デフォルトターゲット
.DEFAULT_GOAL := help

# Next.js開発サーバーを起動
dev:
	@echo "🚀 Next.js開発サーバーを起動中... (http://localhost:33333)"
	pnpm dev

# LangGraph Studioを起動  
graph:
	@echo "📊 LangGraph Studioを起動中..."
	pnpm langgraph:dev

# 依存関係をインストール
install:
	@echo "📦 依存関係をインストール中..."
	pnpm install

# プロジェクトの初期セットアップ
setup: install db-setup
	@echo "✅ プロジェクトのセットアップが完了しました"
	@echo ""
	@echo "次のステップ:"
	@echo "1. .env.localファイルを編集してAnthropic APIキーを設定"
	@echo "2. make dev でNext.js開発サーバーを起動"
	@echo "3. make studio でLangGraph Studioを起動"

# データベースセットアップ
db-setup:
	@echo "🗄️  データベースをセットアップ中..."
	pnpm prisma:generate
	pnpm prisma:migrate

# データベースリセット
db-reset:
	@echo "🔄 データベースをリセット中..."
	pnpm prisma:reset

# Prisma Studioを起動
prisma-studio:
	@echo "🗄️  Prisma Studioを起動中..."
	pnpm prisma:studio

# LangGraph開発サーバーを起動
langgraph-dev:
	@echo "🔗 LangGraph開発サーバーを起動中..."
	pnpm langgraph:dev

# 並列実行: Next.js + LangGraph Studio
dev-all:
	@echo "🚀 Next.js + LangGraph Studioを並列起動中..."
	@echo "Next.js: http://localhost:33333"
	@echo "LangGraph Studio: 別ポートで起動"
	make -j2 dev studio

# ビルド
build:
	@echo "🏗️  プロジェクトをビルド中..."
	pnpm build

# リント
lint:
	@echo "🔍 コードをリント中..."
	pnpm lint

# フォーマット
format:
	@echo "✨ コードをフォーマット中..."
	pnpm format

# テスト実行
test:
	@echo "🧪 テストを実行中..."
	pnpm test

# クリーンアップ
clean:
	@echo "🧹 プロジェクトをクリーンアップ中..."
	rm -rf node_modules
	rm -rf .next
	rm -rf dist
	rm -f pnpm-lock.yaml

# Docker関連
docker-build:
	@echo "🐳 Dockerイメージをビルド中..."
	pnpm langgraph:build

# ヘルプ
help:
	@echo "LangGraph.js Sample - 利用可能なコマンド:"
	@echo ""
	@echo "🚀 開発用コマンド:"
	@echo "  make dev          - Next.js開発サーバーを起動 (port 33333)"
	@echo "  make studio       - LangGraph Studioを起動"
	@echo "  make langgraph-dev - LangGraph開発サーバーを起動"
	@echo "  make dev-all      - Next.js + LangGraph Studioを並列起動"
	@echo ""
	@echo "🗄️  データベース関連:"
	@echo "  make db-setup     - データベースの初期セットアップ"
	@echo "  make db-reset     - データベースをリセット"
	@echo "  make prisma-studio - Prisma Studioを起動"
	@echo ""
	@echo "📦 プロジェクト管理:"
	@echo "  make install      - 依存関係をインストール"
	@echo "  make setup        - プロジェクトの初期セットアップ"
	@echo "  make build        - プロジェクトをビルド"
	@echo "  make clean        - プロジェクトをクリーンアップ"
	@echo ""
	@echo "🔧 コード品質:"
	@echo "  make lint         - コードをリント"
	@echo "  make format       - コードをフォーマット"
	@echo "  make test         - テストを実行"
	@echo ""
	@echo "🐳 Docker:"
	@echo "  make docker-build - Dockerイメージをビルド"
	@echo ""
	@echo "❓ ヘルプ:"
	@echo "  make help         - このヘルプを表示"
