const queryInput = document.getElementById("query");
const searchButton = document.getElementById("search-btn");
const image = document.getElementById("image");
const nameHeading = document.getElementById("name");
const numberHeading = document.getElementById("number");
const heightParagraph = document.getElementById("height");
const weightParagraph = document.getElementById("weight");
const abilityParagraph = document.getElementById("ability");
const typeParagraph = document.getElementById("type");

const getPokemonData = (pokemonName) => {
  const cleanPokemonName = pokemonName.toLowerCase().trim();
  const errorElement = document.getElementById("error-message");
  hideElement(errorElement);

  if (cleanPokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${cleanPokemonName}`)
      .then(handleError)
      .then((response) => response.json())
      .then((pokemon) => updateData(pokemon))
      .catch((e) => showElement(errorElement));
  }
};

const handleError = (response) => {
  if (response.status == 404 || response.statusText == "Not Found") {
    throw Error();
  }
  return response;
};

const showElement = (element) => {
  if (element) {
    element.classList.remove("hidden");
    element.classList.add("show");
  }
};

const hideElement = (element) => {
  if (element) {
    element.classList.add("hidden");
    element.classList.remove("show");
  }
};

const getCapitalizedWord = (word) => {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return "";
};

const updateData = (pokemon) => {
  image.setAttribute("src", pokemon.sprites.other.dream_world.front_default);

  nameHeading.innerHTML = getCapitalizedWord(pokemon.name);
  typeParagraph.innerHTML = getCapitalizedWord(pokemon.types[0].type.name);
  weightParagraph.innerHTML = `${pokemon.weight / 8} kg`;

  if (pokemon.height >= 10) {
    heightParagraph.innerHTML = `${pokemon.height / 10} m`;
  } else {
    heightParagraph.innerHTML = `${pokemon.height * 10} cm`;
  }

  abilityParagraph.innerHTML = getCapitalizedWord(
    pokemon.abilities[0].ability.name
  );
  numberHeading.innerHTML = `N° ${pokemon.game_indices[3].game_index}`;
};

// Event Listeners

searchButton.addEventListener("click", () => getPokemonData(queryInput.value));

window.addEventListener("load", () => getPokemonData("pikachu"));

queryInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});
