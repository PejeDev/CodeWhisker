import { $ } from 'bun'
import type {
  WhiskerExecutorInputContextType,
  WhiskersExecutorValuesType,
} from '../types'
import { logger } from '../utils/logger'

export async function runWhiskersWeb(
  context: WhiskerExecutorInputContextType,
  values: WhiskersExecutorValuesType,
): Promise<void> {
  logger.info(`🚀 initializing ${values.service}`)
  const excCommand = values.dev ? `${context.commands}:dev` : context.commands
  logger.info(`🚀 running ${excCommand} on ${values.service}`)
  await $`bun --cwd ${`${context.projectFolder}/apps/${values.service}`} ${excCommand} `
}
