import { isTurnChild } from '../utils';
import { lifeCycle } from '../lifeCycle';

/**
 * 路由切换
 */
export const turnApp = async () => {
  if (!isTurnChild()) return;

  // 进行微前端的生命周期执行
  await lifeCycle();
};
