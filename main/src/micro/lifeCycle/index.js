import { findAppByRoute } from '../utils';
import { getMainLifeCycle } from '../const/mainLifeCycle';
import { loadHTML } from '../loader';

export const lifeCycle = async () => {
  // 获取到上一个子应用
  const prevApp = findAppByRoute(window.__ORIGIN_APP__);

  // 获取到要跳转的子应用
  const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__);

  if (!nextApp) return;

  if (prevApp && prevApp.unmount) {
    if (prevApp.proxy) {
      prevApp.proxy.inactive(); // 销毁沙箱
    }

    await destroyed(prevApp);
  }

  const app = await beforeLoad(nextApp);
  await mounted(app);
};

export const beforeLoad = async (app) => {
  await runMainLifeCycle('beforeLoad');

  app?.bootstrap?.();

  const subApp = await loadHTML(app); // 获取子应用的内容
  subApp?.bootstrap?.();

  return subApp;
};

export const mounted = async (app) => {
  app?.mount?.({
    appInfo: app.appInfo, // 将主应用的状态传给子应用
    entry: app.entry,
  });

  await runMainLifeCycle('mounted');
};

export const destroyed = async (app) => {
  app?.unmount?.();

  // 对应执行以下主应用的生命周期
  await runMainLifeCycle('destroyed');
};

/**
 * 运行主应用生命周期
 *
 * @param {string} type
 */
export const runMainLifeCycle = async (type) => {
  const mainlife = getMainLifeCycle();

  // 每个生命周期里的操作是一个数组操作
  await Promise.all(mainlife[type].map(async (item) => await item()));
};
