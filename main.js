const containerElement = document.querySelector(".card_container");
const like = document.querySelector(".like");
const idsKey = "@rickAndMortyLikes";
let likesIds = [];
let charactersString = "";
let characters = [];

function getLocalStorageItem(key) {
  return localStorage.getItem(key) || "";
}

const ids = getLocalStorageItem(idsKey);

// if (ids !== "") {
//   likesIds = ids.split(",");
//   console.log(likesIds);
// }

// like.addEventListener("click", () => {
//   changeLike();
// });

// function changeLike() {
//   like.innerHTML = `
//   <svg fill="#F50000" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
//   `;
// }

function cleanList() {
  charactersString = "";
}

function init() {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const { results } = response;

      characters = results;
      showItems();
    });
}

function getSingleCharacter(id) {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      cleanList();
      showSingerCharacter(response);
    });
}

function getCharactersByIds() {
  fetch(`https://rickandmortyapi.com/api/location/${likesIds.join()}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      charactersString = "";

      showItems(response);
    });
}

function likeAndDislike(id) {
  if (!likesIds.includes(String(id))) {
    likesIds.push(String(id));

    localStorage.setItem(idsKey, `${likesIds}`);
  } else {
    const ids = getLocalStorageItem(idsKey); // '1,2'

    likesIds = ids.split(",").filter((likeId) => {
      return likeId !== String(id);
    });

    localStorage.setItem(idsKey, `${likesIds}`);
  }
  cleanList();
  showItems();
}

function showSingerCharacter(character) {
  containerElement.innerHTML = `
  <button onclick="init()" class="go_back">
    <img src="/assets/images/arrow-left.png" alt="arrow-left">

    <span>Voltar</span>
  </button>

  <div class="card">
  <div class="card_content">
      <div class="card_image">
          <img class="image_avatar" src="${character.image}" alt="avatar">
      </div>

      <div class="card_infos">
          <div>
              <button onclick="getSingleCharacter(${character.id})" class="cart_title">${character.name}</button>

              <div>
                  <span class="card_type">${character.species}</span>
              </div>
          </div>

          <hr>

          <div>
              <div>
                  <span>Última localização conhecida:</span>
                  <span>${character.location.name}</span>
              </div>

              <div>
                  <span>Visto pela primeira vez em:</span>
                  <span>${character.location.name}</span>
              </div>
          </div>

      </div>

      <div class="like">

      </div>
  </div>
</div>
`;
}

function showItems() {
  for (let index = 0; index < characters.length; index++) {
    const isLiked = likesIds.includes(String(characters[index].id));

    const icon = isLiked
      ? `<svg fill="#B01212" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`
      : `<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>`;

    charactersString += `
        <div class="card">
        <div class="card_content">
            <div class="card_image">
                <img class="image_avatar" src="${characters[index].image}" alt="avatar">
            </div>

            <div class="card_infos">
                <div>
                    <button onclick="getSingleCharacter(${characters[index].id})" class="cart_title">${characters[index].name}</button>

                    <div>
                        <span class="card_type">${characters[index].species}</span>
                    </div>
                </div>

                <hr>

                <div>
                    <div>
                        <span>Última localização conhecida:</span>
                        <span>${characters[index].location.name}</span>
                    </div>

                    <div>
                        <span>Visto pela primeira vez em:</span>
                        <span>${characters[index].location.name}</span>
                    </div>
                </div>
                <button onclick="likeAndDislike(${characters[index].id})" class="like">
                 ${icon}
              </button>
            </div>

          
        </div>
    </div>
      `;
  }

  containerElement.innerHTML = `<div class="card_grid">${charactersString}</div>`;
}

init();
