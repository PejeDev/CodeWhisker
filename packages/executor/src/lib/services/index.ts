import {
  WhiskersExecutorServiceEnum,
  type WhiskerServiceRunFunctionType,
  type WhiskersExecutorServiceEnumType,
} from "../types";

export const runService: Record<
  WhiskersExecutorServiceEnumType,
  WhiskerServiceRunFunctionType
> = {
  [WhiskersExecutorServiceEnum.WHISKERS_APP]: async (_a, _b) => {
    console.log("whiskers-app");
  },
  [WhiskersExecutorServiceEnum.WHISKERS_BACK]: async (_a, _b) => {
    console.log("whiskers-back");
  },
  [WhiskersExecutorServiceEnum.WHISKERS_DOCS]: async (_a, _b) => {
    console.log("whiskers-docs");
  },
  [WhiskersExecutorServiceEnum.WHISKERS_FULL]: async (_a, _b) => {
    console.log("whiskers-full");
  },
};
