require("dotenv").config(); //管理环境变量 相关配置在.evn文件中
const { name, version } = require("../../package"); //从package.json中取
const { FrameConfig } = require("../z-frame");
const dbConfigs = require("./db"); //相关具体数据库信息

const env = "development"; //process.env.NODE_ENV ||
const option = new FrameConfig.Option(); //初始化配置选项
option.useDbType = "oracle";

const appConfig = FrameConfig.getInstance(option); //根据配置创建程序配置实例

//根据项目名称重新赋值信息
appConfig.env = env;
appConfig.name = name;
appConfig.version = version;
appConfig.port = 5202;

//设置数据库相关配置
appConfig.db.setConnection(dbConfigs[env]);

//验证相关必填信息是否存在
appConfig.checkRequired();

module.exports = appConfig;
