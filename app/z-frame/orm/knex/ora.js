const convertToCamel = (obj = {}) => {
  if (!isObj(obj)) return obj;
  else {
    const o = {};
    Object.keys(obj).forEach(k => {
      const v = obj[k];
      if (isObj(v) || Array.isArray(v))
        o[stringToCamel(k)] = postProcessResponse(v);
      else o[stringToCamel(k)] = v;
    });
    return o;
  }
};

const postProcessResponse = (result, queryContext) => {
  if (Array.isArray(result)) {
    return result.map(row => convertToCamel(row)); //统一变成驼峰
  } else {
    return convertToCamel(result);
  }
};

//knex连接数据库相关配置
const dbConfig = {
  client: "oracledb",
  connection: {},
  fetchAsString: ["number", "clob"],
  postProcessResponse, //将返回的属性统一格式化
  log: {
    debug(message) {
      console.log("[KNEX DEBUG]: SQL ====> ", message.sql);
    }
  },
  pool: {
    max: 117,
    min: 0,
    acquireTimeout: 60 * 1000
  },
  debug: true
};

const isObj = obj => Object.prototype.toString.call(obj) === "[object Object]";

const stringToCamel = str => {
  return String(str || "")
    .toLowerCase()
    .replace(/_([a-z])/g, (all, letter) => letter.toUpperCase());
};

//拼接服务配置
const makeConnectString = opt => {
  const {
    host = "127.0.0.1",
    port = "1521",
    server = "DEDICATED",
    sid,
    serviceName
  } = opt;
  return `(DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = ${host})(PORT = ${port}))
    (CONNECT_DATA =
      (SERVER = ${server})
      ${sid ? `(SID = ${sid})` : ""}
      ${serviceName ? `(SERVICE_NAME = ${serviceName})` : ""}
    )
  )`;
};

module.exports = {
  type: "oracle",
  setConifg: config => {
    dbConfig.connection = config.db.connection;
    dbConfig.connection.connectString = makeConnectString(dbConfig.connection);
    dbConfig.debug = config.sqlDebug;
  },
  orm: () => {
    return require("knex")(dbConfig); //knex
  }
};
