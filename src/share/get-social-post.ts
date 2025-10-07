import type { TScheduleInput, TVideoNetwork } from '@wowjob/type'

export const getSocialPostData = (input: TScheduleInput) => {
  const {
    profileId,
    network,
    title,
    text,
    firstComment,
    sharedAtTime,
    type,
    local_id,
  } = input

  // Validate sharedAtTime
  const nowSeconds = Math.floor(Date.now() / 1000)
  const scheduledTime =
    typeof sharedAtTime === 'number' && !isNaN(sharedAtTime) && sharedAtTime > 0
      ? Math.max(sharedAtTime, nowSeconds + 60)
      : nowSeconds + 60

  // Since scheduledTime is valid, no need for try-catch
  const dateTime = new Date((scheduledTime || 0) * 1000)
    .toISOString()
    .replace(/\.\d{3}Z$/, '')

  const base: {
    publicationDate: { dateTime: string; timezone: string }
    text: string
    providers: { network: TVideoNetwork; id: string }[]
    firstCommentText?: string
    media: string[]
    local_id?: string
    remote_id?: string
  } = {
    publicationDate: {
      dateTime,
      timezone: 'UTC',
    },
    text,
    providers: [
      {
        network: (network as any) === 'x' ? 'twitter' : network,
        id: profileId,
      },
    ],
    ...(firstComment ? { firstCommentText: firstComment } : {}),
    media: [],
    local_id,
  }

  // Assign media based on type
  if (type === 'video') {
    base.media = input.share_video ? [input.share_video] : []
  } else {
    base.media = input.share_image
      ? Array.isArray(input.share_image)
        ? input.share_image
        : [input.share_image]
      : []
  }

  const networkData: Record<TVideoNetwork, object> = {
    tiktok: {
      tiktokData: {
        title: title || text,
        disableComment: false,
        disableDuet: false,
        disableStitch: false,
      },
    },
    facebook: {
      facebookData: {
        title: title || '',
      },
    },
    instagram: {
      instagramData: {
        showReelOnFeed: true,
      },
    },
    youtube: {
      youtubeData: {
        title: title || text,
        privacy: 'public',
        tags: ['shorts', 'reels'],
        madeForKids: false,
      },
    },
    linkedin: {
      linkedinData: {
        type,
        ...(title ? { documentTitle: title } : {}),
      },
    },
    twitter: {
      twitterData: {
        type,
      },
    },
    threads: {},
    pinterest: {
      // pinterestData: {
      //   boardId: 'jobs',
      //   // boardId: profileId,
      //   pinTitle: title,
      // },
    },
    gmb: {
      gmbData: {
        type: 'publication' as 'publication' | 'photo',
        // description: text,
        // media: base.media,
      },
    },
  }

  return {
    ...base,
    ...networkData[network],
  }
}
