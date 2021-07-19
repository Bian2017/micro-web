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

// 子应用是否做了切换
export const isTurnChild = () => {
  if (window.__CURRENT_SUB_APP__ === window.location.pathname) {
    return false;
  }

  return true;
};
