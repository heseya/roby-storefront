import { ID } from '@directus/sdk'
import { DirectusImage } from './DirectusImage'
import { DirectusTranslated } from './DirectusTranslated'

export interface Person {
  id: ID
  name: string
  email?: string
  phone?: string
  linkedin_url?: string
  group?: string
  part_of_team: boolean
  avatar: DirectusImage
  date_created: string

  translations: DirectusTranslated<{
    description?: string
  }>
}
