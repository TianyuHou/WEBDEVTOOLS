function Constructor(name) {
  this.word = name;
  this.getWord = function() {
    return this.word;
  };
}

module.exports = Constructor;
