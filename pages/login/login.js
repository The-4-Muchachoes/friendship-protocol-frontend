// Written by Alex

export default () => {
  const content = document.querySelector('.content');

  return fetch('./pages/login/login.html')
    .then((response) => response.text())
    .then((loginHtml) => {
      content.innerHTML = loginHtml;

      handleLoginFunctionality();
    });
};

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
