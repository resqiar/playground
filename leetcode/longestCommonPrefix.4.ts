// this techniques is called horizontal scaling
// where we set the first string as a result then
// gradually truncating the differences.
// time complexity -> worst case O(n^2)
function longestCommonPrefix(strs: string[]) {
  // set the first string as common prefix
  let res = strs[0];

  for (let i = 1; i < strs.length; i++) {
    for (let j = 0; j <= strs[i].length; j++) {
      const char = strs[i][j];

      // if char is not equal to common prefix,
      // truncate the common prefix.
      if (char !== res[j]) {
        res = res.substring(0, j);
        break;
      }
    }
  }

  return res;
}

const strs = ["flower", "flow", "flight"];
// const strs = ["dog", "racecar", "car"];
// const strs = ["ab", "a"];
console.log(longestCommonPrefix(strs));

function longestCommonPrefixVS(strs: string[]): string {
  let res = "";

  for (let i = 0; i < strs[0].length; i++) {
    const currentChar = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== currentChar) {
        return res;
      }
    }

    res += currentChar;
  }

  return res;
}

// const str = ["ab", "a"];
// const str = ["ab", "abc"];
// const str = ["flower", "flow", "flight"];
const str = ["dog", "racecar", "car"];
console.log("=================");
console.log(longestCommonPrefixVS(str));
