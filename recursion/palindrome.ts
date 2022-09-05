function palindrome(s: string): boolean {
  function reverser(s: string): string {
    if (!s.length) return "";
    return reverser(s.slice(1)) + s[0];
  }

  const isPalindrome = s === reverser(s);
  return isPalindrome;
}

console.log(palindrome("LMAO"));
console.log(palindrome("lol"));
