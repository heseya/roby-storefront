import { Redirect, RedirectType } from '@heseya/store-core'
import { describe, test, expect } from 'vitest'

import {
  pushVariablesToUrl,
  extractVariables,
  replaceVariablesInPathPattern,
  resolveRedirect,
  trimSlash,
} from '../redirectUrl'

const mockRedirect = (source: string, target: string, type: RedirectType = 301): Redirect => ({
  id: 'id',
  enabled: true,
  name: 'name',
  type,
  source_url: source,
  target_url: target,
})

describe('Redirects | extractVariables', () => {
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
})

describe('Redirects | pushVariablesToUrl', () => {
  test('should push variables to path', () => {
    const patternPath = '/new-category/{slug}/new-product/{id}/'
    const variables = ['super-extra-slug', '1c31110b-48c2-4013-9365-bf200c5d122f']
    expect(pushVariablesToUrl(patternPath, variables)).toEqual(
      '/new-category/super-extra-slug/new-product/1c31110b-48c2-4013-9365-bf200c5d122f/',
    )
  })
})

describe('Redirects | replaceVariablesInPathPattern', () => {
  test('should replace variables in path to any string regex', () => {
    const patternPath = '/new-category/{slug}/new-product/{id}/'
    expect(replaceVariablesInPathPattern(patternPath)).toEqual(
      '/new-category/([^/]+)/new-product/([^/]+)/',
    )
  })
})

describe('Redirects | trimSlash', () => {
  test('should replace end trailing slash with empty string', () => {
    const path = '/new-category/{slug}/new-product/{id}/'
    const expected = '/new-category/{slug}/new-product/{id}'
    expect(trimSlash(path)).toEqual(expected)
  })
})

describe('Redirects | resolveRedirect', () => {
  test('should not return redirect if pattern not match', () => {
    const sourceUrl = '/test'

    const sourcePattern = '/category/{slug}'
    const targetPattern = '/categories/{slug}'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl)).toEqual({ target: '', type: 0 })
  })

  test('should create redirect to given path', () => {
    const source = '/produkty/prod-slug/'
    const target = '/products/prod-slug'
    const redirects = [mockRedirect(source, target, 301)]
    expect(resolveRedirect(redirects, source)).toEqual({ target, type: 301 })
  })

  test('should handle multiple variables in path', () => {
    const sourceUrl = '/new-category/test-slug/new-product/test-id'
    const targetUrl = '/categories/test-slug/product/test-id'

    const sourcePattern = '/new-category/{slug}/new-product/{id}'
    const targetPattern = '/categories/{slug}/product/{id}'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl).target).toEqual(targetUrl)
  })

  test('should ignore trailing slashes in source', () => {
    const sourceUrl = '/produkty/prod-slug'
    const targetUrl = '/products/prod-slug'

    const sourcePattern = '/produkty/prod-slug/'
    const targetPattern = '/products/prod-slug'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl).target).toEqual(targetUrl)
  })

  test('should ignore trailing slashes in target', () => {
    const sourceUrl = '/produkty/prod-slug'
    const targetUrl = '/products/prod-slug'

    const sourcePattern = '/produkty/prod-slug'
    const targetPattern = '/products/prod-slug/'
    const redirects = [mockRedirect(sourcePattern, targetPattern)]

    expect(resolveRedirect(redirects, sourceUrl).target).toEqual(targetUrl)
  })
})
