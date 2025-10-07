export const getProfileFullName = (
  profile:
    | {
        first_name: string | null | undefined
        middle_name: string | null | undefined
        last_name: string | null | undefined
        nickname: string | null | undefined
      }
    | undefined,
  nickName?: boolean,
) => {
  if (profile) {
    const fullNamePartList = [
      profile.first_name,
      profile.middle_name,
      profile.last_name,
    ].filter(Boolean)

    return `${fullNamePartList.join(' ')}${nickName ? ` a.k.a. ${profile.nickname}` : ''}`
  }

  return ''
}
