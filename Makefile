lint:
	eslint --ignore-pattern *.min.js *.js

build:
	node build.js

publish:
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

update:
	ncu -ua
	rm -rf node_modules
	npm install

npm-patch:
	npm version patch

npm-minor:
	npm version minor

npm-major:
	npm version major

patch: lint build npm-patch publish
minor: lint build npm-minor publish
major: lint build npm-major publish

.PHONY: lint publish update npm-patch npm-minor npm-major patch minor major
