/**
 * 获取子应用资源(HTML、JS、CSS)
 *
 * @param {string} url
 * @returns
 */
export const fetchResource = (url) => fetch(url).then(async (res) => await res.text());
