# @livelybone/rem-init
[![NPM Version](http://img.shields.io/npm/v/@livelybone/rem-init.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/rem-init)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/rem-init.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/rem-init)
![gzip with dependencies: .6kb](https://img.shields.io/badge/gzip--with--dependencies-.6kb-brightgreen.svg "gzip with dependencies: .6kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

rem, pixel, viewport, for adapting various interfaces

## Intro
> `px` with `rem` conversion depends on the font-size of `html` tag, when the font-size of `html` is `625%`, `1rem` is equal to `100px`

> If your website doesn't need to be compatible with ie8, you can use `rem` everywhere, include font-size

> If your client is pc, the function will set `1rem` to be `100px`

> If your client is mobile, the function will set `1rem` to be `(100 * (window.devicePixelRatio || 1))px`

> For adapting various interfaces, you can use `vw` `vh` `vmin` `vmax` simultaneously

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
| Name              | Type                                                                                                                              | DefaultValue                                                                                                 | Description  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| `options`         | `Object<{ pageNoScale: Boolean, pageScalable: Boolean, pageScaleMiddleware: Function, pageScaleMaxFactor: Number|Boolean }>`  | `{ pageNoScale: false, pageScalable: false, pageScaleMiddleware: null, pageScaleMaxFactor: false }`      |  |

> `pageNoScale`: When it is equal to `true`, the tool will force to set the `initial-scale` value of viewport to 1

> `pageScalable`: When it is equal to `true`, the tool will remove the `user-scalable` field of viewport, which means that you can scale your pages on the range depends on `minimum-scale` and `maximum-scale`

> `pageScaleMiddleware`: `(fontScale: Number, isMobile: Boolean) => pageScale` You can rewrite the pageScale value which is default to be `1 / fontScale` on your own will by this function

> `pageScaleMaxFactor`: It only works when `scalable` is equal to `true`. When it is equal to `true`, the tool will remove the `maximum-scale` field of viewport, otherwise, the function will set the `maximum-scale` value to `Math.max(1, options.pageScaleMaxFactor || 0) * initialScale`

### Example
```js
// assume
window.devicePixelRatio = 2
window.isMobile = true

// results
RemInit({pageNoScale: true}) // => viewport: width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no

RemInit({pageScalable: true, pageScaleMaxFactor: true}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5

RemInit({pageScalable: true, pageScaleMaxFactor: 1}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5

RemInit({pageScalable: true, pageScaleMaxFactor: 0.5}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5

RemInit({pageScalable: true, pageScaleMaxFactor: 4}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=2

RemInit({pageScaleMaxFactor: 4}) // => viewport: width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no
```

## Extra

> The function will add `isMobile` field to `window` if `isMobile` is not exist in `window`

> The function will add `rootSize` field to `window`, you can use it to convert `rem` with `px`
```js
var rootSize = {
  value: Number, // means: 1rem = [value]px
  unit: 'px/rem',
  rem2px: Function,
  px2rem: Function,
}
```