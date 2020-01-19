export interface RemInitOptions {
  /**
   * @desc  When it is equal to `true`,
   *        the tool will force to set the `initial-scale` value of viewport to 1
   * */
  pageNoScale?: boolean
  /**
   * @desc  When it is equal to `true`,
   *        the tool will remove the `user-scalable` field of viewport,
   *        which means that you can scale your pages on the range depends on `minimum-scale` and `maximum-scale`
   * */
  pageScalable?: boolean
  /**
   * @desc  You can rewrite the pageScale value by this function.
   *        It only works when `pageNoScale` is not equal to `true`
   *
   * @return number - initialScale
   *
   * Default: fontScale => 1 / fontScale
   * */
  pageScaleMiddleware?(fontScale: number, isMobile: boolean): number
  /**
   * @desc  It only works when `pageScalable` is equal to `true`.
   *
   *        The function will set the `maximum-scale` value to `Math.max(1, options.pageScaleMaxFactor || 0) * initialScale`
   *
   * Default: 1
   * */
  pageScaleMaxFactor?: number | boolean
}

export default function RemInit(options?: RemInitOptions): void
