function flat(arr: any[]) {
  let result: any[] = [];

  arr.forEach((v) => {
    if (Array.isArray(v)) {
      result = result.concat(flat(v));
    } else {
      result.push(v);
    }
  });

  return result;
}

console.log(flat([1, 2, [3, 4, [5, 6]]]));
