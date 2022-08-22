interface Freq {
  [key: string]: number;
}

function sameSquared(a: number[], b: number[]) {
  if (a.length !== b.length) return false;

  const aFreq: Freq = {};
  const bFreq: Freq = {};

  for (let i = 0; i < a.length; i++) {
    const current = a[i];
    const currentFreq = aFreq[current] || 0;
    aFreq[current] = currentFreq + 1;
  }

  for (let j = 0; j < b.length; j++) {
    const current = b[j];
    const currentFreq = bFreq[current] || 0;
    bFreq[current] = currentFreq + 1;
  }

  for (const key in aFreq) {
    const squaredA = (parseInt(key) * parseInt(key)).toString();
    if (aFreq[key] !== bFreq[squaredA]) return false;
  }

  return true;
}

console.log(sameSquared([1, 2, 3], [1, 4, 9])); // should be true
console.log(sameSquared([1, 2, 3], [1, 9, 4])); // should be true
console.log(sameSquared([1, 2, 1], [4, 4, 1])); // should be false
console.log(sameSquared([2, 3, 6, 8, 8], [64, 36, 4, 9, 64])); // should be true
