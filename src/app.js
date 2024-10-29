const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const type = document.getElementById("type");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const cleanData = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  type.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  spriteContainer.innerHTML = "";
};

const fetchData = async () => {
  const query = searchInput.value.toLowerCase().trim();

  try {
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/v2/pokemon/${query}`
    );
    if (!response.ok) throw new Error("Pokemon not found");
    const data = await response.json();

    pokemonName.textContent = `Name: ${data.name.toUpperCase()}`;
    pokemonId.textContent = `ID: #${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    hp.textContent = `HP: ${data.stats[0].base_stat}`;
    attack.textContent = `Attack: ${data.stats[1].base_stat}`;
    defense.textContent = `Defense: ${data.stats[2].base_stat}`;
    specialAttack.textContent = `Special Attack: ${data.stats[3].base_stat}`;
    specialDefense.textContent = `Special Defense: ${data.stats[4].base_stat}`;
    speed.textContent = `Speed: ${data.stats[5].base_stat}`;

    type.innerHTML = "";
    data.types.forEach(typeInfo => {
      const typeElement = document.createElement("p");
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      type.appendChild(typeElement);
    });

    const sprite = document.createElement("img");
    sprite.id = "sprite";
    sprite.src = data.sprites.front_default;
    sprite.alt = `${data.name} sprite`;
    spriteContainer.appendChild(sprite);
  } catch (error) {
    alert("Pokemon not found");
  }
};

searchBtn.addEventListener("click", fetchData);
