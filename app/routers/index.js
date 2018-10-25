"use strict";
// 接收http请求并调用对应的函数
const Router = require("koa-router");
const controllers = require("../controllers");

const router = new Router();
router.get("/", controllers.home.welcome);

module.exports = router;
