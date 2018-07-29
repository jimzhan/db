all: help

help:
	@echo ""
	@echo "COMMANDS"
	@echo "   1. make run		    - install the cli command"
	@echo "   2. make build   	- build docker image"
	@echo "   3. make test    	- run test suit"

build:
	@docker build -t ${DB_IMAGE} .

run:
	@docker run --name ${DB_NAME} -e MYSQL_ROOT_PASSWORD=${DB_PASSWORD} -d mariadb:latest

connect:
	@docker run -it --link ${DB_NAME}:mysql --rm mariadb sh -c 'exec mysql -h "127.0.0.1" -P "3306" -uroot -p"${DB_PASSWORD}"'
