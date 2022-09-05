function isSubsequence(a: string, b: string) {
  let first: number = 0;
  let second: number = 0;

  while (first < a.length && second <= b.length) {
    const equal: boolean = a[first] === b[second];

    if (equal) {
      first++;
      second++;
    } else {
      second++;
    }
  }

  if (first === a.length && second <= b.length) return true;
  return false;
}

// Colt Steele Solution
// Much pretty i think
// function isSubsequence(a: string, b: string) {
//   let first = 0;
//   let second = 0;
//
//   if (!a) return true;
//
//   while (second < b.length) {
//     if (b[second] === a[first]) first++;
//     if (first === a.length) return true;
//     second++;
//   }
//
//   return false;
// }

console.log(isSubsequence("hello", "hworledlloptsd")); // true
console.log(isSubsequence("abc", "abracadabra")); // true
console.log(isSubsequence("abc", "acb")); // false
console.log(isSubsequence("a", "")); // false
console.log(isSubsequence("bbc", "cbb")); // false
console.log(isSubsequence("bbc", "bkaroebmadanecabangc")); // true
