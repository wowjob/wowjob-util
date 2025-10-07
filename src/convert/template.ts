export const renderTemplateRegex = (
  template: string,
  dataMap: Record<string, string>,
): string =>
  template.replace(/{{(.*?)}}/g, (_, key) => dataMap[key.trim()] ?? '')

export const renderTemplateStreaming = (
  template: string,
  dataMap: Record<string, string | number>,
): string => {
  let renderText = ''

  try {
    renderText = template
      .split(/({{.*?}})/g)
      .map((part) => {
        const match = part.match(/^{{(.*?)}}$/)
        return match ? (dataMap[match[1].trim()] ?? '') : part
      })
      .join('')
  } catch (error) {
    console.error(error, 'Render error')
  }

  return renderText
}
