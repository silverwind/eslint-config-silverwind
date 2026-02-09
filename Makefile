SOURCE_FILES := index.ts
DIST_FILES := dist/index.js

node_modules: pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: deps
deps: node_modules

.PHONY: lint
lint: node_modules build
	pnpm exec eslint -c dist/index.js --color .
	pnpm exec tsgo

.PHONY: lint-fix
lint-fix: node_modules build
	pnpm exec eslint -c dist/index.js --color --fix .
	pnpm exec tsgo

.PHONY: test
test: node_modules build
	pnpm exec eslint -c dist/index.js --color tests
	pnpm exec vitest

.PHONY: test-update
test-update: node_modules build
	pnpm exec vitest -u

.PHONY: build
build: $(DIST_FILES)

$(DIST_FILES): $(SOURCE_FILES) pnpm-lock.yaml package.json tsdown.config.ts
	pnpm exec tsdown

.PHONY: watch
watch:
	pnpm exec tsdown --watch

.PHONY: update
update: node_modules
	pnpm exec updates -cu
	rm -rf node_modules pnpm-lock.yaml
	pnpm install
	@touch node_modules

.PHONY: publish
publish: node_modules
	pnpm publish --no-git-checks

.PHONY: path
patch: node_modules lint test
	pnpm exec versions patch package.json
	git push -u --tags origin master

.PHONY: minor
minor: node_modules lint test
	pnpm exec versions minor package.json
	git push -u --tags origin master

.PHONY: major
major: node_modules lint test
	pnpm exec versions major package.json
	git push -u --tags origin master
