import * as yaml from 'js-yaml'

type TParseResult<T> = T | null

// Root map type with fixed keys
type TRootMap<TResponse> = {
  count: number
  message: string
  response: TResponse
}

// Recursive type for inferred required keys (empty for primitives)
type TInferredRequiredKeys<T> =
  T extends Array<infer U>
    ? TInferredRequiredKeys<U>
    : T extends Record<string, unknown>
      ? { [K in keyof T]?: TInferredRequiredKeys<T[K]> }
      : {}

// Helper to build required key map from sample (runtime traversal)
const buildInferredRequiredKeys = <T>(sample: T): TInferredRequiredKeys<T> => {
  if (Array.isArray(sample)) {
    // For arrays, use first item's keys if present, else empty
    const firstItem = sample[0]
    return firstItem
      ? (buildInferredRequiredKeys(firstItem) as TInferredRequiredKeys<T>)
      : ({} as TInferredRequiredKeys<T>)
  }
  if (typeof sample === 'object' && sample !== null) {
    return Object.fromEntries(
      Object.entries(sample).map(([key, value]) => [
        key,
        buildInferredRequiredKeys(value),
      ]),
    ) as TInferredRequiredKeys<T>
  }
  return {} as TInferredRequiredKeys<T> // Primitives have no keys
}

const safeParseYaml = <T>(text: string): TParseResult<T> => {
  try {
    return yaml.load(text) as T
  } catch {
    return null
  }
}

const hasNoUnexpectedProperties = <T>(
  value: unknown,
  allowedKeyMap: TInferredRequiredKeys<T>,
): boolean => {
  if (Array.isArray(value)) {
    return value.every((item) => hasNoUnexpectedProperties(item, allowedKeyMap))
  }

  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).every((key) => {
      if (!(key in allowedKeyMap)) return false
      const subValue = (value as Record<string, unknown>)[key]
      const subAllowed = allowedKeyMap[key as keyof TInferredRequiredKeys<T>]
      if (subAllowed !== undefined) {
        return hasNoUnexpectedProperties(subValue, subAllowed!)
      }
      return true
    })
  }

  // For primitives: pass if no keys expected (allowedKeyMap empty)
  return Object.keys(allowedKeyMap).length === 0
}

export const tryParseYaml = <TResponse>({
  responseSampleMap,
  text,
}: {
  text: string
  responseSampleMap: TResponse
}): TRootMap<TResponse> | null => {
  const parsedMap = safeParseYaml<TRootMap<TResponse>>(text)
  if (!parsedMap) return null

  // Check root keys and types
  if (
    !('count' in parsedMap && typeof parsedMap.count === 'number') ||
    !('message' in parsedMap && typeof parsedMap.message === 'string') ||
    !('response' in parsedMap)
  ) {
    return null
  }

  // Infer and build required keys from sample
  const responseAllowedKeyMap = buildInferredRequiredKeys(responseSampleMap)

  // Deep validate response
  if (!hasNoUnexpectedProperties(parsedMap.response, responseAllowedKeyMap)) {
    return null
  }

  return parsedMap
}
