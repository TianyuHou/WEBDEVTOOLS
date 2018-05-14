const chain = {
  val: 0,
  one: function() {
    this.val += 1;
    return this;
  },
  two: function() {
    this.val += 2;
    return this;
  },
  result: function() {
    const res = this.val;
    this.val = 0;
    return res;
  }
};

module.exports = chain;
