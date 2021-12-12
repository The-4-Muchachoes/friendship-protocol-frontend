// Written by Lars

export default () => {
  const content = document.querySelector('.content');

  const user = JSON.parse(localStorage.getItem('user'));
  if (user == null || user.email == null) window.location.href = '/';

  return fetch('./pages/profile/profile.html')
    .then((Response) => Response.text())
    .then((profileHtml) => {
      content.innerHTML = profileHtml;
      run(user);
    });
};

async function run(user) {
  renderUserDetails(user);

  // Fetch and render friend list
  const friends = await fetchFriendsByStatus(user, 'friends');
  renderFriends(friends);

  // Fetch and render incoming friend requests
  const requests = await fetchFriendsByStatus(user, 'requests');
  renderFriendRequests(requests);

  // Fetch and render list of blocked users
  const blockedUsers = await fetchFriendsByStatus(user, 'blocked');
  renderBlockedUsers(blockedUsers);

  addButtonEventListeners(user);
}

/* 
  Render methods 
*/
function renderUserDetails(user) {
  const userDetails = document.querySelector('.user-details');
  userDetails.innerHTML = `
    <h2>${user.email}</h2>  
  `;
}

function renderFriends(friends) {
  const friendsDiv = document.querySelector('.friend-list');

  friendsDiv.innerHTML = getFriendsHtml(friends);
}

function renderFriendRequests(requests) {
  const requestsDiv = document.querySelector('.friend-requests');

  requests.length == 0
    ? (requestsDiv.innerHTML = '')
    : (requestsDiv.innerHTML = getRequestsHtml(requests));
}

function renderBlockedUsers(blockedUsers) {
  const blockedDiv = document.querySelector('.blocked-users');

  blockedUsers.length == 0
    ? (blockedDiv.innerHTML = '')
    : (blockedDiv.innerHTML = getBlockedUsersHtml(blockedUsers));
}

/* 
  Fetch methods 
*/
async function fetchFriendsByStatus(user, status) {
  return await fetch(`${window.apiUrl}/api/user/${status}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: user.email,
    },
  })
    .then((Response) => Response.json())
    .then((friendsData) => {
      console.log(friendsData);
      return friendsData;
    });
}

function changeFriendship(user, friendEmail, friendHost, action) {
  fetch(`${window.apiUrl}/api/friendrequests/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      src: user.email,
      dest: friendEmail,
      destHost: friendHost,
    }),
  }).then(() => run(user));
}

/* 
  Html builder methods 
*/
function getFriendsHtml(friends) {
  let friendTable = `<h3 class="ta-center">Friends</h3>`;
  if (friends.length == 0) {
    friendTable += `<h4 class="ta-center">You have no friends</h4>`;
    return friendTable;
  }

  friendTable += `
    <table class="ta-left w100">
      <thead>
        <th>Email</th><th>Host Network</th><th>Action</th>
      </thead>
      <tbody>`;

  friends.forEach((friend) => {
    const email = friend.email;
    const host = friend.host.replace('http://', '').replace('http://');
    friendTable += `
      <tr>
        <td>${email}</td>
        <td>${host}</td>
        <td>
          <button class="remove" name="${email} ${friend.host}">Remove</button>
          <button class="block" name="${email} ${friend.host}">Block</button>
        </td>
      </tr>`;
  });

  friendTable += `</tbody></table>`;
  return friendTable;
}

function getRequestsHtml(requests) {
  let requestsTable = `
  <h3 class="ta-center">Friend Requests</h3>
  <table class="ta-left w100">
    <thead>
      <th>Email</th><th>Host Network</th><th>Action</th>
    </thead>
    <tbody>`;

  requests.forEach((request) => {
    const email = request.email;
    const host = request.host.replace('http://', '').replace('http://');
    requestsTable += `
      <tr>
        <td>${email}</td>
        <td>${host}</td>
        <td>
          <button class="accept" name="${email} ${request.host}">Accept</button>
          <button class="deny" name="${email} ${request.host}">Deny</button>
          <button class="block" name="${email} ${request.host}">Block</button>
        </td>
      </tr`;
  });

  requestsTable += `</tbody></table>`;
  return requestsTable;
}

function getBlockedUsersHtml(blockedUsers) {
  let blockedUsersTable = `
  <h3 class="ta-center">Blocked Users</h3>
  <table class="ta-left w100">
    <thead>
      <th>Email</th><th>Host Network</th>
    </thead>
    <tbody>`;

  blockedUsers.forEach((blocked) => {
    const email = blocked.email;
    const host = blocked.host.replace('http://', '').replace('http://');
    blockedUsersTable += `
      <tr>
        <td>${email}</td>
        <td>${host}</td>
      </tr`;
  });

  blockedUsersTable += `</tbody></table>`;
  return blockedUsersTable;
}

/* 
  Other helper methods   
*/
function addButtonEventListeners(user) {
  const acceptButtons = document.querySelectorAll('.accept');
  const denyButtons = document.querySelectorAll('.deny');
  const blockButtons = document.querySelectorAll('.block');
  const removeButtons = document.querySelectorAll('.remove');

  acceptButtons.forEach((button) => {
    const emailHost = button.name.split(' ');
    button.addEventListener('click', () =>
      changeFriendship(user, emailHost[0], emailHost[1], 'accept')
    );
  });

  removeButtons.forEach((button) => {
    const emailHost = button.name.split(' ');
    button.addEventListener('click', () =>
      changeFriendship(user, emailHost[0], emailHost[1], 'remove')
    );
  });

  blockButtons.forEach((button) => {
    const emailHost = button.name.split(' ');
    button.addEventListener('click', () =>
      changeFriendship(user, emailHost[0], emailHost[1], 'block')
    );
  });

  denyButtons.forEach((button) => {
    const emailHost = button.name.split(' ');
    button.addEventListener('click', () =>
      changeFriendship(user, emailHost[0], emailHost[1], 'deny')
    );
  });
}
