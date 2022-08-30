// Time complexity => O(n log n)
// Space complexity => O(1)

function areThereDuplicatesOneLiner(...args: any[]) {
  return new Set(args).size !== arguments.length;
}

console.log(areThereDuplicatesOneLiner(1, 2, 4, 7, 99, "a")); // false
console.log(areThereDuplicatesOneLiner(1, 2, 4, 7, 99, "a", "a")); // true
console.log(areThereDuplicatesOneLiner(2, 2, 4, 7)); // true
console.log(areThereDuplicatesOneLiner(2, 3, 4, 10, 100)); // false
console.log(areThereDuplicatesOneLiner(2, 100, 4000, 7)); // false
