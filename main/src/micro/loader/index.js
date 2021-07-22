import { fetchResource } from '../utils/fetchResource';
import { sandBox } from '../sandbox';

/**
 * 加载HTML的方法
 *
 * @param {*} app
 * @returns
 */
export const loadHTML = async (app) => {
  let container = app.container; // 子应用显示位置
  let entry = app.entry; // 子应用入口

  const [dom, scripts] = await parseHtml(entry);
  const ct = document.querySelector(container);
  if (!ct) {
    throw new Error('容器不存在，请查看');
  }

  ct.innerHTML = dom;

  console.log('scripts:', scripts);

  scripts.forEach((item) => {
    sandBox(app, item);
  });

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
  let allScript = [];

  // 通过唯一的根元素对HTML代码进行解析
  const div = document.createElement('div');
  div.innerHTML = html;

  // 标签、link、script(src、js)
  const [dom, scriptUrl, script] = await getResources(div, entry);

  const fetchedScripts = await Promise.all(scriptUrl.map(async (item) => fetchResource(item)));

  allScript = script.concat(fetchedScripts);
  return [dom, allScript];
};

/**
 * 获取资源(如JS)
 *
 * @returns
 */
export const getResources = async (root, entry) => {
  const scriptUrl = [];
  const script = [];
  const dom = root.outerHTML; // 展示在子应用上的DOM结构

  // 深度解析
  function deepParse(element) {
    const children = element.children;
    const parent = element.parent;

    // 第一步处理位于script中的内容(包含脚本和外链)
    if (element.nodeName.toLowerCase() === 'script') {
      const src = element.getAttribute('src');

      if (!src) {
        // 说明script里面包含的是JS可执行代码
        script.push(element.outerHTML);
      } else {
        if (src.startsWith('http')) {
          scriptUrl.push(src);
        } else {
          /**
           * 在 webpack 中如果未配置 publicPath，则大部分JS
           * 文件请求是如下方式'/static/js/main.js'， 故需
           * 配置完整路径
           *
           * ----To do: https
           */
          scriptUrl.push(`http:${entry}/${src}`);
        }
      }

      if (parent) {
        parent.replaceChild(document.createComment('js文件已被微前端替换', element));
      }
    }

    // link 也有js的内容
    if (element.nodeName.toLowerCase() === 'link') {
      const href = element.getAttribute('href');

      if (href.endsWith('.js')) {
        if (href.startsWith('http')) {
          scriptUrl.push(href);
        } else {
          scriptUrl.push(`http:${entry}/${href}`);
        }
      }
    }

    // 如果children里面也包含JS文件，则需进行递归操作
    for (let i = 0; i < children.length; i++) {
      deepParse(children[i]);
    }
  }

  deepParse(root);

  return [dom, scriptUrl, script];
};
