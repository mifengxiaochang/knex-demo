"use strict";

const uuidV4 = require("uuid/v4");

//？？？？？？？？？？？？？
function requestId(ctx, options = {}) {
  const {
    header = "X-Request-Id",
    propertyName = "reqId",
    generator = uuidV4
  } = options;
  const reqId = ctx.request.get(header) || generator();
  ctx[propertyName] = reqId;
  ctx.set(header, reqId);
}

module.exports = requestId;
