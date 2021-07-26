import { parseHtml } from './index';
import { getList } from '../const/subApps';

/**
 * 提高加载性能 - 预加载子应用
 */
export const prefetch = async () => {
  // 获取尚未显示的所有子应用列表
  const list = getList().filter((item) => !window.location.pathname.startsWith(item.activeRule));

  // 预加载剩下的所有子应用
  await Promise.all(list.map(async (item) => await parseHtml(item.entry, item.name)));
};
