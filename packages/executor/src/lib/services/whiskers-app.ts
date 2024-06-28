import type {
  WhiskerExecutorInputContextType,
  WhiskersExecutorValuesType,
} from "../types";
import { logger } from "../utils/logger";
import { $ } from "bun";

export async function runWhiskersApp(
  context: WhiskerExecutorInputContextType,
  values: WhiskersExecutorValuesType
): Promise<void> {
  logger.info(`🚀 initializing ${values.service}`);
  const excCommand = values.dev ? context.commands + ":dev" : context.commands;
  logger.info(`🚀 running ${excCommand} on ${values.service}`);
  await $`bun --filter '${values.service}' ${excCommand} `;
}
