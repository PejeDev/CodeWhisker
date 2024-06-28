import { $, type ShellOutput } from 'bun'
import { logger } from '../utils/logger'

export async function runVMCompose(path: string): Promise<void> {
  try {
    const isVMInstalledOrRunning = await isVMRunning()
    const isComposeInstalled = await isDockerComposeInstalled()

    if (!isVMInstalledOrRunning) {
      logger.error(
        '🔥 Docker or Podman is required to run in standard mode, use --mode=dockerless to run without Docker or Podman.',
      )
      process.exit()
    }

    if (isComposeInstalled) {
      logger.error(
        '🔥 Docker or Podman Compose is required to run this service in standard mode',
      )
      process.exit()
    }

    logger.info('🚀 Running VM development containers')

    const { stderr } = await runDockerCompose(
      path,
      'up --detach --remove-orphans',
    )

    logger.info(stderr.toString())
  } catch (error) {
    logger.error('🔥 Error running VM development containers')
    logger.error(error)
    process.exit()
  }
}

export async function runDockerCompose(
  path: string,
  args: string,
): Promise<ShellOutput> {
  const cli = await $`docker-compose --file ${path} ${args}`.quiet()
  return cli
}

export async function isVMRunning(): Promise<boolean> {
  const isDocker = await isDockerInstalled()
  const isPodman = await isPodmanInstalled()

  return isDocker || isPodman
}

export async function isDockerInstalled(): Promise<boolean> {
  try {
    await $`docker --version`.quiet()
    return true
  } catch (error) {
    return false
  }
}

export async function isPodmanInstalled(): Promise<boolean> {
  try {
    await $`podman --version`.quiet()
    return true
  } catch (error) {
    return false
  }
}

export async function isDockerComposeInstalled(): Promise<boolean> {
  try {
    await $`docker-compose version`.quiet()
    return true
  } catch (error) {
    return false
  }
}
