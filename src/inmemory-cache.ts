import { FixerIoResponse, FixerIoCache } from "./types";

type Props = {
  cacheTTLInSeconds: number;
};

export function make({ cacheTTLInSeconds = 0 }: Props): FixerIoCache {
  const cache = new Map<string, FixerIoResponse>();

  return {
    async get(base: string) {
      const cachedValue = cache.get(base);

      if (cachedValue) {
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        const diff = currentUnixTimestamp - cachedValue.timestamp;

        if (diff >= cacheTTLInSeconds) {
          return undefined;
        }
      }

      return cachedValue;
    },

    async put(base: string, response: FixerIoResponse) {
      cache.set(base, response);
    }
  };
}
