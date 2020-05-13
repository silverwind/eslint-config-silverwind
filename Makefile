test:
	yarn -s run eslint .
	node -p 'process.exit(typeof require(".").parserOptions.ecmaVersion === "number" ? 0 : 1)'

publish:
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

deps:
	rm -rf node_modules
	yarn

update:
	yarn -s run updates -cu
	$(MAKE) deps

patch: test
	yarn -s run versions -Cac 'node build.js' patch
	$(MAKE) publish

minor: test
	yarn -s run versions -Cac 'node build.js' minor
	$(MAKE) publish

major: test
	yarn -s run versions -Cac 'node build.js' major
	$(MAKE) publish

.PHONY: test publish deps update patch minor major
