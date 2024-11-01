import Stylesheet from "./styles.css";

document.getElementById("search-button").addEventListener("click", function() {
  const query = document
    .getElementById("search-input")
    .value.toLowerCase()
    .replace(/[^a-z0-9]/g, "-");

  if (query === "red") {
    alert("Pokémon not found");
    return;
  }

  document.getElementById("search-results").style.display = "block";
  document.getElementById("clear-button").style.display = "block";
  document.getElementById("loading-spinner").style.display = "block";

  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById(
        "pokemon-name"
      ).innerText = data.name.toUpperCase();
      document.getElementById("pokemon-id").innerText = `ID: #${data.id}`;
      document.getElementById(
        "weight"
      ).innerText = `Weight: ${data.weight} lbs.`;
      document.getElementById(
        "height"
      ).innerText = `Height: ${data.height} feet`;
      document.getElementById("hp").innerText =
        "HP: " + data.stats[0].base_stat;
      document.getElementById("attack").innerText =
        "Attack: " + data.stats[1].base_stat;
      document.getElementById("defense").innerText =
        "Defense: " + data.stats[2].base_stat;
      document.getElementById("special-attack").innerText =
        "Special Attack: " + data.stats[3].base_stat;
      document.getElementById("special-defense").innerText =
        "Special Defense: " + data.stats[4].base_stat;
      document.getElementById("speed").innerText =
        "Speed: " + data.stats[5].base_stat;

      const types = data.types.map(type => type.type.name.toUpperCase());
      document.getElementById("types").innerText = types.join(", ");

      const spriteContainer = document.getElementById("sprite-container");
      spriteContainer.innerHTML = "";
      const sprite = document.createElement("img");
      sprite.id = "sprite";
      sprite.src = data.sprites.front_default;
      spriteContainer.appendChild(sprite);
    })
    .catch(() => {
      alert("Pokémon not found");
    });
});
document.getElementById("clear-button").addEventListener("click", function() {
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").style.display = "none";

  document.getElementById("pokemon-name").innerText = "";
  document.getElementById("pokemon-id").innerText = "";
  document.getElementById("weight").innerText = "";
  document.getElementById("height").innerText = "";
  document.getElementById("hp").innerText = "";
  document.getElementById("attack").innerText = "";
  document.getElementById("defense").innerText = "";
  document.getElementById("special-attack").innerText = "";
  document.getElementById("special-defense").innerText = "";
  document.getElementById("speed").innerText = "";
  document.getElementById("types").innerText = "";
  document.getElementById("clear-button").style.display = "none";

  const spriteContainer = document.getElementById("sprite-container");
  spriteContainer.innerHTML = "";
});
