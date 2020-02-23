import * as InMemoryCache from "./inmemory-cache";
import sandboxJson from "./sandbox.eur.json";

function createFixture(timestamp: number) {
  return {
    ...sandboxJson,
    timestamp: timestamp
  };
}

test("it should return nothing if not in the cache", async () => {
  const cache = InMemoryCache.make({ cacheTTLInSeconds: 3000 });
  const value = await cache.get("EUR");

  expect(value).toEqual(undefined);
});

test("it should return nothing if it expired", async () => {
  const cacheTTLInSeconds = 8 * 60 * 60;
  const cache = InMemoryCache.make({ cacheTTLInSeconds });
  const timestamp = Date.now() / 1000 - cacheTTLInSeconds - 1;
  const fixture = createFixture(timestamp);

  await cache.put("EUR", fixture);

  const value = await cache.get("EUR");

  expect(value).toEqual(undefined);
});

test("it should return something if it's in the cache", async () => {
  const cacheTTLInSeconds = 8 * 60 * 60;
  const cache = InMemoryCache.make({ cacheTTLInSeconds });
  const timestamp = Date.now() / 1000 - cacheTTLInSeconds;
  const fixture = createFixture(timestamp);

  await cache.put("EUR", fixture);

  const value = await cache.get("EUR");

  expect(value).toEqual(fixture);
});
