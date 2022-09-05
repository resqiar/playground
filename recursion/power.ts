function power(base: number, raise: number): number {
  if (raise === 0) return 1;
  return base * power(base, raise - 1);
}

console.log(power(2, 2)); // 4
console.log(power(2, 4)); // 16
console.log(power(2, 0)); // 1
