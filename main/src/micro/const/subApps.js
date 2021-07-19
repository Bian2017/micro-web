/**
 * 在这统一管理子应用列表
 */
let list = [];

export const getList = () => list;

export const setList = (appList) => {
  list = appList;
};
