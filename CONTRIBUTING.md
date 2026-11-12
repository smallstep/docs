# Smallstep docs

This repository contains documentation for Smallstep projects and products. These docs are served at https://smallstep.com/docs.

Issues and pull requests are welcome!

## Docs style & syntax

- The docs repo uses [MDX syntax](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax).
  MDX follows the [CommonMark spec](https://spec.commonmark.org/) for Markdown.
  MDX also allows us to intersperse CommonMark with JSX tags (React components and other HTML-like tags).
  A JSX tag block looks like this:

  ```
  <Alert severity="info">
      <AlertTitle>Want to run an SSH CA?</AlertTitle>
      <div>
          By default, the SSH CA is disabled.
          Create a CA with SSH CA capabilities by running <Code>step ca init --ssh</Code>.
      </div>
  </Alert>
  ```

  Take a look through a few docs pages to get familiar with the React components we use in our docs, and how to use them.
  There's no formal docs for these yet.

- Use [semantic linefeeds](https://rhodesmill.org/brandon/2012/one-sentence-per-line/) when possible.
- Follow the conventions outlined in Google's [Technical Writing](https://developers.google.com/tech-writing/one) classes.
- Further reading:
  - [Common Bugs in Writing](https://www.cs.columbia.edu/~hgs/etc/writing-bugs.html)

## Updating the `step` CLI reference docs

Everything under `src/pages/docs/step-cli/reference` is auto-generated whenever we release a new version of `step`. To make a change to the CLI reference, you'll have to make the edit in [smallstep/cli](https://github.com/smallstep/cli) and make a PR over there. The reference docs are embedded in the source files under the `command` folder in that repo.

## Practical zero trust

The Practical Zero Trust articles are a bit different.
They are templated, rather than freeform Markdown.
Look at existing examples in [`src/pzt`](src/pzt) for reference.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (`corepack enable` will activate it)
- [Vale](https://vale.sh/)
- [markdown-link-check](https://github.com/tcort/markdown-link-check) (`pnpm add -g markdown-link-check`)

## Linting scripts

After cloning the repository, run `pnpm install` and `vale sync`.

```bash
pnpm check          # lint prose + check links on changed files
pnpm check:all      # lint prose + check links on all files
pnpm vale           # lint all prose
pnpm vale:changed   # lint prose in changed files only
pnpm links          # check links in all files
pnpm links:changed  # check links in changed files only
```

## Prose linting with vale

We use [Vale](https://vale.sh/) to enforce consistent prose style.

### Installation

```bash
# macOS
brew install vale

# Windows
choco install vale

# Linux
snap install vale
```

### Setup

After cloning the repository, sync Vale packages:

```bash
vale sync
```

Install the MDX parser for native MDX support:

```bash
pnpm add -g mdx2vast
```

### Usage

The simplest way to run Vale is via pnpm scripts (see above). You can also run it directly:

```bash
# Check all files (excluding auto-generated CLI reference)
vale --no-wrap --glob='!step-cli/reference/**' .

# Check specific folder
vale --no-wrap --glob='!step-cli/reference/**' step-ca/

# Check changed files only
git diff --name-only origin/main -- '*.mdx' '*.md' | xargs -r vale --no-wrap --glob='!step-cli/reference/**'
```

## Checking links locally

Install markdown-link-check:

```
pnpm add -g markdown-link-check
```

The simplest way to check links is via pnpm scripts (see above). You can also run it directly:

```
find . -name '*.mdx' -not -path './node_modules/*' -print0 | xargs -0 -n1 markdown-link-check -q -c .github/mdl.config.json
```
