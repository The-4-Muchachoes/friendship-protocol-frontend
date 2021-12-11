const apiUrl = 'http://localhost:8080';

run();

async function run() {
  await signupMe();
  await signupYou();
  await addYou();
  accept();
  await signupBlock();
  await addBlock();
  block();
  await signupDeny();
  await addDeny();
  deny();
  await signupRequest();
  await addRequest();
}

async function signupMe() {
  await fetch(`${apiUrl}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'me@email.com',
    }),
  });
}

async function signupYou() {
  await fetch(`${apiUrl}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'you@email.com',
    }),
  });
}

async function signupBlock() {
  await fetch(`${apiUrl}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'block@email.com',
    }),
  });
}

async function signupDeny() {
  await fetch(`${apiUrl}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'deny@email.com',
    }),
  });
}

async function signupRequest() {
  await fetch(`${apiUrl}/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'request@email.com',
    }),
  });
}

async function addYou() {
  await fetch(`${apiUrl}/api/friendrequests/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'me@email.com',
      dest: 'you@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}

async function addBlock() {
  await fetch(`${apiUrl}/api/friendrequests/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'block@email.com',
      dest: 'me@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}

async function addDeny() {
  await fetch(`${apiUrl}/api/friendrequests/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'deny@email.com',
      dest: 'me@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}

async function addRequest() {
  await fetch(`${apiUrl}/api/friendrequests/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'request@email.com',
      dest: 'me@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}

function accept() {
  fetch(`${apiUrl}/api/friendrequests/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'you@email.com',
      dest: 'me@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}

function block() {
  fetch(`${apiUrl}/api/friendrequests/block`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'me@email.com',
      dest: 'block@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}

function deny() {
  fetch(`${apiUrl}/api/friendrequests/deny`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: 'me@email.com',
      dest: 'deny@email.com',
      destHost: 'http://localhost:8080',
    }),
  });
}
