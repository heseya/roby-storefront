import { ID } from '@directus/sdk'
import { DirectusTranslated } from './DirectusTranslated'
import { DirectusImage } from './DirectusImage'

export interface ContactDepartment {
  id: ID
  email?: string
  phone_mobile?: string
  phone_stationery?: string

  translations: DirectusTranslated<{
    name?: string
  }>
}

export interface ContactPerson {
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
