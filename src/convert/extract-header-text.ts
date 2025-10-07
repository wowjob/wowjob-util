type TExtractHeaderText = {
  title: string
  description: string
  content: string
  indiceMap: {
    titleEnd: number
    descriptionEnd: number
  }
}

export const extractHeaderText = (
  text: string,
  maxTitle = 60,
  maxDescription = 160,
): TExtractHeaderText => {
  const wordList = text.split(/\s+/)

  let title = ''
  let description = ''
  let i = 0

  // build title
  while (i < wordList.length) {
    const next = title ? `${title} ${wordList[i]}` : wordList[i]
    if (next.length > maxTitle) break
    title = next
    i++
  }
  const titleEnd = i

  // build description
  while (i < wordList.length) {
    const next = description ? `${description} ${wordList[i]}` : wordList[i]
    if (next.length > maxDescription) break
    description = next
    i++
  }
  const descriptionEnd = i

  // Instead of rebuilding, slice original text at the right spot
  // Find the position of the first word after description
  const cutoffRegex = new RegExp(`^(?:\\S+\\s+){${descriptionEnd}}`, 'm')
  const match = cutoffRegex.exec(text)
  const content = match ? text.slice(match[0].length) : ''

  return {
    title: title.trim(),
    description: description.trim(),
    content: content.trim(),
    indiceMap: {
      titleEnd,
      descriptionEnd,
    },
  }
}
