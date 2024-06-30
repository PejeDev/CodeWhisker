import { describe, expect, it, jest } from 'bun:test'
import { runService } from '../lib/services'
import {
  type WhiskerExecutorInputContextType,
  type WhiskerServiceRunFunctionType,
  WhiskersExecutorServiceEnum,
  type WhiskersExecutorServiceEnumType,
  type WhiskersExecutorValuesType,
} from '../lib/types'

describe('runService', () => {
  const mockContext: WhiskerExecutorInputContextType = {
    commands: 'build',
    projectFolder: '/test',
  }
  const mockValues: WhiskersExecutorValuesType = {
    service: 'whiskers-docs',
    mode: 'standard',
    dev: false,
  }

  it('should run the correct service function based on the provided enum', () => {
    const mockRunFunction: WhiskerServiceRunFunctionType = jest.fn()
    const mockEnum: WhiskersExecutorServiceEnumType =
      WhiskersExecutorServiceEnum.WHISKERS_WEB

    runService[mockEnum] = mockRunFunction

    runService[mockEnum](mockContext, mockValues)

    expect(mockRunFunction).toHaveBeenCalled()
  })

  it('should throw an error if the enum is not found', () => {
    const mockEnum = 'INVALID_ENUM' as WhiskersExecutorServiceEnumType

    expect(() => runService[mockEnum](mockContext, mockValues)).toThrowError()
  })
})
