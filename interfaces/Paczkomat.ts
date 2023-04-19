export interface Paczkomat {
  name: string
  address: {
    line1: string
    line2: string
  }
  address_details: {
    building_number: string
    city: string
    flat_number: string | null
    post_code: string
    province: string
    street: string
  }
  location: { longitude: number; latitude: number }
  functions: string[]
  image_url: string
  easy_access_zone: boolean
  location_247: boolean
  location_date: string | null
  location_description: string | null
  opening_hours: string
  partner_id: number
  type: string[]
}
