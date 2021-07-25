/**
 * 事件总线
 */
export class EVENT_BUS {
  // 监听事件
  on(name, cb) {
    window.addEventListener(name, (e) => cb(e.detail));
  }

  // 触发事件
  emit(name, data) {
    const event = new CustomEvent(name, {
      detail: data,
    });

    window.dispatchEvent(event);
  }
}
