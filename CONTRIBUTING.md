# Smallstep docs

This repository contains documentation for Smallstep projects and products. These docs are served at https://smallstep.com/docs.

Issues and pull requests are welcome!

## Docs Style & Syntax

- The docs repo uses [MDX syntax](https://mdxjs.com/docs/what-is-mdx/#mdx-syntax).
  MDX allows us to intersperse traditional Markdown with JSX tags (React components and other HTML-like tags).
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

## Practical Zero Trust

The Practical Zero Trust articles are a bit different.
They are templated, rather than freeform Markdown.
Look at existing examples in [`src/pzt`](src/pzt) for reference.

## Checking links locally

First:

```
npm install -g markdown-link-check
```

Then run:

```
find . -name \*.mdx -not -path './node_modules/*' -print0 | xargs -0 -n1 markdown-link-check -q -c .github/mdl.config.json
```
