function doSum(a: number, b: number) {
  function performSum() {
    return a + b
  }

  return performSum;
}

const closure = doSum(15, 10);
console.log(closure()); // Output: 25

