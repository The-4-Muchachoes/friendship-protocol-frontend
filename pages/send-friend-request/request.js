// Written by Alex

export default () => {
  const content = document.querySelector('.content');

  const user = JSON.parse(localStorage.getItem('user'));
  if (user == null || user.email == null) window.location.href = '/';

  return fetch('./pages/send-friend-request/request.html')
    .then((response) => response.text())
    .then((requestHtml) => {
      content.innerHTML = requestHtml;

      run(user);
    });
};

function run(user) {
  addEventlistener(user);
}

function addEventlistener(user) {
  const form = document.querySelector('.request-form');
  const emailInput = document.querySelector('.email-input');
  const hostInput = document.querySelector('.host-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendFriendRequest(user, emailInput, hostInput);
  });
}

function sendFriendRequest(user, emailInput, hostInput) {
  fetch(`${window.apiUrl}/api/friendrequests/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: user.email,
      dest: emailInput.value,
      destHost: hostInput.value,
    }),
  })
    .then((Response) => Response.json())
    .then((response) => {
      console.log(response);
      handleResponse(response, emailInput, hostInput);
    });
}

function handleResponse(response, emailInput, hostInput) {
  if (response.statusCode && response.phrase)
    displayMessage(response.phrase, 'error');
  else if (response.error && response.message)
    displayMessage(response.message, 'error');
  else {
    let email = response.friend.email;
    let host = response.friend.host.replace('http://', '').replace('http://');
    displayMessage(`Friend request sent to ${email} at ${host}`, 'success');
    emailInput.value = '';
    hostInput.value = '';
  }
}

function displayMessage(phrase, type) {
  const messageTd = document.querySelector('.response');
  messageTd.setAttribute('class', `response ${type}-message`);

  messageTd.innerHTML = phrase;
}

function handleLoginFunctionality() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    // Make sure the form is not submitted
    event.preventDefault();

    const email = document.querySelector('input.email');

    fetch(`${window.apiUrl}/api/user/login`, {
      // changed to our api
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          // Saving the JWT to local storage
          localStorage.setItem('user', JSON.stringify(data));
          // navigating to the users route. Using the global window.router
          // window.router.navigate(`/user/${data.id}`);
          window.location.href = '/#/profile';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
