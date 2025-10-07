export const toURLEncoded = (obj: Record<string, string | number | boolean>) =>
  new URLSearchParams(
    Object.entries(obj).map(([k, v]) => [k, String(v)]),
  ).toString()
