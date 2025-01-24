// Helpers
import { sanitize } from "./../helpers/helpers.js";

const filterRecipes_A = (
  recipes = [],
  s = "",
  ingredients = [],
  appliances = [],
  ustensils = []
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

    // Search for ingredients from select
    const ingredientsMatch = ingredients.length
      ? ingredients.every((ingredient) =>
          r.ingredients.some(
            (i) =>
              typeof i.ingredient === "string" &&
              sanitize(i.ingredient) === ingredient
          )
        )
      : true;

    // Search for appliances from select
    const appliancesMatch = appliances.length
      ? appliances.every(
          (appliance) =>
            typeof r.appliance === "string" &&
            sanitize(r.appliance) === appliance
        )
      : true;

    // Search for ustensils from select
    const ustensilsMatch = ustensils.length
      ? ustensils.every((ustensil) =>
          r.ustensils.some(
            (u) => typeof u === "string" && sanitize(u) === ustensil
          )
        )
      : true;

    // Keep or leave ?
    return nameMatch && ingredientsMatch && appliancesMatch && ustensilsMatch;
  });

  // Then, return
  // console.log(_filteredRecipes.length, recipes.length);
  return _filteredRecipes;
};

const filterRecipes_B = (
  recipes = [],
  s = "",
  ingredients = [],
  appliances = [],
  ustensils = []
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

    // Recherche des ingrédients dans le select
    const ingredientsMatch = ingredients.length
      ? ingredients.every((ingredient) =>
          r.ingredients.some(
            (i) =>
              typeof i.ingredient === "string" &&
              sanitize(i.ingredient) === ingredient
          )
        )
      : true;

    // Recherche des appareils dans le select
    const appliancesMatch = appliances.length
      ? appliances.every(
          (appliance) =>
            typeof r.appliance === "string" &&
            sanitize(r.appliance) === appliance
        )
      : true;

    // Recherche des ustensiles dans le select
    const ustensilsMatch = ustensils.length
      ? ustensils.every((ustensil) =>
          r.ustensils.some(
            (u) => typeof u === "string" && sanitize(u) === ustensil
          )
        )
      : true;

    // Si la recette correspond à tous les critères, on l'ajoute à filteredRecipes
    if (nameMatch && ingredientsMatch && appliancesMatch && ustensilsMatch) {
      _filteredRecipes.push(r);
    }
  }

  // Affichage du nombre de recettes filtrées
  // console.log(_filteredRecipes.length, recipes.length);
  return _filteredRecipes;
};

// Choose filtering method
const filterRecipes = filterRecipes_A;
//const filterRecipes = filterRecipes_B;

export default filterRecipes;
