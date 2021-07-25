import { setList, getList } from './const/subApps';
import { currentApp } from './utils';
import { rewriteRouter } from './router/rewriteRouter';
import { setMainLifeCycle } from './const/mainLifeCycle';
import { EVENT_BUS } from './event';

const event_bus = new EVENT_BUS();

event_bus.on('bootstrap', (data) => {
  console.log('bootstrap event:', data);
});

// 重要：添加事件总线全局标识
window.__EVENT_BUS__ = event_bus;

// 实现路由拦截
rewriteRouter();

/**
 * 将子应用注册到微前端框架中
 *
 * @param {*} appList
 * @param {*} lifeCycle
 */
export const registerMicroApps = (appList, lifeCycle) => {
  setList(appList);

  lifeCycle.beforeLoad[0]();
  setTimeout(() => {
    lifeCycle.mounted[0]();
  }, 3000);

  setMainLifeCycle(lifeCycle);
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

    // 重新push一遍，用来触发turnApp这个方法(pushState已被重写)
    window.history.pushState('', '', url);

    // 标识当前运行的子应用
    window.__CURRENT_SUB_APP__ = app.activeRule;
  }
};
