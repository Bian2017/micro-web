export const createStore = (initData = {}) =>
  (() => {
    // 利用闭包缓存初始数据
    let store = initData;

    // 管理所有的订阅者(即依赖内容)
    const observers = [];

    // 获取store
    const getStore = () => store;

    // 更新store
    const update = (value) => {
      if (value !== store) {
        const oldValue = store; // 缓存旧store

        store = value; // 更新新的store

        // 通知所有订阅者store发生了变化(新值、旧值)(订阅者可能是异步，所以需加async)
        observers.forEach(async (item) => await item(store, oldValue));
      }
    };

    // 添加订阅者
    const subscribe = (fn) => {
      observers.push(fn);
    };

    return {
      getStore,
      update,
      subscribe,
    };
  })();
