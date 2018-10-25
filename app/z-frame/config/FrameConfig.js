const isEmpty = obj => obj == null || typeof obj === "undefined" || obj === "";

function checkRequired(fields, name = "") {
  if (fields && Array.isArray(fields)) {
    return fields.every(field => {
      const f = this[field];
      if (f && f.checkRequired) return f.checkRequired();
      else if (isEmpty(this[field])) {
        console.log(`${name} ${field} is required`);
        process.exit(0);
        return false;
      } else {
        return true;
      }
    });
  }
}

class DbConnect {
  user = null;
  password = null;
  host = null;
  port = null;
  checkRequired = checkRequired.bind(
    this,
    ["user", "password", "host", "port"],
    "DbConnect"
  );
}

//Oracle相关
class OracleDbConnect extends DbConnect {
  server = null;
  sid = "orcl";
  serviceName = null;
}

//数据库相关配置
class DBConfig {
  //构造器
  constructor(type) {
    this.type = type || "oracle";
    if (this.type === "oracle") this.connection = new OracleDbConnect();
    else {
      this.connection = new DbConnect();
    }
  }

  checkRequired = checkRequired.bind(this, ["type", "connection"], "DBConfig");

  setConnection(opt) {
    Object.assign(this.connection, opt);
    //查询必填项配置
    this.connection.checkRequired();
  }
}

//配置默认选项
class Option {
  useDb = true;
  useRemote = true;
  useCookieAuth = false;
  useDbType = "mysql";
}

let instance = null;
//基础配置框架
class FrameConfig {
  env = "development";
  appName = "app";
  host = "0.0.0.0";
  domain = "http://localhost";
  port = "3030";
  staticPaths = null; //静态资源文件地址
  remote = null;
  db = null;
  cookieKey = "sid";
  logLevel = "trace";
  version = "1.0.0";
  sqlDebug = true;

  constructor(opt) {
    if (!instance) {
      if (!opt instanceof Option) {
        console.log("use new FrameConfig.Option()");
      }
      // opt.useRemote && (this.remote = new Remote());
      opt.useDb && (this.db = new DBConfig(opt.useDbType));
      instance = this;
      return instance;
    }
  }

  checkRequired = () => {
    const requires = ["appName", "port"];
    // this.remote && requires.push("remote");
    this.useDb && requires.push("db");
    checkRequired.call(this, requires, "FrameConfig");
    console.log("check app config finish.");
  };

  static getInstance(opt) {
    if (instance) return instance;
    else return new FrameConfig(opt);
  }
  static Option = Option;
}

module.exports = FrameConfig;
