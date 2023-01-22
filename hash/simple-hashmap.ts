const colors: { [key: string]: string } = {};

colors["white"] = "#ffffff";
colors["red"] = "#ff0000";
colors["blue"] = "#0000ff";

console.log(colors["white"]); // #ffffff
console.log(colors["red"]); // #ff0000
console.log(colors["blue"]); // #0000ff

// Hash that works only on string
function hashStr(key: string, len: number) {
  let total = 0;

  const PRIME_NUM = 31;

  for (let i = 0; i < Math.min(key.length, 20); i++) {
    // add char utf code - 96 so we can gen the
    // number of its alphabetical order, a = 1, b = 2, and so on
    const value = key[i].charCodeAt(0) - 96;
    // add mod so it is not overflowing the len
    total = (total * PRIME_NUM + value) % len;
  }

  return total;
}

console.log(hashStr("white", 19)); // 3
console.log(hashStr("red", 19)); // 15
console.log(hashStr("blue", 19)); // 7
