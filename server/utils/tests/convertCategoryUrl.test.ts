import { describe, test, expect } from 'vitest'
import { convertCategoryUrl } from '../convertCategoryUrl'

describe('convertCategoryUrl', () => {
  test('should return null if url is not a legacy category url', () => {
    const url = new URL('https://heseya.com/category/abc')
    expect(convertCategoryUrl(url)).toBe(null)
  })

  test('should return new url if url is a legacy category url', () => {
    const url = new URL('https://heseya.com/kategoria-produktu/abc')
    expect(convertCategoryUrl(url)).toEqual(new URL('https://heseya.com/category/abc'))
  })

  test('should return new url with a legacy nested categories syntax', () => {
    const url = new URL('https://heseya.com/kategoria-produktu/abc/def/ghi')
    expect(convertCategoryUrl(url)).toEqual(new URL('https://heseya.com/category/abc-def-ghi'))
  })

  test('should return new url with all existing search params', () => {
    const url = new URL('https://heseya.com/kategoria-produktu/abc?query=123&sort=asc')
    expect(convertCategoryUrl(url)).toEqual(
      new URL('https://heseya.com/category/abc?query=123&sort=asc'),
    )
  })

  test('should return new url with page param if url is a legacy category url with page param', () => {
    const url = new URL('https://heseya.com/kategoria-produktu/abc/page/2')
    expect(convertCategoryUrl(url)).toEqual(new URL('https://heseya.com/category/abc?page=2'))
  })
})
