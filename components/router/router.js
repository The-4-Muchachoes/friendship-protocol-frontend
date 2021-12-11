// Written by everyone

import renderNavbar from '../navbar/navbar.js';
import renderMain from '/pages/main/main.js';
import renderSignup from '/pages/signup/signup.js';
import renderLogin from '../../pages/login/login.js';
import renderOrders from '../../pages/profile/profile.js';

export default () => {
  const router = new Navigo('/', { hash: true });
  window.router = router;
  router
    .on({
      '/': () => {
        renderMain().then(router.updatePageLinks);
        console.log('User requested main page');
      },
      login: () => {
        renderLogin().then(router.updatePageLinks);
        console.log('User requested login page');
      },
      signup: () => {
        renderSignup().then(router.updatePageLinks);
        console.log('User requested signup page');
      },
      profile: () => {
        renderOrders().then(router.updatePageLinks);
      },
    })
    .on({
      '*': async () => {
        renderNavbar().then(router.updatePageLinks);
      },
    })
    .resolve();
};
