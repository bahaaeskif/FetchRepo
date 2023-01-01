


//Main variable
let inputField = document.querySelector('.header input');

let getRepo = document.querySelector('.header .get-btn');

let showData = document.querySelector('.show-data');


//click event on button to get data
getRepo.addEventListener("click", () => {

    getdata();

});


//implemention fetch mehtod
function getdata() {

    if (inputField.value == "") {

        showData.innerHTML = '<span>Enter the Github Username</span>';

    } else {

        fetch(`https://api.github.com/users/${inputField.value}/repos`)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Can't fetch API");
                }
                return response.json();
            })
            .then((data) => {

                showData.innerHTML = " ";

                data.forEach(repo => {
                    // Create The Main Div Element
                    let mainDiv = document.createElement("div");

                    // Create Repo Name Text
                    let repoName = document.createTextNode(repo.name);

                    // Append The Text To Main Div
                    mainDiv.appendChild(repoName);

                    // Create Repo URL Anchor
                    let theUrl = document.createElement('a');

                    // Create Repo Url Text
                    let theUrlText = document.createTextNode("Visit");

                    // Append The Repo Url Text To Anchor Tag
                    theUrl.appendChild(theUrlText);

                    // Add Thje Hypertext Reference "href"
                    theUrl.href = `https://github.com/${inputField.value}/${repo.name}`;

                    // Set Attribute Blank
                    theUrl.setAttribute('target', '_blank');

                    // Append Url Anchor To Main Div
                    mainDiv.appendChild(theUrl);

                    // Create Stars Count Span
                    let starsSpan = document.createElement("span");

                    // Create The Stars Count Text
                    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                    // Add Stars Count Text To Stars Span
                    starsSpan.appendChild(starsText);

                    // Append Stars Count Span To Main Div
                    mainDiv.appendChild(starsSpan);

                    // Add Class On Main Div
                    mainDiv.className = 'repo-box';

                    // Append The Main Div To Container
                    showData.appendChild(mainDiv);

                });
            })

    }
};