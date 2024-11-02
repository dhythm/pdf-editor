WEB_URL = http://localhost:3000
API_ENDPOINT = http://localhost:8000


.PHONY: downv
downv:
	docker-compose down -v

.PHONY: up
up: downv
	docker-compose up -d
	@echo "containers are ready! ${WEB_URL}"
	@open ${WEB_URL}

.PHONY: up-build
up-build: downv
	docker-compose up -d --build
	@echo "containers are ready! ${WEB_URL}"
	@open ${WEB_URL}

.PHONY: up-only-api
up-only-api: downv
	docker-compose up -d api
	@echo "containers are ready! ${API_ENDPOINT}"

.PHONY: db
db: downv
	docker-compose up -d db