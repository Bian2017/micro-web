import React from 'react';
import ReactDOM from 'react-dom';
import BasicMap from './src/router';
import { setMain } from './src/utils/global'

import './index.scss';

export const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'));
};

if (!window.__MICRO_WEB__) {
  render();
}

export async function bootstrap() {
  console.log('react bootstrap');
}

export async function mount(app) {
  setMain(app)
}

export async function unmount() {
  console.log('react unmout');
}
