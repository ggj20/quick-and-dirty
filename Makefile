image:
	docker build . -t ggj2020:latest

install:
	docker run -v ${PWD}:/code --rm ggj2020:latest npm install

start:
	docker run -v ${PWD}:/code --rm -p 8080:8080 --name ggj2020 ggj2020:latest npm start
