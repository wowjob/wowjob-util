export const getDomainDbIdFromHost = (
  host: string,
  joinBy = '_',
  auth = false,
) => {
  if (!auth && host.endsWith('local')) {
    host = host.slice(0, -5)
  }
  if (!auth && host.endsWith('prod')) {
    host = host.slice(0, -4)
  }
  const domainDbId = host.split('.').slice(-2).join(joinBy)

  return domainDbId
}
