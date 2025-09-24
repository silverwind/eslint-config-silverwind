SOURCE_FILES := index.ts
DIST_FILES := dist/index.js

node_modules: package-lock.json
	npm install --no-save
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules build
	npx eslint -c dist/index.js --color .
	npx tsc

.PHONY: lint-fix
lint-fix: node_modules build
	npx eslint -c dist/index.js --color --fix .
	npx tsc

.PHONY: test
test: node_modules build
	npx eslint -c dist/index.js --color tests/test.tsx
	npx vitest

.PHONY: test-update
test-update: node_modules build
	npx vitest -u

.PHONY: build
build: $(DIST_FILES)

$(DIST_FILES): $(SOURCE_FILES) package-lock.json tsdown.config.ts
	npx tsdown
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
