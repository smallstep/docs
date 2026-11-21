#!/usr/bin/env node
// Fails when a change removes a page from https://smallstep.com/docs without
// leaving a redirect behind in redirects.json.
//
// A page is served when manifest.json has a route for it and the route's file
// exists. Deleting or renaming the file, or dropping or repointing the route,
// takes the URL away. This script compares the URLs served at the base ref
// with the URLs served by the working tree.
//
// Usage: node .github/scripts/check-removed-pages.mjs [base-ref]
//        base-ref defaults to origin/main.

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const MANIFEST_FILE = 'manifest.json'
export const REDIRECTS_FILE = 'redirects.json'

/**
 * Converts a manifest route path to its URL. Mirrors convertPathToSlug in
 * smallstep.com's lib/next-docs: drop the .mdx extension and README segments.
 */
export function pathToUrl(path) {
  const segments = path
    .replace(/\.mdx$/, '')
    .replace(/^\//, '')
    .split('/')
    .filter((segment) => segment !== 'README' && segment !== '')
  return segments.length ? `/docs/${segments.join('/')}` : '/docs'
}

/** Strips the query, the fragment and trailing slashes. */
export function normalizeUrl(url) {
  const bare = url.replace(/[?#].*$/, '').replace(/\/+$/, '')
  return bare === '' ? '/' : bare
}

function isDocsUrl(url) {
  return url === '/docs' || url.startsWith('/docs/')
}

/**
 * Returns the set of URLs a manifest serves.
 * @param {object} manifest - Parsed manifest.json
 * @param {(file: string) => boolean} hasFile - Whether a repo-relative file exists
 */
export function liveUrls(manifest, hasFile) {
  const urls = new Set()
  const walk = (routes) => {
    for (const route of routes ?? []) {
      if (route.path && hasFile(route.path.replace(/^\//, ''))) {
        urls.add(pathToUrl(route.path))
      }
      walk(route.routes)
    }
  }
  walk(manifest.routes)
  return urls
}

/**
 * Reads the redirect entries out of a parsed redirects.json.
 * @returns {{ entries: { from: string, to: string }[], errors: string[] }}
 */
export function parseRedirects(data) {
  const errors = []
  const entries = []
  if (!data || !Array.isArray(data.redirects)) {
    return {
      entries,
      errors: [`${REDIRECTS_FILE} must be an object with a "redirects" array.`]
    }
  }
  data.redirects.forEach((entry, index) => {
    if (typeof entry?.from !== 'string' || typeof entry?.to !== 'string') {
      errors.push(
        `${REDIRECTS_FILE}: entry ${index + 1} needs string "from" and "to" fields.`
      )
      return
    }
    entries.push({ from: entry.from, to: entry.to })
  })
  return { entries, errors }
}

/**
 * Compares the base and head states.
 * @param {object} state
 * @param {Set<string>} state.baseUrls - URLs served at the base ref
 * @param {Set<string>} state.headUrls - URLs served by the change
 * @param {{ from: string, to: string }[]} state.baseRedirects
 * @param {{ from: string, to: string }[]} state.headRedirects
 * @returns {string[]} One message per problem; empty when the change is fine
 */
export function check({ baseUrls, headUrls, baseRedirects, headRedirects }) {
  const errors = []
  const redirected = new Set()

  for (const { from, to } of headRedirects) {
    if (!isDocsUrl(from) || from !== normalizeUrl(from)) {
      errors.push(
        `${REDIRECTS_FILE}: "from" must be a /docs path with no trailing slash, query or fragment: ${from}`
      )
      continue
    }
    if (redirected.has(from)) {
      errors.push(`${REDIRECTS_FILE}: more than one redirect from ${from}`)
      continue
    }
    redirected.add(from)

    if (headUrls.has(from)) {
      errors.push(
        `${REDIRECTS_FILE}: ${from} is a live page, so its redirect would never apply. Remove the redirect or the page.`
      )
    }

    if (to.startsWith('https://')) continue
    if (!to.startsWith('/')) {
      errors.push(
        `${REDIRECTS_FILE}: "to" must be a site path or an https:// URL: ${to} (redirect from ${from})`
      )
      continue
    }
    const target = normalizeUrl(to)
    if (isDocsUrl(target) && !headUrls.has(target)) {
      errors.push(
        `${REDIRECTS_FILE}: ${from} redirects to ${to}, which isn't a live docs page.`
      )
    }
  }

  for (const url of [...baseUrls].sort()) {
    if (!headUrls.has(url) && !redirected.has(url)) {
      errors.push(
        `${url} is removed by this change and has no redirect. Add { "from": "${url}", "to": "<new location>" } to ${REDIRECTS_FILE}, or restore the page.`
      )
    }
  }

  for (const { from } of baseRedirects) {
    if (!redirected.has(from) && !headUrls.has(from)) {
      errors.push(
        `The redirect from ${from} is removed by this change, and no page is served there. Restore the redirect.`
      )
    }
  }

  return errors
}

function git(...args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024
  })
}

function readBaseState(baseRef) {
  const base = git('merge-base', baseRef, 'HEAD').trim()
  const files = new Set(
    git('ls-tree', '-r', '--name-only', '-z', base).split('\0')
  )
  const manifest = JSON.parse(git('show', `${base}:${MANIFEST_FILE}`))
  const redirects = files.has(REDIRECTS_FILE)
    ? parseRedirects(JSON.parse(git('show', `${base}:${REDIRECTS_FILE}`)))
        .entries
    : []
  return {
    base,
    urls: liveUrls(manifest, (file) => files.has(file)),
    redirects
  }
}

function readHeadState(root) {
  const manifest = JSON.parse(
    readFileSync(resolve(root, MANIFEST_FILE), 'utf8')
  )
  const redirectsPath = resolve(root, REDIRECTS_FILE)
  const redirects = existsSync(redirectsPath)
    ? parseRedirects(JSON.parse(readFileSync(redirectsPath, 'utf8')))
    : { entries: [], errors: [] }
  return {
    urls: liveUrls(manifest, (file) => existsSync(resolve(root, file))),
    redirects
  }
}

function main() {
  const baseRef = process.argv[2] || 'origin/main'
  const root = git('rev-parse', '--show-toplevel').trim()
  const base = readBaseState(baseRef)
  const head = readHeadState(root)

  const errors = [
    ...head.redirects.errors,
    ...check({
      baseUrls: base.urls,
      headUrls: head.urls,
      baseRedirects: base.redirects,
      headRedirects: head.redirects.entries
    })
  ]

  if (errors.length === 0) {
    console.log(
      `No docs pages removed without a redirect (compared with ${base.base.slice(0, 9)}; ${head.urls.size} pages served).`
    )
    return
  }

  const annotate = process.env.GITHUB_ACTIONS === 'true'
  for (const message of errors) {
    console.error(
      annotate ? `::error file=${REDIRECTS_FILE}::${message}` : `- ${message}`
    )
  }
  console.error(
    `\n${errors.length} problem(s). See "Removing or renaming a page" in CONTRIBUTING.md.`
  )
  process.exitCode = 1
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
