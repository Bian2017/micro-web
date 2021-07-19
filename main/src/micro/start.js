import { setList } from './const/subApps';

/**
 * 将子应用注册到微前端框架中
 */
export const registerMicroApps = (appList) => {
  setList(appList);
};
