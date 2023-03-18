export type Predicate<T> = (value: T) => boolean

const createPredicateOperators = <T>() => ({
  and: (...predicates: Predicate<T>[]) => {
    return (value: T) => predicates.every((predicate) => predicate(value))
  },
  or: (...predicates: Predicate<T>[]) => {
    return (value: T) => predicates.some((predicate) => predicate(value))
  },
  not: (predicate: Predicate<T>) => {
    return (value: T) => !predicate(value)
  },
})

export type PredicateOperators<T> = Readonly<ReturnType<typeof createPredicateOperators<T>>>

export type PredicateBuilder<T, H> = (helpersWithOperators: H & PredicateOperators<T>) => Predicate<T>

export type TestDataFinder<T, H> = Readonly<{
  peek: (predicateBuilder?: PredicateBuilder<T, H>) => T | undefined
  any: (predicateBuilder?: PredicateBuilder<T, H>) => T
  all: (predicateBuilder?: PredicateBuilder<T, H>) => T[]
}>

export const createTestDataFinder = <T, H>(
  data: T[],
  helpersBuilder: (operators: PredicateOperators<T>) => H,
): TestDataFinder<T, H> => {
  const operators = createPredicateOperators<T>()

  const helpersWithOperators: H & PredicateOperators<T> = {
    ...helpersBuilder(operators),
    ...operators,
  }

  const createAction = <R>(matchedValuesHandler: (matchedValues: T[]) => R) => {
    return (predicateBuilder?: PredicateBuilder<T, H>) => {
      return matchedValuesHandler(predicateBuilder ? data.filter(predicateBuilder(helpersWithOperators)) : data)
    }
  }

  return {
    peek: createAction((matchedValues: T[]): T | undefined => {
      return matchedValues[0]
    }),
    any: createAction((matchedValues: T[]): T => {
      const matchedValue = matchedValues[0]

      if (typeof matchedValue === 'undefined') {
        throw new Error('No test data found')
      }

      return matchedValue
    }),
    all: createAction((matchedValues: T[]): T[] => {
      return matchedValues
    }),
  }
}
