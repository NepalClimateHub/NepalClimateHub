# Contributor Manual

We welcome contributions of any size and skill level. As an open source project, we believe in giving back to our contributors and are happy to help with guidance on PRs, technical writing, and turning any feature idea into a reality!

> [!Tip]
>
> **For new contributors:** Take a look at [https://github.com/firstcontributions/first-contributions](https://github.com/firstcontributions/first-contributions) for helpful information on contributing

## Quick Guide

### Prerequisites

```shell
node: "^>=18.17.1"
# otherwise, your build will fail
```

### Setting up your local repo

NepalClimateHub uses npm workspaces, so you should **always run `npm install` from the top-level project directory**. Running `npm install` in the top-level project root will install dependencies for `NepalClimateHub`, and every package in the repo.

```shell
git clone git@github.com:NepalClimateHub/NepalClimateHub.git && cd ...
npm install
npm run build
```

### Development

Always create a new branch when you want to contribute.

```shell
# start a new branch from master branch
git checkout -b feat-[your-branch-name]
# starts a file-watching, live-reloading dev script for active development
npm run dev
# build the entire project, one time.
npm run build
```

## Code Structure

Server-side rendering (SSR) can be complicated. The Astro package (`packages/astro`) is structured in a way to help think about the different systems.

[//]: # (TODO  )complete section when SSR will be added

## Branches
### `master`

Active NepalClimateHub development happens on the master branch. `master` always reflects the latest code.
