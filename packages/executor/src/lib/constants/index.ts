import type { WhiskersExecutorOptionsType } from "../types";

export const whiskerOptions: WhiskersExecutorOptionsType = {
  service: {
    type: "string",
  },
  mode: {
    type: "string",
    default: "standard",
  },
  dev: {
    type: "boolean",
    default: false,
  },
};
