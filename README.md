# eslint-config-silverwind [![](https://img.shields.io/npm/v/eslint-config-silverwind.svg)](https://www.npmjs.org/package/eslint-config-silverwind) [![](https://img.shields.io/badge/licence-bsd-blue.svg)](https://raw.githubusercontent.com/silverwind/eslint-config-silverwind/master/LICENSE)

Exhaustive ESLint configuration

## Usage

In your `.eslintrc.yaml`:

```yaml
extends:
  - eslint-config-silverwind
```

To enable TS-dependant rules, add `tsconfig.json`:

```bash
curl -sO https://raw.githubusercontent.com/silverwind/eslint-config-silverwind/master/tsconfig.json
```

And add these configs:

```yaml
parserOptions:
  project: true

rules:
  etc/no-deprecated: [2]
```

## Related

- [eslint-config-silverwind-react](https://github.com/silverwind/eslint-config-silverwind-react)
- [eslint-config-silverwind-typescript](https://github.com/silverwind/eslint-config-silverwind-typescript)

© [silverwind](https://github.com/silverwind), distributed under BSD licence.
