function isPalindrome(x: number): boolean {
  const str = x.toString();
  const len = str.length;

  // why len / 2 ?
  // because I already compare it with two pointers
  // starting from start and another pointer starts from end.
  for (let i = 0; i < len / 2; i++) {
    const start = str[i];
    const end = str[len - 1 - i];

    if (start !== end) return false;
  }

  return true;
}

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));
console.log(isPalindrome(11));
console.log(isPalindrome(55));
console.log(isPalindrome(505));
