import { getCleanUrl } from '../convert'

export const getUTMSource = ({
  url = '',
  utmSource = 'wowjob.ai',
}: {
  url: string
  utmSource?: string
}) => {
  console.log(url, 'URL')
  return `${getCleanUrl(url)}?utm_source=${utmSource}`
}
