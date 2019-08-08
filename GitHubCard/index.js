/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

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

const url = "https://api.github.com/users/";
// const friendsArray = ["jordowag", "tetondan","dustinmyers", "justsml", "luishrd", "bigknell"]
friendsArray = ["jordowag"];
friendsArray.forEach((friend) => {
  axios.get(`${url}${friend}`)
    .then(createUserCard)
    .then(appendToPage)
    .catch(printError)
});
let josh = "bigknell";
// axios.get(`${url}${josh}`)
//   .then((response) => {
//     return response.data.followers_url
//   })
//   .then((followersURL) => {
//     axios.get(followersURL)
//       .then((response) => {
//         response.data.forEach((user) => {
//           console.log(user.url);
//           axios.get(user.url)
//             .then(createUserCard)
//             .then(appendToPage)
//             .catch(printError);
//         });
//       })
//       .catch(printError);
//   })
//   .catch(printError);
function createUserCard(response) {
  // Create Elements and Add Classes
  console.log(response);
  let data = response.data;
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.height = "180px";
  let avatar = document.createElement("img");
  let calendar = document.createElement("calendar");
  calendar.classList.add("calendar","hidden");
  let info = document.createElement("div");
  info.classList.add("card-info");
  let name = document.createElement("h3");
  name.classList.add("name");
  let username = document.createElement("p");
  username.classList.add("username");
  let location = document.createElement("p");
  let profile = document.createElement("p");
  let pageURL = document.createElement("a");
  let followerCount = document.createElement("p");
  let followingCount = document.createElement("p");
  let biography = document.createElement("p");
  let button = document.createElement("p");
  button.classList.add("btn");
  let hiddenData = document.createElement("div");
  hiddenData.classList.add("hidden-data");
  hiddenData.classList.add("hidden");
  let company = document.createElement("p");
  let blog = document.createElement("p");
  let blogURL = document.createElement("a");
  // Add text content
  avatar.src = data.avatar_url;
  name.textContent = data.name;
  username.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  profile.textContent = "Profile: "
  pageURL.href = data.html_url;
  pageURL.textContent = data.html_url;
  followerCount.textContent = `Followers: ${data.followers}`;
  followingCount.textContent = `Following: ${data.following}`;
  company.textContent = `Company: ${data.company}`;
  button.textContent = "read more"
  blog.textContent = "Blog: ";
  blogURL.href = data.blog;
  blogURL.textContent = data.blog;
  // Create Structure
  card.append(avatar,info,calendar);
  info.append(name,username,location,profile,followerCount,followingCount,biography, button, hiddenData);
  profile.append(pageURL);
  hiddenData.append(company,blog);
  blog.append(blogURL);
  // Event handlers
  button.addEventListener("click", (event) => {
    if (card.style.height == "180px") {
      TweenLite.to(card,1,{height: 300});
      setTimeout(function(){
        hiddenData.classList.remove("hidden");
        calendar.classList.remove("hidden");
      }, 350);
    } else {
      hiddenData.classList.add("hidden");
      calendar.classList.add("hidden");
      TweenLite.to(card,1,{height: 180});

    }
  });
  GitHubCalendar(calendar,data.login,{responsive:true});
  return card;
}

function appendToPage(user){
  let cards = document.querySelector(".cards");
  cards.append(user);
}

function printError(err){
  console.log(err);
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
