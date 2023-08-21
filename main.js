const containerElement = document.querySelector(".container");
const like = document.querySelector(".like");
let charactersString = "";

like.addEventListener("click", () => {
  changeLike();
});

function changeLike() {
  like.innerHTML = `
  <svg fill="#F50000" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
  `;
}

function init() {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const { info, results } = response;
      showItems(results);
    });
}

function getSingleCharacter(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      containerElement.innerHTML = `
        <div>
            ${response.name}        
            ${response.gender} 
            <img src="${response.image}">
        </div>
      `;
    });
}

function showItems(characters) {
  for (let index = 0; index < characters.length; index++) {
    charactersString += `
        <button onclick="getSingleCharacter(${characters[index].id})">
          <span>${characters[index].name}</span>
        </button>
      `;
  }

  containerElement.innerHTML = charactersString;
}

init();
