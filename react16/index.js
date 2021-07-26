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
  console.log('react16 bootstrap');
}

export async function mount(app) {
  const storeData = window.store.getStore();

  window.store.update({
    ...storeData,
    a: 1111,
  });

  setMain(app);
  render();

  // window.__EVENT_BUS__.on('vue2', (data) => {
  //   console.log('react16 event:', data);
  // });
  // window.__EVENT_BUS__.emit('react16', {
  //   msg: 'react16 mount success',
  // });
}

export async function unmount() {
  console.log('react unmout');
}
