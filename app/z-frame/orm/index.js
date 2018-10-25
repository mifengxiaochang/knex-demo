const ora = require("./knex/ora");

module.exports = {
  ...ora,
  provider: (ctx, next) => {
    ctx[ora.type] = ora.orm();
    return next();
  }
};
