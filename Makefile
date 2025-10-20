# Makefile for React + Rails Docker development environment

.PHONY: help up down build logs ps shell-app shell-web shell-db

# デフォルトターゲット - ヘルプを表示
help:
	@echo "Available commands:"
	@echo "  make up       - Start all containers in background"
	@echo "  make down     - Stop and remove all containers"
	@echo "  make build    - Build containers and start in background"
	@echo "  make logs     - Show logs from all containers"
	@echo "  make ps       - Show running containers status"
	@echo "  make shell-app - Access Rails container shell"
	@echo "  make shell-web - Access Next container shell"
	@echo "  make shell-db  - Access PostgreSQL container shell"

# コンテナを起動（バックグラウンド）
up:
	docker compose up -d

# コンテナを停止・削除
down:
	docker compose down

# コンテナをビルドして起動
build:
	docker compose up --build -d

# 全コンテナのログを表示
logs:
	docker compose logs -f

# 実行中のコンテナ一覧を表示
ps:
	docker compose ps

# Railsコンテナのシェルにアクセス
app:
	docker compose exec app bash

# Reactコンテナのシェルにアクセス
web:
	docker compose exec web bash

# PostgreSQLコンテナにアクセス
db:
	docker compose exec db psql -U postgres -d app_development

# ES Lintを実行
lint:
	docker compose exec web npm run lint

# Prettierでフォーマットを統一
fmt:
	docker compose exec web npm run format