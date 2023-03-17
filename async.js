async function loadJson(url) {
  let response = await fetch(url);
    if (response.status == 200) {
      let resp = await response.json();
      return resp;
    } else {
      throw new Error(response.status);
    }
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404


class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = fetch(url);
    if (response.status == 200) {
      let resp = await response.json();
      return resp;
    } else {
      throw new HttpError(response);
    }
}

async function demoGithubUser() {
  let user;
  while(true) {
    let name = prompt("Введите логин?", "iliakan");
    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break;
    }
    catch(err){
      if (err instanceof HttpError && err.response.status == 404) {
          alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        } else {
          throw err;
        }
      }
    }
    alert(`Полное имя: ${user.name}.`);
    return user;
}

demoGithubUser();

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  wait().then(result => alert(result));
}