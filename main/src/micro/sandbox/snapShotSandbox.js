/**
 * 快照沙箱
 *
 * + 给当前的全局变量实现一个快照的方式来记录沙箱内容
 * + 隔离运行环境
 *
 */
// 应用场景：比较老版本的浏览器
export class SnapShotSandBox {
  constructor() {
    this.proxy = window;
    this.active();
  }

  /**
   * 激活沙箱
   */
  active() {
    // 创建一个沙箱快照
    this.snapshot = new Map();

    /**
     * 将 window 对象上所有的内容记录在快照对象 snapshot 中(相当于做了个缓存)
     */
    for (const key in window) {
      this.snapshot[key] = window[key];
    }
  }

  /**
   * 销毁沙箱
   */
  inactive() {
    for (const key in window) {
      if (window[key] !== this.snapshot[key]) {
        // 将 window 对象进行还原
        window[key] = this.snapshot[key];
      }
    }
  }
}
