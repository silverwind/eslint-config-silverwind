SOURCE_FILES := index.ts
DIST_FILES := dist/index.js

node_modules: package-lock.json
	npm install --no-save
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules build
	ESLINT_USE_FLAT_CONFIG=false npx eslint --ext js,jsx,ts,tsx --color .
	npx tsc

.PHONY: lint-fix
lint-fix: node_modules
	ESLINT_USE_FLAT_CONFIG=false npx eslint --ext js,jsx,ts,tsx --color . --fix
	npx tsc

lint-flat: node_modules build
	npx eslint --color

.PHONY: test
test: node_modules build
	npx vitest

.PHONY: test-update
test-update: node_modules build
	npx vitest -u

.PHONY: build
build: node_modules $(DIST_FILES)
	node build.js > dist/index.json

$(DIST_FILES): $(SOURCE_FILES) package-lock.json vite.config.ts
	npx vite build
	chmod +x $(DIST_FILES)

.PHONY: publish
publish: node_modules
	git push -u --tags origin master
	npm publish

.PHONY: update
update: node_modules
	npx updates -cu
	rm -rf node_modules package-lock.json
	npm install
	@touch node_modules

.PHONY: path
patch: node_modules lint test build
	npx versions patch package.json package-lock.json
	@$(MAKE) --no-print-directory publish

.PHONY: minor
minor: node_modules lint test build
	npx versions minor package.json package-lock.json
	@$(MAKE) --no-print-directory publish

.PHONY: major
major: node_modules lint test build
	npx versions major package.json package-lock.json
	@$(MAKE) --no-print-directory publish
