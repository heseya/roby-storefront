import axios from 'axios'

const { MIN_RECAPTCHA_SCORE, RECAPTCHA_SECRET } = process.env

const minRecapchaScore = Number(MIN_RECAPTCHA_SCORE) || 0.7

export const verifyRecaptchToken = async (token: string): Promise<boolean> => {
  const { data } = await axios.get<{ score: number }>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`,
    {
      method: 'POST',
    },
  )
  return data?.score > minRecapchaScore
}
