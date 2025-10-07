export const getSocialSimpleObject = (s = '') => {
  const partList = s.split('\n')
  const [title, text, first_comment] = partList.slice(0, 3)
  const videoScript = partList.slice(3).filter(Boolean)

  return { title, text, first_comment, videoScript }
}
