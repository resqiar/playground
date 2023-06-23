function romanToInt(s: string): number {
  const roman: Map<string, number> = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
    ["IV", 4],
    ["IX", 9],
    ["XL", 40],
    ["XC", 90],
    ["CD", 400],
    ["CM", 900],
  ]);

  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    const next = s[i + 1];
    const combined = current + next;

    if (roman.has(combined)) {
      sum += roman.get(combined)!;
      i++;
    } else {
      sum += roman.get(current)!;
    }
  }

  return sum;
}

// console.log(romanToInt("III"));
// console.log(romanToInt("LVIII"));
// console.log(romanToInt("MCMXCIV"));

function romanToIntObj(s: string): number {
  const roman: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
  };

  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    const next = s[i + 1];
    const combined = current + next;

    if (roman[combined]) {
      sum += roman[combined];
      i++;
    } else {
      sum += roman[current];
    }
  }

  return sum;
}

console.log(romanToIntObj("III"));
console.log(romanToIntObj("LVIII"));
console.log(romanToIntObj("MCMXCIV"));

function romanToIntOpt(s: string): number {
  const roman: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let sum = 0;

  for (let i = 0; i < s.length; i++) {
    const current = roman[s[i]];
    const next = roman[s[i + 1]];

    sum += current < next ? -current : current;
  }

  return sum;
}

console.log(romanToIntOpt("III"));
console.log(romanToIntOpt("LVIII"));
console.log(romanToIntOpt("MCMXCIV"));
