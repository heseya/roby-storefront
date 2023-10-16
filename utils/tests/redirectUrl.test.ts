import { describe, test, expect } from 'vitest'
import { pushVariablesToUrl, extractVariables, replaceVariablesInPathPattern } from '../redirectUrl'

describe('redirectUrl', () => {
  test('should extract uuid from url', () => {
    const path = '/old-product/1c31110b-48c2-4013-9365-bf200c5d122f/'
    const pattern = '/old-product/{id}/'
    expect(extractVariables(path, pattern)).toEqual(['1c31110b-48c2-4013-9365-bf200c5d122f'])
  })
  test('should extract slug from url', () => {
    const path = '/old-category/super-extra-slug/'
    const pattern = '/old-category/{slug}/'
    expect(extractVariables(path, pattern)).toEqual(['super-extra-slug'])
  })
  test('should extract slug and uuid from url', () => {
    const path = '/old-category/super-extra-slug/old-product/1c31110b-48c2-4013-9365-bf200c5d122f/'
    const pattern = '/old-category/{slug}/old-product/{id}/'
    expect(extractVariables(path, pattern)).toEqual([
      'super-extra-slug',
      '1c31110b-48c2-4013-9365-bf200c5d122f',
    ])
  })
  test('should push variables to path', () => {
    const patternPath = '/new-category/{slug}/new-product/{id}/'
    const variables = ['super-extra-slug', '1c31110b-48c2-4013-9365-bf200c5d122f']
    expect(pushVariablesToUrl(patternPath, variables)).toEqual(
      '/new-category/super-extra-slug/new-product/1c31110b-48c2-4013-9365-bf200c5d122f/',
    )
  })
  test('should replace variables in path to any string regex', () => {
    const patternPath = '/new-category/{slug}/new-product/{id}/'
    expect(replaceVariablesInPathPattern(patternPath)).toEqual(
      '/new-category/([^/]+)/new-product/([^/]+)/',
    )
  })
})
