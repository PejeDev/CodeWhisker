import {
	type WhiskerServiceRunFunctionType,
	WhiskersExecutorServiceEnum,
	type WhiskersExecutorServiceEnumType,
} from "../types";
import { runWhiskersApp } from "./whiskers-app";
import { runWhiskersBack } from "./whiskers-back";
import { runWhiskersDocs } from "./whiskers-docs";
import { runWhiskersFull } from "./whiskers-full";

export const runService: Record<
	WhiskersExecutorServiceEnumType,
	WhiskerServiceRunFunctionType
> = {
	[WhiskersExecutorServiceEnum.WHISKERS_APP]: runWhiskersApp,
	[WhiskersExecutorServiceEnum.WHISKERS_BACK]: runWhiskersBack,
	[WhiskersExecutorServiceEnum.WHISKERS_DOCS]: runWhiskersDocs,
	[WhiskersExecutorServiceEnum.WHISKERS_FULL]: runWhiskersFull,
};
