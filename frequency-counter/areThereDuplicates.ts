// Time complexity => O(n)
// Space complexity => O(n)

interface Freq {
  [key: string]: number;
}

function areThereDuplicates(...args: any[]) {
  const freq: Freq = {};

  for (let i = 0; i < args.length; i++) {
    const current = args[i];
    freq[current] = (freq[current] || 0) + 1;
  }

  for (const key in freq) {
    if (freq[key] !== 1) return true;
  }

  return false;
}

console.log(areThereDuplicates(1, 2, 4, 7, 99, "a")); // false
console.log(areThereDuplicates(1, 2, 4, 7, 99, "a", "a")); // true
console.log(areThereDuplicates(2, 2, 4, 7)); // true
console.log(areThereDuplicates(2, 3, 4, 10, 100)); // false
console.log(areThereDuplicates(2, 100, 4000, 7)); // false
