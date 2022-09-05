function sumAll(n: number): number {
  if (n === 1) return 1;
  return n + sumAll(n - 1);
}

console.log(sumAll(3));
console.log(sumAll(4));
console.log(sumAll(10));
