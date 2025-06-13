IMAGE         := hovi-test-api
CONTAINER     := hovi-test-api-container
PORT          := 8000

.PHONY: all build start stop restart logs clean

all: build start
stop: quit clean

build:
	docker build -t $(IMAGE) .

start:
	docker run --rm -d \
		--name $(CONTAINER) \
		-p $(PORT):$(PORT) \
		$(IMAGE)

quit:
	docker stop $(CONTAINER) || true

restart: stop start

logs:
	docker logs -f $(CONTAINER)

clean:
	docker image prune -f
