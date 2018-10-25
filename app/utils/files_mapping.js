const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const stringCaseUtil = require("./string_utils");

/**
 * 映射dir下的文件内容归档成一个js对象
 * @param dir 当前路径
 * @param alias 文件别名 值码对
 * @returns {}
 */
const mappingFiles2Obj = dir => {
  const tree = {};
  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(dir)).partition(p =>
    fs.statSync(path.join(dir, p)).isDirectory()
  );
  // 映射文件夹
  dirs.forEach(dir => {
    tree[stringCaseUtil.camelCase(dir)] = mappingFiles2Obj(path.join(dir, dir));
  });
  // 映射文件
  files.forEach(file => {
    if (path.extname(file) === ".js") {
      tree[
        stringCaseUtil.camelCase(path.basename(file, ".js"))
      ] = require(path.join(dir, file));
    }
  });
  return tree;
};
// 默认导出当前文件夹下的映射
module.exports = mappingFiles2Obj;
