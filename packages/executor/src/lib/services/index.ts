import {
  type WhiskerServiceRunFunctionType,
  WhiskersExecutorServiceEnum,
  type WhiskersExecutorServiceEnumType,
} from '../types'
import { runWhiskersBack } from './whiskers-back'
import { runWhiskersDocs } from './whiskers-docs'
import { runWhiskersFull } from './whiskers-full'
import { runWhiskersWeb } from './whiskers-web'

export const runService: Record<
  WhiskersExecutorServiceEnumType,
  WhiskerServiceRunFunctionType
> = {
  [WhiskersExecutorServiceEnum.WHISKERS_WEB]: runWhiskersWeb,
  [WhiskersExecutorServiceEnum.WHISKERS_BACK]: runWhiskersBack,
  [WhiskersExecutorServiceEnum.WHISKERS_DOCS]: runWhiskersDocs,
  [WhiskersExecutorServiceEnum.WHISKERS_FULL]: runWhiskersFull,
}
