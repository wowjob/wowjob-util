export const getCleanUrl = (url = '') => {
  try {
    const { origin, pathname } = new URL(url)

    return `${origin}${pathname}`
  } catch (error) {
    return ''
  }
}
