var initStyle = '*{max-height: 1000000rem} body{-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}'

/**
 * @param {Number} initialScale
 * @param {Object<{ pageScalable: Boolean, pageScaleMaxFactor: Number }>} options
 * */
function cContent(initialScale, options) {
  var s = 'width=device-width, initial-scale=' + initialScale
    + ', minimum-scale=' + initialScale
  if (!options.pageScalable) {
    return s + ', maximum-scale=' + initialScale + ', user-scalable=no'
  }

  if (!options.pageScaleMaxFactor) return s

  var max = Math.max(+options.pageScaleMaxFactor || 0, 1)
  return s + ', maximum-scale=' + max * initialScale
}

function getViewportMeta() {
  const arr = Array.prototype.filter.call(document.getElementsByTagName('meta'), function (meta) {
    return meta.getAttribute('name') === 'viewport'
  })
  return arr[arr.length - 1]
}

/**
 * @param {Object<{ pageNoScale: Boolean, pageScalable: Boolean, pageScaleMiddleware: Function, pageScaleMaxFactor: Number }>} options
 * @desc set viewport, and font-size of html tag, in order to adapting the interfaces in various device by using `rem`
 * */
export default function RemInit(options) {
  options = typeof options === 'object' ? options : {}

  var isMobile = window.isMobile
    || /Android|webOS|iPhone|iPod|iPad|BlackBerry|Windows Phone/i.test(navigator.userAgent)
  if (!('isMobile' in window)) {
    /* Set isMobile to global, if isMobile is not exist in global */
    window.isMobile = isMobile
  }

  /* pageNoScale: whether force to set the initial-scale value of viewport to 1 */
  var pageNoScale = options.pageNoScale
  var fontScale = !isMobile || pageNoScale ? 1 : window.devicePixelRatio || 1

  /* Set font-size of html tag */
  document.documentElement.style.fontSize = 625 * fontScale + '%'
  window.rootSize = {
    value: 100 * fontScale,
    unit: 'px/rem',
  }
  window.rootSize.rem2px = function (d) {
    var val = parseFloat(d) * this.value
    if (typeof d === 'string' && d.match(/rem$/)) {
      val += 'px'
    }
    return val
  }
  window.rootSize.px2rem = function (d) {
    var val = parseFloat(d) / this.value
    if (typeof d === 'string' && d.match(/px$/)) {
      val += 'rem'
    }
    return val
  }

  /* Set viewport */
  var content
  var middleware = options.pageScaleMiddleware
  if (pageNoScale || !middleware) content = cContent(1 / fontScale, options)
  else content = cContent(middleware(fontScale, isMobile), options)
  var meta = getViewportMeta()
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)

  /* Set init style */
  var id = 'rem-init-injected-style'
  var style = document.getElementById(id)
  if (!style) {
    style = document.createElement('style')
    style.setAttribute('id', id)
    style.setAttribute('type', 'text/css')
    document.head.appendChild(style)
  }
  style.innerText = initStyle
}
