type TAnyObjectMap = { [key: string]: string | null | undefined }

export const dataValueNullToString = <T extends TAnyObjectMap>(
  inputMap: T,
): T => {
  const outputMap = { ...inputMap } as T
  for (const key in outputMap) {
    if (outputMap[key] === null) {
      outputMap[key] = '' as T[Extract<keyof T, string>]
    }
  }
  return outputMap
}
