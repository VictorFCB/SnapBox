up:
	docker-compose -f docker-compose.yml stop && docker-compose -f docker-compose.yml up -d --remove-orphans && docker attach estacoes
stop:
	docker-compose -f docker-compose.yml stop
down:
	docker-compose -f docker-compose.yml down -v
build:
	docker-compose -f docker-compose.yml down --remove-orphans && docker-compose -f docker-compose.yml up -d --build --remove-orphans && docker attach estacoes
 
up-homolog:
	docker-compose -f docker-compose.homolog.yml stop && docker-compose -f docker-compose.homolog.yml up -d --remove-orphans
stop-homolog:
	docker-compose -f docker-compose.homolog.yml stop
down-homolog:
	docker-compose -f docker-compose.homolog.yml down -v
build-homolog:
	docker-compose -f docker-compose.homolog.yml down --remove-orphans && docker-compose -f docker-compose.homolog.yml up -d --build --remove-orphans
 
up-prod:
	docker-compose -f docker-compose.prod.yml stop && docker-compose -f docker-compose.prod.yml up -d --remove-orphans
stop-prod:
	docker-compose -f docker-compose.prod.yml stop
down-prod:
	docker-compose -f docker-compose.prod.yml down -v
build-prod:
	docker-compose -f docker-compose.prod.yml down --remove-orphans && docker-compose -f docker-compose.prod.yml up -d --build --remove-orphans

git:
	git add . && git commit -m "make git" && git push
bash:
	docker exec -it estacoes /bin/sh

exp-prod:
	npm run build:prod

exp-homolog:
	npm run build:homolog
 
bash-react:
	docker exec -it front_estacoes /bin/sh
migrate:
	python3 manage.py makemigrations && python3 manage.py migrate
