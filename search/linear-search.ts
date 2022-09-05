function linearSearch(arr: any[], n: any) {
  if (!arr.length) return -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) return i;
  }
  return -1;
}

console.log(linearSearch([1283, 312673, 3172, 7832, 89, 2], 3));
