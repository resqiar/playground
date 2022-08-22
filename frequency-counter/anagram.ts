interface Freq {
  [key: string]: number
}

function isAnagram(a: string, b: string) {
  let aFreq: Freq = {}
  let bFreq: Freq = {}

  for (let index = 0; index < a.length; index++) {
    const current = a[index];
    aFreq[current] = (aFreq[current] || 0) + 1;
  }

  for (let index = 0; index < b.length; index++) {
    const current = b[index];
    bFreq[current] = (bFreq[current] || 0) + 1;
  }

  for (const key in aFreq) {
    if (aFreq[key] !== bFreq[key]) return false;
  }

  return true;
}

console.log(isAnagram("listen", "silent"))
console.log(isAnagram("aaz", "zza"))
console.log(isAnagram("anagram", "nagaram"))
console.log(isAnagram("rat", "car"))
console.log(isAnagram("awesome", "awesom"))
console.log(isAnagram("qwerty", "qeywrt"))
console.log(isAnagram("texttwisttime", "timetwisttext"))
