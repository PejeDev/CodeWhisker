import { $ } from 'bun'
import {
  type WhiskerExecutorInputContextType,
  WhiskersExecutorModeEnum,
  type WhiskersExecutorValuesType,
} from '../types'
import { logger } from '../utils/logger'
import { runVmCompose } from './vm'

export async function runWhiskersFull(
  context: WhiskerExecutorInputContextType,
  values: WhiskersExecutorValuesType,
): Promise<void> {
  logger.info(`🚀 initializing ${values.service}`)
  const excCommand = values.dev ? `${context.commands}:dev` : context.commands

  if (values.mode !== WhiskersExecutorModeEnum.DOCKERLESS) {
    const path = `${context.projectFolder}/docker/whiskers-back/docker-compose.yml`
    await runVmCompose(path)
  }

  logger.info(`🚀 running ${excCommand} on ${values.service}`)
  await $`bun --filter '${`${values.service.split('-')[0]}-*`}' ${excCommand} `
}
