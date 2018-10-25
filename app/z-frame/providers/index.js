const setReqId = require("./request_id");
const helper = require("./helper");

module.exports = async (ctx, next) => {
  // ctx.logger = require("../logger").getLogger();
  //setReqId(ctx);
  helper.respHelper(ctx);
  helper.util.checkParams(ctx);
  return next();
};
