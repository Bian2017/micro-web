import { isTurnChild } from '../utils';
/**
 * 路由切换
 */
export const turnApp = () => {
  if (!isTurnChild) return;

  console.log('路由切换了');
};
