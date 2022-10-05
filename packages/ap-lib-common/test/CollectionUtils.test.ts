import { getRange } from 'ap-lib-common/src/CollectionUtils'

describe('get range', () => {
  test('should return all numbers from min to max', () => {
    const range = getRange(0, 5)

    expect(range).toEqual([0, 1, 2, 3, 4, 5])
  })
})
