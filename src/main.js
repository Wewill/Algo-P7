// Styles
import "./style.css";

// Data & filtered data
import { recipes } from "./data/recipes.js";
let filteredRecipes = {};

// Algorithme
import filterRecipes from "./algorithm/filterRecipes.js";

// Components
import { setFilters, renderFilters } from "./component/filters.js";
import { updateLabels } from "./component/labels.js";
import { card } from "./component/card.js";

// **** Set
// Selected search
let s = "";

// Store in window selected filters
window.__state = {
  ingredients: { s: "", selectedOptions: [], values: [], dropdownOpen: false },
  appliances: { s: "", selectedOptions: [], values: [], dropdownOpen: false },
  ustensils: { s: "", selectedOptions: [], values: [], dropdownOpen: false },
};

// Elements
const recipesElement = document.getElementById("recipes");
const counterElement = document.getElementById("counter");

// Search event
const searchElement = document.getElementById("search");
const resetSearchElement = document.getElementById("reset");
searchElement.addEventListener("input", (event) => {
  s = event.target.value || "";
  if (s !== "") resetSearchElement.classList.remove("hidden");
  else resetSearchElement.classList.add("hidden");
  console.log(`Pattern recherchée : ${s}`);
  // Filter & render
  filteredRecipes = filterRecipes(
    recipes,
    s,
    window.__state.ingredients.selectedOptions.map((option) => option.value),
    window.__state.appliances.selectedOptions.map((option) => option.value),
    window.__state.ustensils.selectedOptions.map((option) => option.value)
  );
  render();
});
resetSearchElement.addEventListener("click", () => {
  searchElement.value = s = "";
  resetSearchElement.classList.add("hidden");
  // Filter & render
  filteredRecipes = filterRecipes(
    recipes,
    s,
    window.__state.ingredients.selectedOptions.map((option) => option.value),
    window.__state.appliances.selectedOptions.map((option) => option.value),
    window.__state.ustensils.selectedOptions.map((option) => option.value)
  );
  render();
});

// Filters callback event
const onSelectFilters = () => {
  // Filter & render
  filteredRecipes = filterRecipes(
    recipes,
    s,
    window.__state.ingredients.selectedOptions.map((option) => option.value),
    window.__state.appliances.selectedOptions.map((option) => option.value),
    window.__state.ustensils.selectedOptions.map((option) => option.value)
  );
  render();
};

let previousLength = recipes.length;
function render() {
  // Update filters options
  renderFilters(filteredRecipes, onSelectFilters);

  // Update labels
  updateLabels(onSelectFilters);

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
setFilters();
// Init filtered recipes without filters
filteredRecipes = filterRecipes(recipes);
// First render
render();
