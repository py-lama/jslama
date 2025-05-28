# Makefile for jslama

install:
	npm install

lint:
	npm run lint || echo "No lint script defined"

test:
	npm test || echo "No test script defined"

build:
	npm run build || echo "No build script defined"

clean:
	rm -rf node_modules dist build coverage

format:
	npm run format || echo "No format script defined"

start:
	npm start || echo "No start script defined"

.PHONY: install lint test build clean format start
