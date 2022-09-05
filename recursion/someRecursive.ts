function someRecursive(arr: number[], cb: (n: number) => any): any {
  if (arr.length === 0) return false;
  if (cb(arr[0])) return true;
  return someRecursive(arr.slice(1), cb);
}

function isOdd(n: number): boolean {
  return n % 2 !== 0;
}

console.log(someRecursive([4, 6, 8, 9], isOdd)); // true
console.log(someRecursive([4, 6, 8], isOdd)); // false
// someRecursive([4, 6, 8], (val) => val > 10); // false
