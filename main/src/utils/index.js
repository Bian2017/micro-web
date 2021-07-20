import { registerMicroApps, start } from '../micro';
import { loading } from '../store';

/**
 * 将子应用注册到主应用里
 */
export const registerApp = (list) => {
  // 先将子应用注册到微前端框架中
  registerMicroApps(list, {
    beforeLoad: [
      () => {
        // To do: 进行权限控制
        loading.openLoading();
        console.log('开始加载');
      },
    ],
    mounted: [
      () => {
        loading.closeLoading();
        console.log('渲染完成');
      },
    ],
    destoryed: [
      () => {
        console.log('卸载完成');
      },
    ],
  });

  // 完成注册后进行启动
  start();
};
