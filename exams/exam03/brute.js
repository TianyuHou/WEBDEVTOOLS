const bruteForce = (o1, o2) => {
  for (let key of Object.keys(o2)) {
    o1[key] = o2[key];
  }
};

module.exports = bruteForce;
