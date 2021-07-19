/**
 * 进行路由拦截
 */

import { patchRouter } from '../utils';
import { turnApp } from './routerHandler';

/**
 * 重写window的路由跳转API
 */
export const rewriteRouter = () => {
  window.history.pushState = patchRouter(window.history.pushState, 'micro_push');
  window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace');

  window.addEventListener('micro_push', turnApp);
  window.addEventListener('micro_replace', turnApp);

  /**
   * 当点击返回按钮时，也需进行应用的切换
   */
  window.onpopstate = function() {
    turnApp();
  };
};
