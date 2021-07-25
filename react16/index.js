import React from 'react';
import ReactDOM from 'react-dom';
import BasicMap from './src/router';
import { setMain } from './src/utils/main';

import './index.scss';

export const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'));
};

if (!window.__MICRO_WEB__) {
  render();
}

export async function bootstrap() {
  window.__EVENT_BUS__.emit('bootstrap', {
    msg: 'react16 bootstrap success',
  });
}

export async function mount(app) {
  setMain(app);
  render();
}

export async function unmount() {
  console.log('react unmout');
}
