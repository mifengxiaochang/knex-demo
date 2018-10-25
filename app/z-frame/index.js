const FrameConfig = require("./config/FrameConfig");
const basic = require("./basic");
const db = require("./orm");
const providers = require("./providers");

module.exports = {
  FrameConfig,
  orm: db.orm, //将Knex封装

  //通过koa绑定以及相关配置
  attach: async (app, config = {}) => {
    if (!app) {
      console.log("frame need koa app");
      process.exit(0);
    }

    //当 app.proxy 设置为 true 时，支持 X-Forwarded-Host（用来确定客户端发起的请求中使用Host 指定的初始域名。）
    app.proxy = true;

    //添加中间件
    app.use(basic.requestBodyParser);
    app.use(basic.corsSet);
    app.use(basic.corsSet);

    //设置knex中数据库配置
    db.setConifg(config);
    app.use(db.provider);

    //为ctx添加返回前台的方法、状态吗等
    app.use(providers);

    basic.staticPath(app, config.staticPaths || ["public"]); //|| ['public']
  }
};
