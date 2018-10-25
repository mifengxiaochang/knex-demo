const path = require("path");
const mappingFiles2Obj = require("../utils/files_mapping");
// 默认导出当前文件夹下的映射
module.exports = mappingFiles2Obj(path.join(__dirname));
