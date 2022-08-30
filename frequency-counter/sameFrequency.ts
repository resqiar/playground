// Time complexity => O(n)
// Space complexity => O(n)

interface Freq {
  [key: string]: number;
}

function sameFrequency(a: number, b: number) {
  const aStr = a.toString();
  const bStr = b.toString();

  if (aStr.length !== bStr.length) return false;

  let aFreq: Freq = {};
  let bFreq: Freq = {};

  for (let i = 0; i < aStr.length; i++) {
    const current = aStr[i];
    aFreq[current] = (aFreq[current] || 0) + 1;
  }

  for (let j = 0; j < bStr.length; j++) {
    const current = bStr[j];
    bFreq[current] = (bFreq[current] || 0) + 1;
  }

  for (const key in aFreq) {
    if (aFreq[key] !== bFreq[key]) return false;
  }

  return true;
}

console.log(sameFrequency(182, 821)); // true
console.log(sameFrequency(184, 821)); // false
console.log(sameFrequency(12345678890, 18897654320)); // true
