const childProcss = require('child_process');
const path = require('path');

const filePath = {
  vue2: path.join(__dirname, '../vue2'),
  vue3: path.join(__dirname, '../vue3'),
  react15: path.join(__dirname, '../react15'),
  react16: path.join(__dirname, '../react16'),
  service: path.join(__dirname, '../service'),
  main: path.join(__dirname, '../main'),
};

// 通过脚本完成所有应用的启动
function runChild() {
  Object.keys(filePath).forEach((item) => {
    childProcss.spawn(`cd ${item} && npm run start`, {
      stdio: 'inherit', // 将所有执行的内容在终端上显示出来
      shell: true, // 表示运行的第一个参数是一条命令
    });
  });
}

runChild();
