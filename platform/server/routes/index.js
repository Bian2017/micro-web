const express = require('express');
const path = require('path');
const fs = require('fs');
const childProcess = require('child_process');

const versionDir = path.join(__dirname, '../version'); // 通过本地磁盘模拟线上数据库
const dftVersion = '1.0.0.0';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const name = req.query.name;
  const currentAppPath = path.join(versionDir, name);
  let newVersion = '';

  /**
   * 更新的版本号
   *
   * + 每个应用有自己的版本管理文件
   */

  try {
    // 将 Buffer 转换成 string，并去掉换行符
    const originVersion = fs.readFileSync(currentAppPath).toString().replace(/\n/g, '');
    // 对版本号的最后一个数字自动加一
    newVersion = originVersion.replace(/.(\d+)$/, (a, b) => `.${+b + 1}`);

    fs.writeFileSync(currentAppPath, newVersion);
  } catch (e) {
    fs.writeFileSync(currentAppPath, dftVersion);
  }

  // 构建、打包、发布
  const originPath = path.join(__dirname, '../../../', name);
  const originDist = path.join(originPath, 'dist');
  const bagPath = path.join(__dirname, '../bag');

  try {
    // 通过运行打包命令来创建对应的打包产物
    childProcess.execSync(`cd ${originPath} && yarn && npm run build`);
    childProcess.execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`);

    const appDist = path.join(bagPath, `./${name}/${newVersion}`);
    childProcess.execSync(`mv ${originDist}/* ${appDist}`);

    // To do: 后续只需将打包产物发布到OSS平台上即可
  } catch (e) {
    console.log('e:', e);
  }

  res.send({ version: newVersion });
});

module.exports = router;
