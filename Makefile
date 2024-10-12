up-dev:
		@echo "Starting services..."
		docker compose -f docker/docker-compose.yml up

up-production:
		@echo "Starting services..."
		docker compose -f docker/docker-compose.production.yml up

restart:
		@echo "Restarting services..."
		docker compose -f docker/compose.yaml stop && docker compose -f docker/compose.yaml up -d

stop:
		@echo "Stopping services..."
		docker compose -f docker/compose.yaml stop

down-dev:
		@echo "Down services..."
		docker compose -f docker/docker-compose.yml down

down-production:
		@echo "Down services..."
		docker compose -f docker/docker-compose.production.yml down

build-dev:
		@echo "Building the project..."
		docker compose -f docker/docker-compose.yml build

build-production:
		@echo "Building the project..."
		docker compose -f docker/docker-compose.production.yml build

backend:
		@echo "Running backend for Go and Market..."
		docker compose -f docker/backend-compose.yaml up

actus-go-frontend:
		@echo "Running backends and Go frontend..."
		docker compose -f docker/go-compose.yaml up

actus-market-frontend:
		@echo "Running backends and Market frontend..."
		docker compose -f docker/market-compose.yaml up