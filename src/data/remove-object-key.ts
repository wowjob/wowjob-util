// remove-object-key.ts

export const removeObjectKey = <T extends object, K extends keyof T>(
  object: T,
  keyOrKeys: K | K[],
): Omit<T, K> => {
  const keyList = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
  const result = { ...object }

  for (const key of keyList) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      delete result[key]
    }
  }

  return result as Omit<T, K>
}
