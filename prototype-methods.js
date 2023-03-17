let dictionary = Object.create(null, {
  toString: {
    value() {
      return Object.keys(this).join();
    }
  }
});

