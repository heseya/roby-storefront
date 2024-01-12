import axios from 'axios'

export const verifyRecaptchToken = async (
  secret: string,
  token: string,
  minScore = 0.7,
): Promise<boolean> => {
  const { data } = await axios.get<{ score: number }>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST',
    },
  )
  return data?.score > minScore
}
