up:
		docker compose -f compose.yaml up

restart:
	 	docker compose -f compose.yaml stop && docker compose -f compose.yaml up -d

stop:
		docker compose -f compose.yaml stop

down:
		docker compose -f compose.yaml down

build:
		docker compose -f compose.yaml build