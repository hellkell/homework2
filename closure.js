function sum(a) {
	return function(b) {
		return a + b;
	}
}

// ########################################

function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

// ########################################

function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

// ########################################

