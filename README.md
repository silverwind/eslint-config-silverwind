# eslint-config-silverwind
[![](https://img.shields.io/npm/v/eslint-config-silverwind.svg)](https://www.npmjs.org/package/eslint-config-silverwind) [![](https://packagephobia.com/badge?p=eslint-config-silverwind)](https://packagephobia.com/result?p=eslint-config-silverwind)

> Exhaustive ESLint configuration

## Usage

```sh
pnpm add -D eslint-config-silverwind
```

In `eslint.config.ts`:

```ts
import silverwind from "eslint-config-silverwind";
import {defineConfig} from "eslint/config";

export default defineConfig(...silverwind);
```

Run via the included `eslint-silverwind` wrapper CLI. All arguments are passed through to `eslint`.

```sh
pnpm exec eslint-silverwind .
pnpm exec eslint-silverwind --fix .
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
