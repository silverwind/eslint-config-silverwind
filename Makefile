node_modules: yarn.lock
	@yarn -s --pure-lockfile
	@touch node_modules

deps: node_modules

test: node_modules
	node build.js
	yarn -s run eslint .
	# yarn -s run eslint-find-rules -u .eslintrc
	node -p 'process.exit(typeof require(".").parserOptions.ecmaVersion === "number" ? 0 : 1)'

publish: node_modules
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

update: node_modules
	yarn -s run  updates -cu
	@touch yarn.lock
	@$(MAKE) --no-print-directory deps

patch: node_modules test
	yarn -s run versions -Cac 'node build.js' patch
	$(MAKE) --no-print-directory publish

minor: node_modules test
	yarn -s run versions -Cac 'node build.js' minor
	$(MAKE) --no-print-directory publish

major: node_modules test
	yarn -s run versions -Cac 'node build.js' major
	$(MAKE) --no-print-directory publish

.PHONY: test publish deps update patch minor major
