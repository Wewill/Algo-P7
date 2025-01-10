import { sanitize, capitalize } from "../helpers/helpers";

const selectNames = {
  ingredients: "Ingrédients",
  appliances: "Appareils",
  ustensils: "Ustensiles",
};

function createSelect(id, onChangeCallback) {
  // Set select
  const selectElement = document.createElement("select");
  selectElement.classList = "select mr-4";
  selectElement.name = selectNames[id];
  selectElement.id = id;

  // Callback event
  if (typeof onChangeCallback === "function") {
    selectElement.addEventListener("change", (event) => {
      onChangeCallback(event.target.value);
    });
  }
  return selectElement;
}

function createOptions(id, values, selectedOption) {
  const selectElement = document.getElementById(id);
  // Flush options
  selectElement.options.length = 0;

  // Set default
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = selectNames[id];
  selectElement.appendChild(defaultOption);

  // Set options
  values.forEach((v) => {
    const option = document.createElement("option");
    option.value = sanitize(v);
    option.textContent = capitalize(v);
    selectElement.appendChild(option);
  });

  // Select option
  selectElement.value = selectedOption || "";
}

export function setFilters(onSelectFilters) {
  const filtersElement = document.getElementById("filters");

  // Set Ingredients
  const onIngredientsChange = (value) => {
    console.log(`Option sélectionnée : ${value}`);
    onSelectFilters({ ingredient: value });
  };
  const ingredientsSelect = createSelect("ingredients", onIngredientsChange);
  filtersElement.appendChild(ingredientsSelect);

  // Set Appliance
  const onAppliancesChange = (value) => {
    console.log(`Option sélectionnée : ${value}`);
    onSelectFilters({ appliance: value });
  };
  const appliancesSelect = createSelect("appliances", onAppliancesChange);
  filtersElement.appendChild(appliancesSelect);

  // Set ingredients
  const onUstensilsChange = (value) => {
    console.log(`Option sélectionnée : ${value}`);
    onSelectFilters({ ustensil: value });
  };
  const ustensilsSelect = createSelect("ustensils", onUstensilsChange);
  filtersElement.appendChild(ustensilsSelect);
}

export function renderFilters(
  filterRecipes,
  selectedIngredient,
  selectedAppliance,
  selectedUstensil
) {
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
      filterRecipes
        .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
        .filter(Boolean)
    ),
  ];
  const appliances = [
    ...new Set(filterRecipes.map((recipe) => recipe.appliance).filter(Boolean)),
  ];
  const ustensils = [
    ...new Set(
      filterRecipes.flatMap((recipe) => recipe.ustensils).filter(Boolean)
    ),
  ];

  createOptions("ingredients", ingredients, selectedIngredient);
  createOptions("appliances", appliances, selectedAppliance);
  createOptions("ustensils", ustensils, selectedUstensil);
}
