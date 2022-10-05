import { jest } from '@jest/globals'
import { when } from 'jest-when'

let nextMockId = 1

export const mockObject = <T>(partialProps: Partial<T> = {}): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { ...partialProps, __mockId: nextMockId++ } as any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const whenCall = <T, P extends any[]>(fn: (...args: P) => T, withArgs?: P) => {
  return when(fn).calledWith(
    // Match arguments partially
    when.allArgs((args, equals) => equals(args, expect.arrayContaining(withArgs ?? []))),
  )
}

export const disableConsoleLogging = () => {
  jest.spyOn(console, 'log').mockImplementation(jest.fn())
  jest.spyOn(console, 'debug').mockImplementation(jest.fn())
  jest.spyOn(console, 'info').mockImplementation(jest.fn())
  jest.spyOn(console, 'warn').mockImplementation(jest.fn())
  jest.spyOn(console, 'error').mockImplementation(jest.fn())
}
