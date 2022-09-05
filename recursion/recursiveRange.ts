function range(n: number): number {
  if (n === 0) return 0;
  return n + range(n - 1);
}

// SAMPLE INPUT/OUTPUT
console.log(range(6)); // 21
console.log(range(10)); // 55
