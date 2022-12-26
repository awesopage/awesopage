import pino, { LevelWithSilent, Logger } from 'pino'
import pinoPretty from 'pino-pretty'

export const createLogger = (caller: string, level?: LevelWithSilent): Logger => {
  const isProduction = process.env.NODE_ENV === 'production'
  const defaultLevel = process.env.APP_SILENT_LOGGER === 'true' ? 'silent' : isProduction ? 'info' : 'debug'
  const resolvedLevel = level ?? defaultLevel

  if (isProduction) {
    return pino({ level: resolvedLevel }).child({ caller })
  }

  return pino({ level: resolvedLevel }, pinoPretty({ ignore: 'pid,hostname' })).child({
    caller,
  })
}
