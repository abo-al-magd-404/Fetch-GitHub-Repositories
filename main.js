// main variables
let theInput = document.querySelector(".get-repos input");
let theButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

theButton.onclick = () => {
  getRepos();
};

// get repos function
function getRepos() {
  if (theInput.value == "") {
    // if value is empty
    reposData.innerHTML = "<span>please right github user name</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        // empty the container
        reposData.innerHTML = "";
        // loop on repos
        repos.forEach((repo) => {
          // create main div element
          let mainDiv = document.createElement("div");

          // create repo name text
          let repoName = document.createTextNode(repo.name);

          // append text to main div
          mainDiv.appendChild(repoName);

          // create second div for stars and link
          let secondDiv = document.createElement("div");
          secondDiv.className = "second-div";

          // create stars count span
          let starsSpan = document.createElement("span");

          // create the stars count text
          let starsText = document.createTextNode(
            `${repo.stargazers_count} stars`
          );

          // add stars count text to stars span
          starsSpan.appendChild(starsText);

          // create repo URL
          let theURL = document.createElement("a");

          // create repo URL text
          let theURLText = document.createTextNode("Visit");

          // append the URL text
          theURL.appendChild(theURLText);

          // add the "href"
          theURL.href = `https://github.com/${theInput.value}/${repo.name}`;

          // open link in another page
          theURL.setAttribute("target", "_blank");

          // append stars and link to second div
          secondDiv.appendChild(starsSpan);
          secondDiv.appendChild(theURL);

          // add class on maindiv
          mainDiv.className = "repo-box";

          // append the second div to main div
          mainDiv.appendChild(secondDiv);

          // append the main div to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
