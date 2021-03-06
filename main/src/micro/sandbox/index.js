import { performScriptForEval } from './performScript';
import { ProxySandBox } from './proxySandbox';

const checkLifeCycle = (lifeCycle) => lifeCycle && lifeCycle.bootstrap && lifeCycle.mount && lifeCycle.unmount;

/**
 * + 子应用生命周期处理
 * + 环境变量设置
 */
export const sandBox = (app, script) => {
  const proxy = new ProxySandBox();

  if (!app.proxy) {
    app.proxy = proxy;
  }

  // 设置环境变量
  window.__MICRO_WEB__ = true;

  // 运行js文件，获取挂载在window对象上的module
  const appModule = performScriptForEval(script, app.name, app.proxy.proxy);

  // 将module上的生命周期，挂载到app上
  if (checkLifeCycle(appModule)) {
    app.bootstrap = appModule.bootstrap;
    app.mount = appModule.mount;
    app.unmount = appModule.unmount;
  }
};
