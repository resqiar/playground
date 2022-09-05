// I DONT UNDERSTAND A THING
// NEED TO STUDY MORE ON THIS ALGO
interface Freq {
  [key: string]: number;
}

function longestSubstring(input: string) {
  let longest = 0;
  let seen: Freq = {};
  let start = 0;

  for (let i = 0; i < input.length; i++) {
    let char = input[i];

    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }

    longest = Math.max(longest, i - start + 1);
    seen[char] = i + 1;
  }

  return longest;
}

console.log(
  longestSubstring(""),
  longestSubstring("rithmschool"),
  longestSubstring("thisisawesome"),
  longestSubstring("thecatinthehat"),
  longestSubstring("bbbbbb")
);
