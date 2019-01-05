/**
 * @param {Number} initialScale
 * @param {Object<{ scalable: Boolean, maxFactor: Number|Boolean }>} options
 * */
function cContent(initialScale, options) {
  var s = 'width=device-width, initial-scale=' + initialScale
    + ', minimum-scale=' + initialScale
  if (!options.scalable) {
    return s + ', maximum-scale=' + initialScale + ', user-scalable=no'
  }

  if (options.maxFactor === true) return s

  var max = Math.max(options.maxFactor || 0, 1)
  return s + ', maximum-scale=' + max * initialScale
}

/**
 * @param {Object<{ forceToInitScale: Boolean, scalable: Boolean, maxFactor: Number|Boolean }>} options
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

  /* forceToInitScale: whether force to set the initial-scale value of viewport to 1 */
  var forceToInitScale = options.forceToInitScale
  var fontScale = !isMobile || forceToInitScale ? 1 : window.devicePixelRatio || 1

  /* Set font-size of html tag */
  document.documentElement.style.fontSize = 625 * fontScale + '%'
  window.rootFootSize = { value: 100 * fontScale, unit: 'px/rem' }

  /* Set viewport */
  var initialScale = 1 / fontScale
  var content = cContent(initialScale, options)

  var meta = document.createElement('meta')
  meta.setAttribute('name', 'viewport')
  meta.setAttribute('content', content)
  document.head.appendChild(meta)
}
