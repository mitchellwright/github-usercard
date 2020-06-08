/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

const myUser = axios.get('https://api.github.com/users/mitchellwright')
  .then( response => {
    console.log(response.data);
    return response.data;
  })
  .catch( error => {
    console.error(error);
  });
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'mattwright42',
  'hgahlot',
  'nickbasile',
  'tommycollison'
];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardMaker(githubUser) {
  let card = document.createElement('div');
  card.classList.add('card');

  let profileImage = document.createElement('img');
  profileImage.src = githubUser.avatar_url;
  card.appendChild(profileImage);

  let cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);

  let userName = document.createElement('h3');
  userName.classList.add('name');
  userName.textContent = githubUser.name;
  cardInfo.appendChild(userName);

  let usersUsername = document.createElement('p');
  usersUsername.classList.add('username');
  usersUsername.textContent = githubUser.login;
  cardInfo.appendChild(usersUsername);

  let location = document.createElement('p');
  location.textContent = githubUser.location;
  cardInfo.appendChild(location);

  let profile = document.createElement('p');
  profile.textContent = 'Profile:';
  cardInfo.appendChild(profile);

  let githubPageUrl = document.createElement('a');
  githubPageUrl.href = githubUser.html_url;
  githubPageUrl.textContent = githubUser.html_url;
  profile.appendChild(githubPageUrl);

  let followers = document.createElement('p');
  followers.textContent = `Followers: ${githubUser.followers}`;
  cardInfo.appendChild(followers);


  let following = document.createElement('p');
  following.textContent = `Following: ${githubUser.following}`;
  cardInfo.appendChild(following);

  let bio = document.createElement('p');
  bio.textContent = `Bio: ${githubUser.bio}`;
  cardInfo.appendChild(bio);

  return card;
}

let cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/mitchellwright')
  .then( response => {
    const newCard = cardMaker(response.data);
    cards.appendChild(newCard);
  })
  .catch( error => {
    console.error(error);
  });

followersArray.forEach( user => {
  axios.get('https://api.github.com/users/' + user)
  .then( response => {
    const newCard = cardMaker(response.data);
    cards.appendChild(newCard);
  })
  .catch( error => {
    console.error(error);
  });
});

