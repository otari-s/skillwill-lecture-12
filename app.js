function pipe(...functions) {
  return function piped_function(...args) {
    let result = args;
    for (const func of functions) {
      result = func(...result);
    }
    return result;
  };
}

// *******************************************
function post(title, body) {
  const postDiv = document.createElement(`div`);
  postDiv.classList.add(`card`);
  const h1 = document.createElement(`h1`);
  h1.innerHTML = title;
  const p = document.createElement(`p`);
  p.innerHTML = body;
  postDiv.append(h1, p);

  return postDiv;
}

async function users() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const userList = await response.json();

  userList.forEach((user) => {
    const userInfo = post(user.title, user.body);
    document.body.append(userInfo);
  });
}
users();
// *************************************************************************
function deepCopy(obj) {
  return new Promise((resolve, reject) => {
    if (typeof obj !== "object" || obj === null) {
      reject("Argument is not an object");
    }
    let clone = {};
    for (let prop in obj) {
      if (typeof obj[prop] === "object" && obj[prop] !== null) {
        deepCopy(obj[prop])
          .then((res) => {
            clone[prop] = res;
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        clone[prop] = obj[prop];
      }
    }
    resolve(clone);
  });
}

let obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

deepCopy(obj)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// ****************************************************
