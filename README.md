# @livelybone/rem-init
[![NPM Version](http://img.shields.io/npm/v/@livelybone/rem-init.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/rem-init)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/rem-init.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/rem-init)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

rem, pixel, viewport, for adapting various interfaces

## repository
https://github.com/livelybone/rem-init.git

## Demo
http://github.com/livelybone/rem-init#readme

## Installation
```bash
npm i -S @livelybone/rem-init
```

## Global name
`RemInit`

## Usage
```js
import RemInit from '@livelybone/rem-init';
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/rem-init/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/rem-init/lib/umd/<--module-->.js"></script>
```

## Params
| Name              | Type                                                                                   | DefaultValue                                                        | Description  |
| ----------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------ |
| `options`         | `Object<{ forceToInitScale: Boolean, scalable: Boolean, maxFactor: Number|Boolean }>`  | `{forceToInitScale: false, scalable: false, maxFactor: false}`      |  |

> `forceToInitScale`: When it is equal to `true`, the function will force to set the `initial-scale` value of viewport to 1

> `scalable`: When it is equal to `true`, the function will remove the `user-scalable` field of viewport, which means that you can scale your pages on the range depends on `minimum-scale` and `maximum-scale`

> `maxFactor`: It only works when `scalable` is equal to `true`. When it is equal to `true`, the function will remove the `maximum-scale` field of viewport, otherwise, the function will set the `maximum-scale` value to `Math.max(1, options.maxFactor || 0) * initialScale`

### Example
```js
// assume
window.devicePixelRatio = 2
window.isMobile = true

// results
RemInit({forceToInitScale: true}) // => viewport: width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no

RemInit({scalable: true, maxFactor: true}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5

RemInit({scalable: true, maxFactor: 1}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5

RemInit({scalable: true, maxFactor: 0.5}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5

RemInit({scalable: true, maxFactor: 4}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=2

RemInit({maxFactor: 4}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no
```