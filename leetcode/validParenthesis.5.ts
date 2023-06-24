// function isValid(s: string): boolean {
//   const parentheses: { [key: string]: string } = {
//     "(": ")",
//     "{": "}",
//     "[": "]",
//   };

//   const result: string[] = [];

//   for (let i = 0; i < s.length; i++) {
//     const current: string = s[i];

//     if (current === parentheses[result[result.length - 1]]) {
//       result.pop();
//     } else {
//       result.push(current);
//     }
//   }

//   return result.length === 0;
// }

function isValid(s: string): boolean {
  const parentheses: { [key: string]: string } = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  const result: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const current: string = s[i];

    if (current in parentheses) {
      if (result.pop() !== parentheses[current]) return false;
    } else {
      result.push(current);
    }
  }

  return result.length === 0;
}

// const s = "([])[]{}";
const s = "({})";
console.log(isValid(s));

// ( )
// loop
// (
// )
// []
