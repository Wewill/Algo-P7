// Helpers
import { sanitize } from "./../helpers/helpers.js";

export function filterRecipes(
  recipes = {},
  s = "",
  ingredient = "",
  appliance = "",
  ustensil = ""
) {
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
}
