export const getSimpleUserId = (userId = '', modulus = 3) =>
  userId
    .split('')
    .filter((_, k) => k % modulus)
    .join('')
