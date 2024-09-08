up:
		@echo "Starting services..."
		docker compose -f docker/compose.yaml up

restart:
		@echo "Restarting services..."
		docker compose -f docker/compose.yaml stop && docker compose -f docker/compose.yaml up -d

stop:
		@echo "Stopping services..."
		docker compose -f docker/compose.yaml stop

down:
		@echo "Down services..."
		docker compose -f docker/compose.yaml down

build:
		@echo "Building the project..."
		docker compose -f docker/compose.yaml build

backend:
		@echo "Running backend for Go and Market..."
		docker compose -f docker/backend-compose.yaml up

actus-go-frontend:
		@echo "Running backends and Go frontend..."
		docker compose -f docker/go-compose.yaml up

actus-market-frontend:
		@echo "Running backends and Market frontend..."
		docker compose -f docker/market-compose.yaml up