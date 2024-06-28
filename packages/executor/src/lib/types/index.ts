import { z } from "zod";

export type WhiskersExecutorOptionType = z.infer<typeof WhiskersExecutorOption>;
export const WhiskersExecutorOption = z.object({
	type: z.enum(["string", "boolean"]),
	multiple: z.boolean().optional(),
	short: z.string().optional(),
	default: z
		.union([z.string(), z.boolean(), z.array(z.string()), z.array(z.boolean())])
		.optional(),
});

export type WhiskersExecutorOptionsType = z.infer<
	typeof WhiskersExecutorOptions
>;
export const WhiskersExecutorOptions = z.record(WhiskersExecutorOption);

export const WhiskersExecutorServiceEnum = {
	WHISKERS_DOCS: "whiskers-docs",
	WHISKERS_APP: "whiskers-app",
	WHISKERS_BACK: "whiskers-back",
	WHISKERS_FULL: "whiskers-full",
} as const;
export type WhiskersExecutorServiceEnumType =
	(typeof WhiskersExecutorServiceEnum)[keyof typeof WhiskersExecutorServiceEnum];

export const WhiskersExecutorModeEnum = {
	STANDARD: "standard",
	DOCKERLESS: "dockerless",
} as const;
export type WhiskersExecutorModeEnumType =
	(typeof WhiskersExecutorModeEnum)[keyof typeof WhiskersExecutorModeEnum];

export type WhiskersExecutorValuesType = z.infer<typeof WhiskersExecutorValues>;
export const WhiskersExecutorValues = z.object({
	service: z.nativeEnum(WhiskersExecutorServiceEnum),
	mode: z.nativeEnum(WhiskersExecutorModeEnum),
	dev: z.boolean().default(false),
});

export type WhiskersExecutorCommandsType =
	(typeof WhiskersExecutorCommandsEnum)[keyof typeof WhiskersExecutorCommandsEnum];
export const WhiskersExecutorCommandsEnum = {
	SERVE: "serve",
	BUILD: "build",
} as const;

export type WhiskerExecutorInputContextType = z.infer<
	typeof WhiskerExecutorInputContext
>;
export const WhiskerExecutorInputContext = z.object({
	commands: z.nativeEnum(WhiskersExecutorCommandsEnum),
	projectFolder: z.string(),
});

export type WhiskerServiceRunFunctionType = (
	context: WhiskerExecutorInputContextType,
	values: WhiskersExecutorValuesType,
) => Promise<void>;
