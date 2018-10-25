require("babel-register");
require("babel-polyfill");
const Koa = require("koa");

const config = require("./config");
const frame = require("./z-frame");
// const socket = require("./socket");
const router = require("./routers");
const { showBanner } = require("./utils/banner");

const app = new Koa();
showBanner(config.appName, config.version);

frame.attach(app, config);
// socket.attach(app);
app.use(router.routes());

app.listen(config.port, () => {
  console.log(`${config.env} server started on port ${config.port}`);
});
