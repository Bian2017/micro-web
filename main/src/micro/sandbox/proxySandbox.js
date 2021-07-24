/**
 * 子应用的沙箱容器
 *
 * + 子应用对 window 的所有操作都会放在 window 对象上
 */
let defaultValue = {};

/**
 * 代理沙箱
 *
 * + 给当前的全局变量实现一个快照的方式来记录沙箱内容
 * + 隔离运行环境
 */

export class ProxySandBox {
  constructor() {
    this.proxy = window;
    this.active();
  }

  /**
   * 激活沙箱
   */
  active() {
    /**
     * 代理window(window本质就是一个对象)
     */
    this.proxy = new Proxy(window, {
      get(target, key) {
        if (typeof target[key] === 'function') {
          // 将this指向target(即window，而非proxy)
          return target[key].bind(target);
        }

        // 针对window的一些属性，如location会查找不到，此处需返回target[key]
        return Reflect.get(defaultValue, key) || target[key];
      },
      set(target, key, value) {
        Reflect.set(defaultValue, key, value);
        return true;
      },
    });
  }

  /**
   * 销毁沙箱
   */
  inactive() {
    defaultValue = {};
  }
}
