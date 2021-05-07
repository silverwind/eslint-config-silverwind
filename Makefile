node_modules: package-lock.json
	npm i --no-save
	@touch node_modules

deps: node_modules

build: node_modules
	node build.mjs

test: node_modules build
	npx eslint .

publish: node_modules
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

update: node_modules
	npx updates -cu
	@touch package-lock.json
	@$(MAKE) --no-print-directory deps

patch: node_modules test
	npx versions -Cac 'node build.js' patch
	$(MAKE) --no-print-directory publish

minor: node_modules test
	npx versions -Cac 'node build.js' minor
	$(MAKE) --no-print-directory publish

major: node_modules test
	npx versions -Cac 'node build.js' major
	$(MAKE) --no-print-directory publish

.PHONY: test publish deps update patch minor major
