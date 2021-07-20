import { getList } from '../const/subApps';

/**
 * 给当前的路由跳转打补丁
 *
 * @param {*} routetAPI 原生路由跳转API
 * @param {*} eventName
 * @returns
 */
export const patchRouter = (routerAPI, eventName) => {
  return function() {
    const e = new Event(eventName); // 创建新的Event

    routerAPI.apply(this, arguments); // 依旧执行原来的API逻辑
    window.dispatchEvent(e); // 触发新的Event
  };
};

export const currentApp = () => {
  const currentUrl = window.location.pathname;

  return filterApp('activeRule', currentUrl);
};

const filterApp = (key, value) => {
  const currentApp = getList().filter((item) => item[key] === value);

  return currentApp && currentApp.length ? currentApp[0] : {};
};

/**
 * 根据路由找到相应的子应用
 *
 * @param {string} route
 * @returns
 */
export const findAppByRoute = (route) => {
  return filterApp('activeRule', route);
};

/**
 * 判断子应用是否进行了切换
 * @returns
 */
export const isTurnChild = () => {
  // 保存上一个子应用
  window.__ORIGIN_APP__ = window.__CURRENT_SUB_APP__;

  if (window.__CURRENT_SUB_APP__ === window.location.pathname) {
    return false;
  }

  // 匹配根路由，将 /vue3/ => /vue3
  const currentApp = window.location.pathname.match(/(\/\w+)/);
  if (!currentApp) {
    return;
  }

  window.__CURRENT_SUB_APP__ = currentApp[0];
  return true;
};
