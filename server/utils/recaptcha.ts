import axios from 'axios'

export const verifyRecaptchToken = async ({
  secret,
  token,
  minScore,
  action,
}: {
  secret: string
  token: string
  minScore: number
  action: string
}): Promise<boolean> => {
  const { data } = await axios.get<{ success: boolean; score: number; action: string }>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    {
      method: 'POST',
    },
  )
  return data?.success && data?.score >= minScore && data?.action === action
}
