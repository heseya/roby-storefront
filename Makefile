compose-dev:
	docker compose up --build

build-image-prod:
	docker build -t heseya/roby-storefront:latest .

compose-prod:
	docker compose -f docker-compose.prod.yml up --remove-orphans

start-prod:
	make build-image-prod
	make compose-prod
