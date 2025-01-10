// Helpers
import { sanitize } from "./../helpers/helpers.js";

const filterRecipes_A = (
  recipes = [],
  s = "",
  ingredient = "",
  appliance = "",
  ustensil = ""
) => {
  let _filteredRecipes = recipes.filter((r) => {
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

    // Search for ingredient from select
    const ingredientsMatch = ingredient
      ? r.ingredients.some(
          (i) =>
            typeof i.ingredient === "string" &&
            sanitize(i.ingredient) === ingredient
        )
      : true;

    // Search for appliance from select
    const applianceMatch = appliance
      ? typeof r.appliance === "string" && sanitize(r.appliance) === appliance
      : true;

    // Search for ustensil from select
    const ustensilsMatch = ustensil
      ? r.ustensils.some(
          (u) => typeof u === "string" && sanitize(u) === ustensil
        )
      : true;

    // Keep or leave ?
    return nameMatch && ingredientsMatch && applianceMatch && ustensilsMatch;
  });

  // Then, return
  console.log(_filteredRecipes.length, recipes.length);
  return _filteredRecipes;
};

const filterRecipes_B = (
  recipes = [],
  s = "",
  ingredient = "",
  appliance = "",
  ustensil = ""
) => {
  let _filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const r = recipes[i];

    // Recherche du terme "s" dans le nom et les ingrédients
    const nameMatch =
      typeof r.name === "string" &&
      (r.name.toLowerCase().includes(s.toLowerCase()) ||
        r.ingredients.some(
          (i) =>
            typeof i.ingredient === "string" &&
            i.ingredient.toLowerCase().includes(s.toLowerCase())
        ));

    // Recherche de l'ingrédient dans le select
    const ingredientsMatch = ingredient
      ? r.ingredients.some(
          (i) =>
            typeof i.ingredient === "string" &&
            sanitize(i.ingredient) === ingredient
        )
      : true;

    // Recherche de l'appareil dans le select
    const applianceMatch = appliance
      ? typeof r.appliance === "string" && sanitize(r.appliance) === appliance
      : true;

    // Recherche de l'ustensile dans le select
    const ustensilsMatch = ustensil
      ? r.ustensils.some(
          (u) => typeof u === "string" && sanitize(u) === ustensil
        )
      : true;

    // Si la recette correspond à tous les critères, on l'ajoute à filteredRecipes
    if (nameMatch && ingredientsMatch && applianceMatch && ustensilsMatch) {
      _filteredRecipes.push(r);
    }
  }

  // Affichage du nombre de recettes filtrées
  console.log(_filteredRecipes.length, recipes.length);
  return _filteredRecipes;
};

// Choose filtering method
// const filterRecipes = filterRecipes_A;
const filterRecipes = filterRecipes_B;

export default filterRecipes;
