function reverse(s: string) {
  const result = [];

  for (let i = s.length - 1; i >= 0; i--) {
    result.push(s[i]);
  }

  return result.join("");
}

function reverseB(s: string): string {
  if (s.length === 0) return s;
  return reverseB(s.slice(1)) + s[0];
}

console.log(reverseB("OMAGA"));
console.log(reverseB("lur"));
console.log(reverseB("lorem"));
console.log(reverseB("miss doctor"));
