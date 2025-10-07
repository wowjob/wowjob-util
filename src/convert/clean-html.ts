export const cleanHTML = (html = '') => {
  html = html.replace(
    /<img\b[^>]*\bsrc\s*=\s*["']data:image[^"']*["'][^>]*>/gi,
    '',
  )
  html = html.replace(
    /<img\b[^>]*\bsrc\s*=\s*["']https:\/\/static\.[^"']*["'][^>]*>/gi,
    '',
  )
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  html = html.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '')
  html = html.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
  html = html.replace(/\sclass\s*=\s*["']sc-[^"']*["']/gi, '')

  html = html.replace(
    /<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi,
    '',
  )

  return html
}
