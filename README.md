# Smallstep Docs

This repository contains documentation for Smallstep projects and products. 
These docs are served at https://smallstep.com/docs.

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
- Further reading: [Writing Tools I Learned from The Economist](https://builtbywords.substack.com/p/writing-tools-i-learned-from-the)

## Run locally

To run and preview docs locally (requires Node.js and Yarn):

```
$ yarn install
$ yarn start
```

Before opening a PR, format your code changes (only affects JSX and MDX):

```
$ yarn format
```

Check formatting with `yarn lint`.

## Practical Zero Trust

The Practical Zero Trust articles are templated rather than freeform markdown. Look at existing examples in [`src/pzt`](src/pzt) for reference.
