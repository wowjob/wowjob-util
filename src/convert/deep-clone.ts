export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) return obj.map(deepClone) as any

  const clone: any = {}

  for (const key in obj) {
    clone[key] = deepClone(obj[key])
  }

  return clone
}
