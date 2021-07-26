import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

/**
 * 创建 render 函数。
 *
 * 注：可以在微前端框架里进行引用，也可以通过window.vue2来获取到对应内容
 */
let instance = null;
const render = () => {
  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount('#app');
};

render();

/**
 * 在微前端环境下，通常不会让子应用自行触发render函数，而是通过微前端的生命周期
 * 来触发对应的render函数。因此需要加一个限制，即判断当前是否处于微前端环境下
 */

// 如果不在微前端环境下，则直接执行 render 函数
if (!window.__MICRO_WEB__) {
  render();
}

/**
 * 如果在微前端环境下，则暴露一组生命周期，生命周期何时执行可以在微前端框架里进行控制。
 * + 生命周期： 开始
 * + 生命周期：渲染成功
 * + 生命周期：卸载
 */
export async function bootstrap() {
  console.log('vue2 bootstrap');
}

export async function mount() {
  window.__EVENT_BUS__.on('react16', (data) => {
    console.log('vue2 event:', data);
    window.__EVENT_BUS__.emit('vue2', {
      msg: 'vue2 mount success',
    });
  });
  render();
}

export async function unmount() {
  console.log('vue2 unmount:', instance);
}
