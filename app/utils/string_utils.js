const underCase = (str) => {
  return String(str || '').replace(/([A-Z]+)/g, (all, letter) => '_' + letter.toLowerCase());
};

const camelCase = (str) => {
  return String(str || '').replace(/_([a-z])/g, (all, letter) => letter.toUpperCase());
};

module.exports = {
  underCase,
  camelCase,
};