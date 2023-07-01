function getFn(time: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

async function cbTest() {
  const fn = getFn(10);

  fn.then((v) => console.log("RESOLVE 0", v));

  const fl = new Promise((resolve) => {
    for (let i = 0; i < 5_000; i++) {
      setTimeout(() => {
        console.log(i);

        if (i === 999) {
          resolve;
        }
      }, 0);
    }
  });

  fl.then(() => console.log("FL completed"));

  const val = await fn;
  console.log("RESOLVE 1", val);

  for (let i = 0; i < 1; i++) {
    console.log(i);
  }

  fn.then((v) => console.log("RESOLVE 2", v));
}

cbTest();
