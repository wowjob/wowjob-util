import type { TShareSocialMap } from '@wowjob/type'
import { shareSocialPrefixMap } from '@wowjob/type'

type TGetShareToSocialLinkProps = {
  social: TShareSocialMap
  url: string
}

export const getShareToSocialLink = ({
  social,
  url,
}: TGetShareToSocialLinkProps): string => {
  const encodedUrl = encodeURIComponent(url)

  switch (social) {
    case 'x':
      // text first for body, then url; official params
      return `${shareSocialPrefixMap[social]}&url=${encodedUrl}`
    case 'facebook':
      // Unchanged; relies on OG tags
      return `${shareSocialPrefixMap[social]}${encodedUrl}`
    case 'linkedin':
      // Only url; title/summary/source deprecated—use OG tags on page for previews
      return `${shareSocialPrefixMap[social]}${encodedUrl}`
    default:
      throw new Error(`Unsupported social platform: ${social}`)
  }
}
