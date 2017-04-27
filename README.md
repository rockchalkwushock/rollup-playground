# rollup-playground

:tada: Getting started with Rollup :tada:

This repository is following along with the video tutorial series from [Jason Lengstorf](https://github.com/jlengstorf) which can be found [here](https://code.lengstorf.com/learn-rollup-js/). There is a starter repository that can be found [here](https://github.com/jlengstorf/learn-rollup).

## Using this repository

A breakdown about the `rollup.config.js` can be found in `learn.js`. It is much different than the actual `rollup.config.js` as I was trying to make it as streamline as possible. Still wanting to find a way to process the **whole** library build with just one configuration and one script. `learn.js` is commented out and has links to the plugin repositories. Note that the _mini-library_ does not use external packages hence no need for `node-resolve` in either of the configs.

```bash
yarn start && npm pack
# removes defined directories.
# runs all build scripts reading from
# rollup.config.js & rollup.config.es.js
# generates tarball file.
open rollup-playground-0.1.0.tgz
# generates package/
yarn sandbox
# runs all sandbox scripts
# logs out to console
```

## My Notes

1. When creating the `rollup.config.js` write in ES6, `rollup` expects this! Your ability to write certain features of ES6 will be dependant on your systems current `node --v`.

1. `Rollup` does _tree-shaking_ by default! If a module is not being used it will not be included in the bundled code.

1. Order of plugins matters!!!

1. Unfortunately [`babelrc-rollup`](https://github.com/eventualbuddha/babelrc-rollup) does not accept an argument for specific _environments_ or I would use this approach to resolve my issue of having all the builds processed by one config and one script.

## Todos

- [ ] Find away to include ***only*** the comments on functions that are being exported in the module.

> _Currently to remove all comments:_
> ```javascript
> cleanup() // remove all comments, etc.
> // or
> cleanup({ comments: ['jsdoc'] }); // too leave jsdoc comments.
> ```
> _but I still will get the comments from **non-exported** functions_. :confused:

- [x] Find away to build the library with **one** `rollup.config.js` & **one** npm script.

> _[`rollup-plugin-multidest`](https://github.com/audinue/rollup-plugin-multidest) is a sound option; but I have not been able to incorporate the `es` build with this and still get the expected results throughout all files. `BABEL_ENV=cjs` is needed for all commonjs builds and I don't want babel touching my code when building `es`._

> Solved in this [commit](https://github.com/rockchalkwushock/rollup-playground/commit/552f411b08aadcf9f71b418b4ac82aba0dd558ea).
