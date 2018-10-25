const { orm } = require("../z-frame");
//const socket = require("../socket");

module.exports = {
  async welcome(ctx) {
    const oracle = orm(); //相当于knex
    const rs = await oracle.select("*").from("F_REV_SUM");

    ctx.res.success(rs, "aaa");
  }
};
