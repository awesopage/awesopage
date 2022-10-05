import { assertDefined } from 'ap-lib-common/src/AssertUtils'

describe('assert defined', () => {
  test('should pass when value is defined', () => {
    const valueHolder: Record<'value', string | undefined> = { value: 'testing' }

    assertDefined(valueHolder.value, 'valueHolder.value')

    // Can use valueHolder.value as a string AFTER assertDefined
    expect(valueHolder.value.length).toBePositive()
  })

  test('should throw when value is undefined', () => {
    expect(() => assertDefined(undefined, 'value')).toThrow()
  })

  test('should throw when value is null', () => {
    // eslint-disable-next-line no-null/no-null
    expect(() => assertDefined(null, 'value')).toThrow()
  })
})
