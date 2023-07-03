function* randomNumGen(max: number) {
  const rng = Math.floor(Math.random() * max);

  while (true) {
    yield rng;
  }
}

const i = randomNumGen(1000);

console.log(i.next().value);
console.log(i.next().value);
console.log(i.next().value);

// try {
//   setTimeout(() => {
//     throw new Error("SOMETHING WENT WRONG!");
//   }, 10); // 10ms delay
// } catch (e) {
//   // It will never catch the error
//   console.log(e);
// }

function testStf(a: number, b: number) {
  const stuff = Promise.allSettled([
    new Promise((resolve) => setTimeout(() => resolve(a + b), 100)),
    new Promise((resolve) => setTimeout(() => resolve(a * b), 200)),
  ]);

  return stuff;
}

await testStf(5, 2).then((v) => console.log(v));
testStf(10, 2).then((v) => console.log(v));

console.log("Me first!");
console.log("Another log!");

console.log("Another log!");
console.log("Another log!");
console.log("Another log!");

Promise.resolve(2 + 3).then((v) => console.log(v));

console.log("Another log!");
console.log("Another log!");

console.log("Another log!");

export {};
