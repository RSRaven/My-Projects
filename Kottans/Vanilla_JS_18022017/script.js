'use strict';

let gallery = document.getElementById('gallery');
let avatar = document.querySelector('.avatar');
let name = document.querySelector('.name');
let phone = document.querySelector('.phone');
let email = document.querySelector('.email');
let friends = document.getElementById('friends');
let replies = document.querySelector('.replies');
let input = document.querySelector('input');
let button = document.querySelector('button');

button.addEventListener('click', addReply);
input.addEventListener('keydown', (e) => {
  if (e.which === 13) {
    addReply();
  }
});

function addReply() {
  let text = input.value.trim();

  if (!text.length) {
    return;
  }

  let reply = document.createElement('p');
  reply.classList.add('reply');
  reply.innerHTML = text;
  replies.appendChild(reply);
}

function get(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status == 200 && xhr.readyState === 4) {
          resolve(JSON.parse(xhr.responseText)); /* PROMISE RESOLVED */
      } else {
          reject(Error(xhr.statusText)); /* PROMISE REJECTED */
      }
    };
    xhr.onerror = function() { reject(Error("Network Error")); };
    xhr.send();
  });
}

function drawPhotos(photos) {
  photos.forEach(drawPhoto);

  function drawPhoto(photo) {
    let div = document.createElement('div');
    let img = document.createElement('img');

    img.src = photo.url;
    div.classList.add('photo');
    img.src = photo.url;
    div.appendChild(img);
    gallery.appendChild(div);
  }

  return get('https://randomuser.me/api/');
}

function renderProfile(users) {
  let profile = users.results[0];
  avatar.src = profile.picture.large;
  name.innerHTML = `${profile.name.first} ${profile.name.last}`;
  phone.innerHTML = profile.phone;
  email.innerHTML = profile.email;

  return get('https://randomuser.me/api/?results=15');
}

function renderFriends(users) {
  let friendsList = users.results;
  for (let i = 0; i < friendsList.length; i++) {
    let friend = document.createElement('div');
    let img = document.createElement('img');
    friend.classList.add('friend');
    img.src = friendsList[i].picture.large;
    friend.appendChild(img);
    friends.appendChild(friend);
  }
}

get('/photo')
  .then(drawPhotos)
  .then(renderProfile)
  .then(renderFriends);
