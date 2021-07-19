import { setList, getList } from './const/subApps';
import { currentApp } from './utils';
import { rewriteRouter } from './router/rewriteRouter';

// 实现路由拦截
rewriteRouter();

/**
 * 将子应用注册到微前端框架中
 */
export const registerMicroApps = (appList) => {
  setList(appList);
};

/**
 * 启动微前端框架
 */
export const start = () => {
  // 首先验证当前子应用列表是否为空
  const apps = getList();

  if (!apps.length) {
    throw Error('子应用列表为空，请正确注册');
  }

  // 有子应用，查找到符合当前路由的子应用
  const app = currentApp();

  if (app) {
    const { pathname, hash } = window.location;

    const url = pathname + hash;

    window.history.pushState('', '', url); // 该方法已做改写，会触发其他事件
    window.__CURRENT_SUB_APP__ = app.activeRule;
  }
};
