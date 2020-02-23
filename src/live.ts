import { RequestInfo, Response } from "node-fetch";
import { FixerIoResponse, FixerIoLatestInput, FixerIoCache } from "./types";

type Props = {
  apiUri: string;
  apiKey: string;
  fetch: (url: RequestInfo) => Promise<Response>;
  cache?: FixerIoCache;
};

export function live({
  apiUri = "http://data.fixer.io/api",
  apiKey,
  fetch,
  cache
}: Props) {
  const fetchFromCache = async (base: string) => cache && cache.get(base);

  const fetchFromApi = async (base: string) => {
    const urlSearchParams = new URLSearchParams({
      base,
      access_key: apiKey
    });

    const queryString = urlSearchParams.toString();
    const url = `${apiUri}/latest?${queryString}`;
    const response = await fetch(url).then<FixerIoResponse>(res => res.json());

    await cache?.put(base, response);

    return response;
  };

  return {
    async latest({ base }: FixerIoLatestInput) {
      return fetchFromCache(base) || fetchFromApi(base);
    }
  };
}
