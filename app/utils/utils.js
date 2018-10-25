const pick = (obj, arr) => {
  let result = {};
  arr.forEach(val => {
    if (val in obj) result[val] = obj[val];
  });
  return result;
};

const getNowYear = () => {
  let year = new Date().getFullYear();
  return year;
};

const formatStrigToMonth = str => {
  return str.replace(/^(\d{4})(\d{2})$/, "$2");
};

module.exports = {
  pick,
  getNowYear,
  formatStrigToMonth
};
