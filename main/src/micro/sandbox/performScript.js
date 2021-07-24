export const performScriptForEval = (script, appName, global) => {
  /**
   * 1. 先运行原有的JS脚本
   * 2. 在webpack中，已将libraryTarget设置成umd，并且将library的名称设为app.Name，打包时便会在window对象上生成这样的一个module
   * 3. 通过window.appName获取当前运行的module
   */
  const scriptText = `
  () => {
    ${script}
    return window['${appName}'] 
  }
  `;

  // 需将 this 指向 window
  return eval(scriptText).call(global, global);
};

/**
 * 通过函数体执行JS脚本
 *
 * @param {*} script
 * @param {*} appName 子应用名称
 * @returns
 */
export const performScriptForFunction = (script, appName, global) => {
  /**
   * 1. 先运行原有的JS脚本
   * 2. 在webpack中，已将libraryTarget设置成umd，并且将library的名称设为app.Name，打包时便会在window对象上生成这样的一个module
   * 3. 通过window.appName获取当前运行的module
   */
  const scriptText = `
    ${script}
    return window['${appName}']
  `;

  // new Function 里面运行的参数本身就是一个函数体，故 scriptText 不需要函数体进行包裹
  return new Function(scriptText).call(global, global);
};
