import { FixerIoResponse, FixerIoLatestInput } from "./types";
import json from "./sandbox.eur.json";

export function sandbox() {
  return {
    async latest(_input: FixerIoLatestInput): Promise<FixerIoResponse> {
      return json;
    }
  };
}
