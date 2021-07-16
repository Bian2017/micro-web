import React from 'react';
import ReactDOM from 'react-dom';
import BasicMap from './src/router/index.jsx';
import './index.scss';

/**
 * 创建render函数
 *
 * 注：由于ReactDOM.render返回的并不是一个对象内容，故在unmount生命周期
 * 中无法像Vue那样清除对象内容。后续可以将根元素节点上的内容置为空。
 */
const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'));
};

// 判断当前环境是否在微前端环境，不在微前端环境则直接执行
if (!window.__MICRO_WEB__) {
  render();
}

/**
 * 在微前端环境，则暴露一组生命周期
 */
export function bootstrap() {
  console.log('react bootstrap');
}

export function mount(app) {
  console.log('react mount');
  render();
}

export function unmount(ctx) {
  console.log('react unmout');
}
