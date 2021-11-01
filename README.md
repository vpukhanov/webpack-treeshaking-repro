# webpack-treeshaking-repro

## Problem

Webpack is tree-shaking away some imports which are actually used, which breaks the output bundle at runtime.

## How to repro

```
npm install
npm run bootstrap
npm start
```

**Expected result:** program runs successfully and outputs `30` to console.

**Actual result:** receive the following error output

```
(node:12840) UnhandledPromiseRejectionWarning: TypeError: (0 , lib_namespaceObject.importantFunction) is not a function
    at _callee$ (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:1706:61)
    at tryCatch (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:121:17)
    at Generator.invoke [as _invoke] (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:335:22)
    at Generator.next (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:173:21)
    at asyncGeneratorStep (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:9:24)
    at _next (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:31:9)
    at /Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:38:7
    at new Promise (<anonymous>)
    at /Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:27:12
    at _entrypoint (/Users/ext.vpukhanov/Dev/webpack-treeshaking-repro/packages/final-pkg/lib/index.js:1719:22)
```

## Workaround

Change the configuration of `babel-loader` to output `commonjs` modules in [packages/final-pkg/webpack.config.js](packages/final-pkg/webpack.config.js), which fixes the issue.

This suggests that the problem is with webpack's tree-shaking, since when the tree-shaking gets disabled by commonjs output, the issue goes away.

## Repo walkthrough

This monorepo managed by Lerna consists of 2 packages:

- `important-function-pkg` which exports the `importantFunction`
- `final-pkg` which is the test harness that imports `importantFunction` and logs the output

`final-pkg` is built via webpack, the config is stored in [packages/final-pkg/webpack.config.js](packages/final-pkg/webpack.config.js)
