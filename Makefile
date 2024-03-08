node_modules: package-lock.json
	npm install --no-save
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: build
build: node_modules
	node build.js

.PHONY: lint
lint: node_modules build
	ESLINT_USE_FLAT_CONFIG=false npx eslint .

.PHONY: test
test: node_modules build
	npx vitest

.PHONY: publish
publish: node_modules
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

.PHONY: update
update: node_modules
	npx updates -cu
	rm -rf node_modules package-lock.json
	npm install
	@touch node_modules

.PHONY: patch
patch: node_modules test
	npx versions -c 'node build.js' patch package.json package-lock.json
	$(MAKE) --no-print-directory publish

.PHONY: minor
minor: node_modules test
	npx versions -c 'node build.js' minor package.json package-lock.json
	$(MAKE) --no-print-directory publish

.PHONY: major
major: node_modules test
	npx versions -c 'node build.js' major package.json package-lock.json
	$(MAKE) --no-print-directory publish

