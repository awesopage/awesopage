import { useState } from 'react'
import { useMountedState } from 'react-use'

export type ActionState = 'initial' | 'loading' | 'error' | 'ready'

export interface ActionEventHandlers<T> {
  readonly onReady?: (result: T) => void
  readonly onError?: (error: Error) => void
  readonly onFinally?: () => void
}

export const useAction = <T, P = void>(
  action: (options: P) => Promise<T>,
  initialResult?: T,
): [(options: P, eventHandlers?: ActionEventHandlers<T>) => void, ActionState, T | undefined, Error | undefined] => {
  const isMounted = useMountedState()
  const [state, setState] = useState<ActionState>(typeof initialResult === 'undefined' ? 'initial' : 'ready')
  const [result, setResult] = useState<T | undefined>(initialResult)
  const [error, setError] = useState<Error | undefined>()

  const handleReady = (value: T, eventHandlers: ActionEventHandlers<T>) => {
    setState('ready')
    setResult(value)

    if (isMounted() && eventHandlers.onReady) {
      eventHandlers.onReady(value)
    }
  }

  const handleError = (err: Error, eventHandlers: ActionEventHandlers<T>) => {
    console.error(err)

    setState('error')
    setError(err)

    if (isMounted() && eventHandlers.onError) {
      eventHandlers.onError(err)
    }
  }

  const handleFinally = (eventHandlers: ActionEventHandlers<T>) => {
    if (isMounted() && eventHandlers.onFinally) {
      eventHandlers.onFinally()
    }
  }

  const run = (options: P, eventHandlers: ActionEventHandlers<T> = {}) => {
    setState('loading')
    setResult(undefined)
    setError(undefined)

    action(options)
      .then((value: T) => handleReady(value, eventHandlers))
      .catch((err: Error) => handleError(err, eventHandlers))
      .finally(() => handleFinally(eventHandlers))
  }

  return [run, state, result, error]
}
