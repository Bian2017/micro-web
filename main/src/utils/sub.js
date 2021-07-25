import * as loading from '../store/loading';
import * as appInfo from '../store';

/**
 * 创建子应用的所有信息
 */
export const navList = [
  {
    name: 'react15', // 唯一的Key值，子应用的唯一标识
    entry: '//localhost:9002/', // 告诉主应用去哪个入口获取子应用的文件
    loading,
    container: '#micro-container', // 渲染容器：告知子应用在哪个容器中进行显示
    activeRule: '/react15', // 子应用激活规则
    appInfo, // 将主应用的store传递给子应用
  },
  {
    name: 'react16',
    entry: '//localhost:9003/',
    loading,
    container: '#micro-container',
    activeRule: '/react16',
    appInfo,
  },
  {
    name: 'vue2',
    entry: '//localhost:9004/',
    loading,
    container: '#micro-container',
    activeRule: '/vue2',
    appInfo,
  },
  {
    name: 'vue3',
    entry: '//localhost:9005/',
    loading,
    container: '#micro-container',
    activeRule: '/vue3',
    appInfo,
  },
];
