node_modules: package-lock.json
	npm i --no-save
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: build
build: node_modules
	node build.js

.PHONY: test
test: node_modules build
	npx eslint .

.PHONY: publish
publish: node_modules
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

.PHONY: update
update: node_modules
	npx updates -cu
	@touch package-lock.json
	@$(MAKE) --no-print-directory deps

.PHONY: patch
patch: node_modules test
	npx versions -Cac 'node build.js' patch
	$(MAKE) --no-print-directory publish

.PHONY: minor
minor: node_modules test
	npx versions -Cac 'node build.js' minor
	$(MAKE) --no-print-directory publish

.PHONY: major
major: node_modules test
	npx versions -Cac 'node build.js' major
	$(MAKE) --no-print-directory publish

