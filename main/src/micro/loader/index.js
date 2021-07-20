import { fetchResource } from '../utils/fetchResource';

/**
 * 加载HTML的方法
 *
 * @param {*} app
 * @returns
 */
export const loadHTML = async (app) => {
  let container = app.container; // 子应用显示位置
  let entry = app.entry; // 子应用入口

  const html = await parseHtml(entry);
  const ct = document.querySelector(container);
  if (!ct) {
    throw new Error('容器不存在，请查看');
  }

  ct.innerHTML = html;

  return app;
};

/**
 * 解析 HTML
 *
 * @param {*} entry
 * @returns
 */
export const parseHtml = async (entry) => {
  const html = await fetchResource(entry);

  // 通过唯一的根元素对HTML代码进行解析
  const div = document.createElement('div');
  div.innerHTML = html;

  // 标签、link、script(src、js)
  const [dom, scriptUrl, script] = await parseJs();

  console.log('------:', dom, scriptUrl, script);
  return html;
};

/**
 * 解析JS
 *
 * @returns
 */
export const parseJs = async () => {
  return ['', '', ''];
};
