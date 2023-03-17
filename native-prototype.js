Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

// ########################################

Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};