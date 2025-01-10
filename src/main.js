// Styles
import "./style.css";

// Data & filtered data
import { recipes } from "./data/recipes.js";
let filteredRecipes = {};

// Algorithme
import { filterRecipes } from "./algorithm/filterRecipes.js";

// Components
import { setFilters, renderFilters } from "./component/filters.js";
import { updateLabels } from "./component/labels.js";
import { card } from "./component/card.js";

// **** Set
// Selected values
let s = "";
let selectedIngredient = "";
let selectedAppliance = "";
let selectedUstensil = "";

const recipesElement = document.getElementById("recipes");
const counterElement = document.getElementById("counter");

// Search event
const searchElement = document.getElementById("search");
searchElement.addEventListener("input", (event) => {
  s = event.target.value || "";
  console.log(`Pattern recherchée : ${s}`);
  filteredRecipes = filterRecipes(
    recipes,
    s,
    selectedIngredient,
    selectedAppliance,
    selectedUstensil
  );
  render();
});

// Filters callback event
const onSelectFilters = (
  value = { ingredient: "", appliance: "", ustensil: "" }
) => {
  selectedIngredient = value.ingredient || "";
  selectedAppliance = value.appliance || "";
  selectedUstensil = value.ustensil || "";
  console.log(`Ingrédient sélectionné : ${selectedIngredient}`);
  console.log(`Appliance sélectionné : ${selectedAppliance}`);
  console.log(`Ustentile sélectionné : ${selectedUstensil}`);
  filteredRecipes = filterRecipes(
    recipes,
    s,
    selectedIngredient,
    selectedAppliance,
    selectedUstensil
  );
  render();
};

let previousLength = recipes.length;
function render() {
  // Update filters options
  renderFilters(filteredRecipes);

  // Update labels
  updateLabels(
    selectedIngredient,
    selectedAppliance,
    selectedUstensil,
    onSelectFilters
  );

  // Update counter
  counterElement.innerHTML = `${filteredRecipes.length} recettes`;
  if (previousLength != filteredRecipes.length) {
    counterElement.animate([{ color: "#fbbf24" }, { color: "#000" }], {
      duration: 800,
      iterations: 1,
    });
  }
  previousLength = filteredRecipes.length;

  // Update results
  recipesElement.innerHTML = `
  <section id="cards" class="grid grid-cols-3 grid-flow-row gap-10">
   ${filteredRecipes.map((r) => card(r)).join("")} 
  </section>
`;
}

// **** Run
// Set filters
setFilters(onSelectFilters);
// Init filtered recipes without filters
filteredRecipes = filterRecipes(recipes);
// First render
render();
