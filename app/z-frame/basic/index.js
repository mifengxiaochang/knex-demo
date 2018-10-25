/*
* 解析body
* eg:post来传递表单，json数据，或者上传文件
* (xml数据没办法通过koa-bodyparse解析，有另一个中间件koa-xml-body)
*/
const bodyParser = require("koa-bodyparser");
// 用来处理跨域的中间件
const cors = require("kcors");
// 静态资源请求中间件
const serve = require("koa-static");
const path = require("path");

const requestBodyParser = bodyParser({
  enableTypes: ["json", "form"],
  formLimit: "10mb",
  jsonLimit: "10mb"
  // 参数
  // enableTypes：设置解析类型，默认为[‘json’, ‘form’]。

  // encoding：请求编码。默认值是utf-8。

  // formLimit：表单大小上限。如果大于此限制，则返回413错误代码。默认是56kb。

  // jsonLimit：json大小上限。默认是1mb。

  // textLimit：text大小上限。默认是1mb。

  // strict：当设置为true时，为严格模式，JSON解析器只接受数组和对象。默认是true。

  // detectJSON：自定义json请求检测功能。默认是null。
});

// 为header加上CORS，客户端即可跨域发送请求
const corsSet = (ctx, next) => {
  const { origin } = ctx.request.header; //根据前台
  return cors({
    // 允许所有客户端的访问，非安全配置
    origin: origin,
    credentials: true, //是否允许用户发送、处理 cookie
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    exposeHeaders: ["X-Request-Id"] //允许脚本访问的返回头 -->X-Request-Id：客户端可以创建一些随机ID并将其传递给服务器
  })(ctx, next);
  /**
   * CORS middleware
   *
   * @param {Object} [options]
   *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, default is request Origin header
   *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'
   *  - {String|Array} exposeHeaders `Access-Control-Expose-Headers`
   *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
   *  - {String|Number} maxAge `Access-Control-Max-Age` in seconds
   *  - {Boolean} credentials `Access-Control-Allow-Credentials`
   *  - {Boolean} keepHeadersOnError Add set headers to `err.header` if an error is thrown
   * @return {Function} cors middleware
   * @api public
   */
};

//引入静态资源文件夹
//way1
const staticPath = (app, paths = ["public"]) => {
  return paths.map(path => app.use(serve(path)));
};
//way2

// const staticPath = (app, paths = "../../../public") => {
//   app.use(serve(path.join(__dirname, paths)));
// };

module.exports = {
  requestBodyParser,
  corsSet,
  staticPath
};
