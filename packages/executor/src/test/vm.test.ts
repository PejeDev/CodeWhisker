import { describe, expect, it, jest, mock, spyOn } from 'bun:test'
import {
  isDockerComposeInstalled,
  isVmRunning,
  runDockerCompose,
  runVmCompose,
} from '../lib/services/vm'
import { logger } from '../lib/utils/logger'

mock.module('../lib/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
  },
}))

mock.module('../lib/services/vm', () => ({
  isVmRunning: jest.fn().mockResolvedValue(true),
  isDockerComposeInstalled: jest.fn().mockResolvedValue(true),
  runDockerCompose: jest.fn().mockResolvedValue({ stderr: 'Mock stderr' }),
}))

spyOn(process, 'exit').mockImplementation(jest.fn() as never)

describe('runVMCompose', () => {
  it('should log an error and exit if Docker or Podman is not installed or running', async () => {
    ;(isVmRunning as jest.Mock).mockResolvedValueOnce(false)

    await runVmCompose('/path/to/docker-compose.yml')

    expect(logger.error).toHaveBeenCalledWith(
      '🔥 Docker or Podman is required to run in standard mode, use --mode=dockerless to run without Docker or Podman.',
    )
    expect(process.exit).toHaveBeenCalled()
  })

  it('should log an error and exit if Docker or Podman Compose is not installed', async () => {
    ;(isDockerComposeInstalled as jest.Mock).mockResolvedValueOnce(false)

    await runVmCompose('/path/to/docker-compose.yml')

    expect(logger.error).toHaveBeenCalledWith(
      '🔥 Docker or Podman Compose is required to run this service in standard mode',
    )
    expect(process.exit).toHaveBeenCalled()
  })

  it('should run Docker Compose and log the stderr', async () => {
    ;(isVmRunning as jest.Mock).mockResolvedValueOnce(true)
    ;(isDockerComposeInstalled as jest.Mock).mockResolvedValueOnce(true)

    await runVmCompose('/path/to/docker-compose.yml')

    expect(logger.info).toHaveBeenCalledWith(
      '🚀 Running VM development containers',
    )
    expect(runDockerCompose).toHaveBeenCalledWith(
      '/path/to/docker-compose.yml',
      'up --detach --remove-orphans',
    )
    expect(logger.info).toHaveBeenCalledWith('Mock stderr')
  })

  it('should log an error and exit if an error occurs', async () => {
    ;(isVmRunning as jest.Mock).mockRejectedValueOnce(new Error('Mock error'))

    await runVmCompose('/path/to/docker-compose.yml')

    expect(logger.error).toHaveBeenCalledWith(
      '🔥 Error running VM development containers',
    )
    expect(logger.error).toHaveBeenCalledWith(new Error('Mock error'))
    expect(process.exit).toHaveBeenCalled()
  })
})
