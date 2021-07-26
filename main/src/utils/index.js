import { createStore, registerMicroApps, start } from '../micro';
import { loading } from '../store';

const store = createStore();

// 将实例挂载在window对象上
window.store = store;

store.subscribe((newValue, oldValue) => {
  console.log('subscribe:', newValue, oldValue);
});

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
    destroyed: [
      () => {
        console.log('卸载完成');
      },
    ],
  });

  // 完成注册后进行启动
  start();
};
