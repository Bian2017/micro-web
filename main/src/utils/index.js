import { registerMicroApps, start } from '../micro';

/**
 * 将子应用注册到主应用里
 */
export const registerApp = (list) => {
  // 先将子应用注册到微前端框架中
  registerMicroApps(list);

  // 完成注册后进行启动
  start();
};
