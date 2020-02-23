# fixer.io

## Installation

`yarn add @magicaltrip/fixer.io --save --exact`

## Usage

### Sandbox mode

```ts
import * as FixerIo from "@magicaltrip/fixer.io";

const fixerIo = FixerIo.sandbox();

fixerIo
  .latest({ base: "EUR" })
  .then(console.log)
  .catch(console.error);
```

### Live mode

```ts
import fetch from "node-fetch";
import * as FixerIo from "@magicaltrip/fixer.io";

const cache = FixerIO.InMemoryCache.make({
  cacheTTLInSeconds: 8 * 60 * 60 // cache for 8 hours
});

const fixerIo = FixerIo.live({
  apiUrl: String(process.env.FIXER_IO_API_URI),
  apiKey: String(process.env.FIXER_IO_API_KEY), // use your own env variables
  fetch,
  cache
});

fixerIo
  .latest({ base: "JPY" })
  .then(console.log)
  .catch(console.error);
```
