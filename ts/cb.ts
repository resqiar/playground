function fetchData(callback: Function) {
  setTimeout(() => {
    const data = "THIS IS THE EXAMPLE OF DATA!";

    callback(data);
  }, 5000);
}

async function getUsername(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(username);
    }, 1000);
  });
}

async function turnUppercase(username: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // return error
      reject("error in uppercasing!");

      // turn username to uppercase
      resolve(username.toUpperCase());
    }, 600);
  });
}

async function appendHelloWorld(username: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // append "Hello World" to the end of username
      const text = "Hello World";
      const appended = `${username}_${text}`;

      resolve(appended);
    }, 500);
  });
}

try {
  const username = await getUsername("user123");
  const uppercased = await turnUppercase(username);
  const result = await appendHelloWorld(uppercased);

  console.log(result);
} catch (error) {
  console.error("HEY SOMETHING WRONG!", error);
}

// getUsername("user123")
//   .then((username) => {
//     // turn username into uppercase
//     turnUppercase(username)
//       .then((uppercased) => {
//         // append "Hello World" into the uppercased username
//         appendHelloWorld(uppercased)
//           .then((appended) => {
//             // finally the result!
//             console.log(appended);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// call fetch data with a callback function as a parameter
fetchData(function (data: string) {
  console.log(data);
});

function getFn(time: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

// async function cbTest() {
//   const fn = getFn(10);

//   fn.then((v) => console.log("RESOLVE 0", v));

//   const fl = new Promise((resolve) => {
//     for (let i = 0; i < 5_000; i++) {
//       setTimeout(() => {
//         console.log(i);

//         if (i === 999) {
//           resolve;
//         }
//       }, 0);
//     }
//   });

//   fl.then(() => console.log("FL completed"));

//   const val = await fn;
//   console.log("RESOLVE 1", val);

//   for (let i = 0; i < 1; i++) {
//     console.log(i);
//   }

//   fn.then((v) => console.log("RESOLVE 2", v));
// }

// cbTest();
//
export {};
