let mapExample: Map<string, number> = new Map();
let arrExample: number[] = [];

function populateArray(value: number) {
  for (let i = 1; i <= value; i++) {
    arrExample.push(i);
  }
}

function populateMap(value: number) {
  for (let i = 1; i <= value; i++) {
    const key = `items-${i}`;
    mapExample.set(key, i);
  }
}

function getMap(key: string) {
  return mapExample.get(key);
}

function getArr(value: number) {
  for (let i = 0; i < arrExample.length; i++) {
    const current = arrExample[i];
    if (current === value) return current;
  }

  return null;
}

populateArray(10_000_000);
populateMap(10_000_000);

const tgt = 10_000_000;

const hashStart = performance.now();
getMap(`items-${tgt}`);
const hashEnd = performance.now();

const arrStart = performance.now();
getArr(tgt);
const arrEnd = performance.now();

console.log("HASH: ", hashEnd - hashStart);
console.log("ARRAY: ", arrEnd - arrStart);
