// Styles
import "./style.css";

// Data
import { recipes } from "./data/recipes.js";
let filteredRecipes = {};

// Components
import { setFilters } from "./component/filters.js";
import { card } from "./component/card.js";

// Helpers
import { sanitize } from "./helpers/helpers.js";

// Algorithme

// Search event
const searchElement = document.getElementById("search");
searchElement.addEventListener("input", (event) =>
  filterRecipe(event.target.value || "")
);

// Functions >>> Sortir algo
function filterRecipe(s = "", ingredient = "", appliance = "", ustensil = "") {
  filteredRecipes = recipes.filter((r) => {
    // Sortir l'algo
    // Search for "s" in name and ingredients
    const nameMatch =
      typeof r.name === "string" &&
      (r.name.toLowerCase().includes(s.toLowerCase()) ||
        /*r.description.toLowerCase().includes(s.toLowerCase()) ||*/
        r.ingredients.some(
          (i) =>
            typeof i.ingredient === "string" &&
            i.ingredient.toLowerCase().includes(s.toLowerCase())
        ));

    const ingredientsMatch = ingredient
      ? r.ingredients.some(
          (i) =>
            typeof i.ingredient === "string" &&
            sanitize(i.ingredient) === ingredient
        )
      : true;

    const applianceMatch = appliance
      ? typeof r.appliance === "string" &&
        r.appliance.toLowerCase() === appliance.toLowerCase()
      : true;

    const ustensilsMatch = ustensil
      ? r.ustensils.some(
          (u) => typeof u === "string" && sanitize(u) === ustensil
        )
      : true;

    return nameMatch && ingredientsMatch && applianceMatch && ustensilsMatch;
  });

  // Then, render
  render();
  console.log(filteredRecipes.length, recipes.length);
}

const onSelectFilters = (value) => {
  console.log(`Ingredient sélectionné : ${value}`);
  filterRecipe("", value);
};

function render() {
  // Update counter
  document.querySelector(
    "#counter"
  ).innerHTML = `${filteredRecipes.length} recettes`;
  // Update results
  document.querySelector("#recipes").innerHTML = `
  <section id="cards" class="grid grid-cols-3 grid-flow-row gap-10">
   ${filteredRecipes.map((r) => card(r)).join("")} 
  </section>
`;
}

// First run
setFilters(recipes, onSelectFilters);
filterRecipe();

// > Sorti l'algo
