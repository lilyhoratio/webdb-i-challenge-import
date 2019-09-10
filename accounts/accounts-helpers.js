function isAccountValid({ name, budget }) {
  return name && typeof name === "string" && typeof budget === "number";
}

module.exports = {
  isAccountValid
};
