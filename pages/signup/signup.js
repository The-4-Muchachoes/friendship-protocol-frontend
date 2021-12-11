// Written by Periklis

export default () => {
  const content = document.querySelector('.content');

  return fetch('./pages/signup/signup.html')
    .then((response) => response.text())
    .then((signupHtml) => {
      content.innerHTML = signupHtml;

      handleSignInFunctionality();
    });
};

function handleSignInFunctionality() {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    // Make sure the form is not submitted
    event.preventDefault();

    const email = document.querySelector('input.email');

    fetch(`${window.apiUrl}/api/user/signup`, {
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
        console.log(data);
        if (data.email) {
          // Saving the JWT to local storage
          localStorage.setItem('user', JSON.stringify(data));
          displayMessage('User signup successful');
          window.location.href = '/profile';
        } else if (data.error) {
          displayMessage(data.message);
        }
      });
  });
}

function displayMessage(message) {
  const errorMessage = document.querySelector('.message');
  errorMessage.innerHTML = message;
}
