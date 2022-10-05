export const getRange = (min: number, max: number): number[] => {
  return Array.from(Array(max + 1 - min).keys()).map((index) => index + min)
}
