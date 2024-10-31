import Stylesheet from "./styles.css";

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const reset = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  types.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  spriteContainer.innerHTML = "";
};

const searchPokemon = async () => {
  try {
    const nameOrId = searchInput.value.toLowerCase().split("-");
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/v2/pokemon/${nameOrId}`
    );

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    // Reset previous content
    reset();

    // Update pokemon information
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Handle types
    data.types.forEach(typeInfo => {
      const typeElement = document.createElement("span");
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      types.appendChild(typeElement);
    });

    // Add sprite
    const sprite = document.createElement("img");
    sprite.id = "sprite";
    sprite.src = data.sprites.front_default;
    sprite.alt = data.name;
    spriteContainer.appendChild(sprite);
  } catch (err) {
    reset();
    alert("Pokémon not found");
  }
};

searchButton.addEventListener("click", searchPokemon);
