import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  check,
  liveUrls,
  normalizeUrl,
  parseRedirects,
  pathToUrl
} from './check-removed-pages.mjs'

const state = (overrides = {}) => ({
  baseUrls: new Set(['/docs/a', '/docs/b']),
  headUrls: new Set(['/docs/a', '/docs/b']),
  baseRedirects: [],
  headRedirects: [],
  ...overrides
})

test('pathToUrl drops the extension and README segments', () => {
  assert.equal(pathToUrl('/README.mdx'), '/docs')
  assert.equal(pathToUrl('/platform/README.mdx'), '/docs/platform')
  assert.equal(pathToUrl('/tutorials/wifi.mdx'), '/docs/tutorials/wifi')
})

test('normalizeUrl strips the fragment, query and trailing slash', () => {
  assert.equal(normalizeUrl('/docs/a/#section'), '/docs/a')
  assert.equal(normalizeUrl('/docs/a?x=1'), '/docs/a')
  assert.equal(normalizeUrl('/'), '/')
})

test('liveUrls needs both a manifest route and its file', () => {
  const manifest = {
    routes: [
      { title: 'Group', routes: [{ path: '/a.mdx' }, { path: '/gone.mdx' }] },
      { heading: true, title: 'Heading' },
      { path: '/b/README.mdx', routes: [{ path: '/b/c.mdx' }] }
    ]
  }
  const files = new Set(['a.mdx', 'b/README.mdx', 'b/c.mdx', 'unlisted.mdx'])
  assert.deepEqual(
    [...liveUrls(manifest, (file) => files.has(file))].sort(),
    ['/docs/a', '/docs/b', '/docs/b/c']
  )
})

test('parseRedirects rejects a malformed file and malformed entries', () => {
  assert.equal(parseRedirects([]).errors.length, 1)
  const { entries, errors } = parseRedirects({
    redirects: [{ from: '/docs/a', to: '/docs/b' }, { from: '/docs/c' }]
  })
  assert.equal(entries.length, 1)
  assert.equal(errors.length, 1)
})

test('an unchanged set of pages passes', () => {
  assert.deepEqual(check(state()), [])
})

test('a removed page without a redirect fails', () => {
  const errors = check(state({ headUrls: new Set(['/docs/a']) }))
  assert.equal(errors.length, 1)
  assert.match(errors[0], /^\/docs\/b is removed/)
})

test('a removed page with a redirect passes', () => {
  const errors = check(
    state({
      headUrls: new Set(['/docs/a']),
      headRedirects: [{ from: '/docs/b', to: '/docs/a/#moved' }]
    })
  )
  assert.deepEqual(errors, [])
})

test('a redirect to a page that is not live fails', () => {
  const errors = check(
    state({
      headUrls: new Set(['/docs/a']),
      headRedirects: [{ from: '/docs/b', to: '/docs/nowhere' }]
    })
  )
  assert.equal(errors.length, 1)
  assert.match(errors[0], /isn't a live docs page/)
})

test('a redirect chain fails because the target is not a live page', () => {
  const errors = check(
    state({
      baseUrls: new Set(['/docs/a']),
      headUrls: new Set(['/docs/a']),
      headRedirects: [
        { from: '/docs/x', to: '/docs/y' },
        { from: '/docs/y', to: '/docs/a' }
      ]
    })
  )
  assert.equal(errors.length, 1)
  assert.match(errors[0], /\/docs\/x redirects to \/docs\/y/)
})

test('redirects off the docs site are allowed', () => {
  const headUrls = new Set(['/docs/a'])
  assert.deepEqual(
    check(
      state({
        headUrls,
        headRedirects: [{ from: '/docs/b', to: 'https://example.com/b' }]
      })
    ),
    []
  )
  assert.deepEqual(
    check(
      state({ headUrls, headRedirects: [{ from: '/docs/b', to: '/blog/b/' }] })
    ),
    []
  )
})

test('a redirect from a live page fails', () => {
  const errors = check(
    state({ headRedirects: [{ from: '/docs/a', to: '/docs/b' }] })
  )
  assert.equal(errors.length, 1)
  assert.match(errors[0], /is a live page/)
})

test('a non-canonical or duplicate "from" fails', () => {
  const errors = check(
    state({
      headRedirects: [
        { from: '/docs/old/', to: '/docs/a' },
        { from: '/blog/old', to: '/docs/a' },
        { from: '/docs/dup', to: '/docs/a' },
        { from: '/docs/dup', to: '/docs/b' }
      ]
    })
  )
  assert.equal(errors.length, 3)
})

test('removing a redirect fails unless a page is served there again', () => {
  const baseRedirects = [{ from: '/docs/old', to: '/docs/a' }]
  assert.equal(check(state({ baseRedirects })).length, 1)
  assert.deepEqual(
    check(
      state({
        baseRedirects,
        headUrls: new Set(['/docs/a', '/docs/b', '/docs/old'])
      })
    ),
    []
  )
})
