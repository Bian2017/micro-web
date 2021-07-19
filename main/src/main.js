import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { navList } from './store/leftNav';
import { registerApp } from './utils/startMicroApp';

// 注册、加载、启动子应用
registerApp(navList);

createApp(App)
  .use(router())
  .mount('#micro_web_main_app');
