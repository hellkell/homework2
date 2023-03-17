function spy(f) {
  function decorator(...args) {
    decorator.calls.push(args);
    return f.apply(this.args)
  }
  decorator.calls = []
}

// ########################################

function delay(f, ms) {
  function decorator() {
    setTimeout(() => f.apply(this, arguments), ms)
  }
  return decorator;
}

function debounce(f, ms) {
  let freeze = false;
  return function() {
    if (!freeze) {
      f.apply(this, arguments);
      freeze = true;
      setTimeout(() => freeze = false, ms);
    }
  };
}

// ########################################

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}