up:
	docker-compose -f docker-compose.yml stop && docker-compose -f docker-compose.yml up -d --remove-orphans

up-prod:
	docker-compose -f docker-compose.prod.yml stop && docker-compose -f docker-compose.prod.yml up -d --remove-orphans

stop:
	docker-compose -f docker-compose.yml stop

stop-prod:
	docker-compose -f docker-compose.prod.yml stop

down:
	docker-compose -f docker-compose.yml down -v

down-prod:
	docker-compose -f docker-compose.yml down -v
 
build:
	docker-compose -f docker-compose.yml down --remove-orphans && docker-compose -f docker-compose.yml up -d --build --remove-orphans

build-prod:
	docker-compose -f docker-compose.prod.yml down --remove-orphans && docker-compose -f docker-compose.prod.yml up -d --build --remove-orphans

git:
	git add . && git commit -m "make git" && git push

bash:
	docker exec -it snapbox/bin/sh

bash-ngnix:
	docker exec -it ngnix /bin/sh
 