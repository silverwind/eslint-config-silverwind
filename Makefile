test:
	npx eslint --ignore-pattern *.min.js *.js
	node -p 'process.exit(typeof require(".").parserOptions.ecmaVersion === "number" ? 0 : 1)'

publish:
	if git ls-remote --exit-code origin &>/dev/null; then git push -u -f --tags origin master; fi
	npm publish

deps:
	rm -rf node_modules
	npm i

update:
	npx updates -cu
	$(MAKE) deps

patch: test
	npx versions -Cc 'node build.js' patch
	$(MAKE) publish

minor: test
	npx versions -Cc 'node build.js' minor
	$(MAKE) publish

major: test
	npx versions -Cc 'node build.js' major
	$(MAKE) publish

.PHONY: test publish deps update patch minor major
