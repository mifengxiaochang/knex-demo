const { HTTP_CODE, DEFAULT_APP_STATUS } = require("../constants");

const DEFAULT_ERROR_DESCRIPTION = "server unkown error.";

//为上下文添加返回方法
const respHelper = ctx => {
  // success 200 code 0
  ctx.res.success = (payload = null, description = null) => {
    ctx.status = HTTP_CODE.OK;
    ctx.body = {
      code: DEFAULT_APP_STATUS.SUCCESS,
      payload,
      description
    };
  };

  // success 200 but code use appStatusCode
  ctx.res.fail = (
    code = DEFAULT_APP_STATUS.UNKNOWN_ERROR,
    payload = null,
    description = DEFAULT_ERROR_DESCRIPTION
  ) => {
    ctx.status = HTTP_CODE.OK;
    ctx.body = {
      code,
      payload,
      description
    };
  };

  // failed 500 code 500
  ctx.res.error = (
    code = 500,
    payload = null,
    description = DEFAULT_ERROR_DESCRIPTION
  ) => {
    ctx.status = HTTP_CODE.INTERNAL_SERVER_ERROR;
    ctx.body = {
      code,
      payload,
      description
    };
  };
};

/*
  检查参数必选项
  params: 参数对象
  mustArr: 必须有的属性名
  依赖调用之前注入 ctx.res.fail
*/
const checkParams = ctx => {
  ctx.utils || (ctx.utils = {});
  ctx.utils.checkParams = (params, mustArr) => {
    if (!params || Object.keys(params).length === 0) {
      console.debug(`request params error mustArr=${mustArr}`);
      ctx.res.fail(
        HTTP_CODE.BAD_REQUEST,
        null,
        `request params ${mustArr} is required`
      );
      return false;
    }
    if (mustArr) {
      for (let i in mustArr) {
        const must = mustArr[i];
        const isMust = Object.prototype.hasOwnProperty.apply(params, [must]);
        if (!isMust) {
          console.debug(`request params error params=>${JSON.stringify(must)}`);
          ctx.res.fail(
            HTTP_CODE.BAD_REQUEST,
            { missingParam: must },
            `request params error <${must}> is required `
          );
          return false;
        }
      }
    }
    return true;
  };
};

module.exports = {
  respHelper,
  util: {
    checkParams
  }
};
