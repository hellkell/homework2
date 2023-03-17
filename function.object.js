
  function makeCounter() {
    counter.count = 0;
    function counter() {
      return counter.count++;
    }
    counter.set = (value) => counter.count = value;
    counter.decrease = () => counter.count--;
    return counter;
  }

  function sum(a) {
    let _sum = a;
    function helper(b) {
      _sum += b;
      return helper
    }
    helper.toString = function() {
      return _sum;
    };
    return helper
  }