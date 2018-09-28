.PHONY: lint
lint:
	npx eslint --ignore-pattern *.min.js *.js

.PHONY: build
build:
	node build.js
	git diff --quiet || git commit -am "rebuild"

.PHONY: publish
publish:
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish
	npm i -g .

.PHONY: update
update:
	npx updates -u
	rm -rf node_modules
	npm i --no-package-lock

.PHONY: patch
patch:
	$(MAKE) lint
	$(MAKE) build
	npx ver patch
	$(MAKE) publish

.PHONY: minor
minor:
	$(MAKE) lint
	$(MAKE) build
	npx ver minor
	$(MAKE) publish

.PHONY: major
major:
	$(MAKE) lint
	$(MAKE) build
	npx ver major
	$(MAKE) publish
