export type FixerIoResponse = {
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
};

export type FixerIoLatestInput = {
  base: string;
};

export interface FixerIoCache {
  get(base: string): Promise<FixerIoResponse | undefined>;
  put(base: string, response: FixerIoResponse): Promise<void>;
}
