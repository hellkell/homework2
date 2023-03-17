function sumTo(n) {
	if (n == 1) {
		return 1;
	}
	else {
		return n + sumTo(n - 1);
	}
}

function sumTo(n) {
	let res = 0;
	for (let i = 0; i < n + 1; i++) {
		res += i
	}
}

function sumTo(n) {
  return n * (n + 1) / 2;
}

// ########################################

function factorial(n) {
	if (n == 1) {
		return 1;
	}
	else {
		return n * factorial(n - 1);
	}
}

// ########################################

function fib(n) {
	if (n > 1) {
		return fib(n - 1) + fib(n - 2);
	}
	else {
		return n;
	}
}

// ########################################

function printList(list) {
	console.log(list.value);
	if (list.next != null) {
		printList(list.next);
	}
}