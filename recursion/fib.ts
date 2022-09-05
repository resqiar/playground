function generateFibonacci(n: number) {
  // initial fibonacci sequence
  let result = [0, 1];

  // start the index at 2, because result
  // already has 2 value [0, 1]
  for (let i = 2; i < n; i++) {
    // do a fibonacci calculation.
    // to get a fibonacci number, basically you need
    // to sum 2 number before and 1 number before index,
    // for example two number before index 2 is 0,
    // one number before index 2 is 1, sum them together
    // and we will get the fibonacci number of index 2.
    result.push(result[i - 2] + result[i - 1]);
  }

  // return all the result
  return result;
}

function fibOfN(n: number) {
  // initial fibonacci sequence
  let result = [0, 1];

  // start the index at 2, because result
  // already has 2 value [0, 1]
  for (let i = 2; i <= n; i++) {
    // do a fibonacci calculation.
    // to get a fibonacci number, basically you need
    // to sum 2 number before and 1 number before index,
    // for example two number before index 2 is 0,
    // one number before index 2 is 1, sum them together
    // and we will get the fibonacci number of index 2.
    result.push(result[i - 2] + result[i - 1]);
  }

  // after we have the fibonacci sequences,
  // return the last item in the array for the result.
  return result[result.length - 1];
}

// RECURSIVE SOLUTION
// HAVE NO IDEA HOW THIS WORKS,
// NEED MORE STUDY ABOUT RECURSION!
function fibR(n: number): number {
  if (n <= 2) return 1;
  return fibR(n - 1) + fibR(n - 2);
}

console.log(generateFibonacci(5));
console.log(fibOfN(4));
console.log(fibR(5));
