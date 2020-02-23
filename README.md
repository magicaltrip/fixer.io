# fixer.io

## Installation

`yarn add @magicaltrip/fixer.io`

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

const fixerIo = FixerIo.live({
  apiUrl: "http://data.fixer.io/api/latest",
  apiKey: String(process.env.FIXER_IO_API_KEY),
  fetch: fetch,
  cache: FixerIO.InMemoryCache.make({ cacheTTLInSeconds: 8 * 60 * 60 })
});

fixerIo
  .latest({ base: "EUR" })
  .then(console.log)
  .catch(console.error);
```
