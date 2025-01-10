import { sanitize } from "../helpers/helpers";

function createSelect(id, name, values, onChangeCallback) {
  const selectElement = document.createElement("select");
  selectElement.name = name;
  selectElement.id = id;

  // Default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "— " + name;
  selectElement.appendChild(defaultOption);

  values.forEach((v) => {
    const option = document.createElement("option");
    option.value = sanitize(v);
    option.textContent = v;
    selectElement.appendChild(option);
  });

  if (typeof onChangeCallback === "function") {
    selectElement.addEventListener("change", (event) => {
      onChangeCallback(event.target.value);
    });
  }
  return selectElement;
}

// Voir si fct setup + render

export function setFilters(recipes, onSelectFilters) {
  // Set filters
  // Faire un helper = unique qui prends un [] ou un [{}]
  // Méthode A =
  // ${
  //   recipes.reduce((acc, cur) => {
  //     if (cur.appliance && !acc.includes(cur.appliance)) {
  //       acc.push(cur.appliance);
  //     }
  //     return acc;
  //   }, []).length
  // }
  // Méthode B =
  const ingredients = [
    ...new Set(
      recipes
        .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
        .filter(Boolean)
    ),
  ];
  // const appliances = [
  //   ...new Set(recipes.map((recipe) => recipe.appliance).filter(Boolean)),
  // ];
  // const ustensils = [
  //   ...new Set(recipes.flatMap((recipe) => recipe.ustensils).filter(Boolean)),
  // ];

  const onIngredientsChange = (value) => {
    console.log(`Option sélectionnée : ${value}`);
    onSelectFilters(value);
  };

  const ingredientsSelect = createSelect(
    "ingredients",
    "Ingrédients",
    ingredients,
    onIngredientsChange
  );
  document.getElementById("filters").appendChild(ingredientsSelect);
}
