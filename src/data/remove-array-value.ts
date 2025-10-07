// remove-array-value.ts

export const removeArrayValue = <T>(arr: T[], valueList: T | T[]): T[] => {
  const values = Array.isArray(valueList) ? valueList : [valueList]

  return arr.filter((item) => {
    return !values.includes(item)
  })
}
