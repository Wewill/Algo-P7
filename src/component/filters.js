import { sanitize, capitalize } from "../helpers/helpers";

const selectNames = {
  ingredients: "Ingrédients",
  appliances: "Appareils",
  ustensils: "Ustensiles",
};

// Stocker dans window
window.__state = {
  ingredients: { s: "", selectedOptions: [], values: [], dropdownOpen: false },
  appliances: { s: "", selectedOptions: [], values: [], dropdownOpen: false },
  ustensils: { s: "", selectedOptions: [], values: [], dropdownOpen: false },
};

function createSelect(id) {
  // Select wrapper
  const selectElement = document.createElement("div");
  selectElement.id = id;
  selectElement.classList = "select wrapper mr-4";

  // Set label
  const selectLabelElement = document.createElement("label");
  selectLabelElement.innerHTML = selectNames[id];

  // Set button to open dropdown
  const selectButtonElement = document.createElement("button");
  selectButtonElement.id = "button_" + id;
  selectButtonElement.classList =
    "rounded-md p-3 h-50px border-none bg-yellow-400 pointer align-left relative";
  selectButtonElement.type = "button";
  selectButtonElement.ariaExpanded = window.__state[id].dropdownOpen;
  selectButtonElement.title = "Bouton pour ouvrir le menu déroulant";
  selectButtonElement.innerHTML =
    "<i class='fa-solid fa-chevron-up' aria-hidden='true'>OUVRIR / FERMER</i>";

  // Set dropdown wrapper
  const selectDropdownElement = document.createElement("div");
  selectDropdownElement.classList = "dropdown";
  selectDropdownElement.id = "dropdown_" + id;
  selectDropdownElement.classList = "hidden";

  // Set input search
  const selectSearchElement = document.createElement("input");
  selectSearchElement.classList = "search mr-4";
  selectSearchElement.name = selectNames[id];
  selectSearchElement.id = "search_" + id;
  selectSearchElement.placeholder = "Rechercher " + selectNames[id];

  // Set dropdown
  const selectListElement = document.createElement("ul");
  selectListElement.id = "list_" + id;
  selectListElement.role = "listbox";

  // Set dropdown events
  selectButtonElement.addEventListener("click", () => {
    window.__state[id].dropdownOpen = !window.__state[id].dropdownOpen;
    selectButtonElement.ariaExpanded = window.__state[id].dropdownOpen;
    selectButtonElement.innerHTML =
      "<i class='" +
      (window.__state[id].dropdownOpen
        ? "fa-solid fa-chevron-up"
        : "fa-solid fa-chevron-down") +
      "' aria-hidden='true'>OUVRIR / FERMER</i>";
    selectDropdownElement.classList = window.__state[id].dropdownOpen
      ? "block"
      : "hidden";
  });

  // Append to DOM
  selectElement.appendChild(selectLabelElement);
  selectElement.appendChild(selectButtonElement);

  selectDropdownElement.appendChild(selectSearchElement);
  selectDropdownElement.appendChild(selectListElement);
  selectElement.appendChild(selectDropdownElement);

  return selectElement;
}

function renderOptions(id, onChangeCallback) {
  const selectListElement = document.getElementById("list_" + id);
  const state = window.__state[id];

  // Filter values
  let filteredValues =
    state.s != ""
      ? state.values.filter((o) =>
          o.toLowerCase().includes(state.s.toLowerCase())
        )
      : state.values;
  console.log(
    "renderOptions as filtered ?",
    filteredValues.length,
    state.values.length
  );

  // Flush list options
  selectListElement.textContent = "";
  // Populate list options
  filteredValues.forEach((v) => {
    const optionLi = document.createElement("li");
    optionLi.setAttribute("data-value", sanitize(v));
    optionLi.setAttribute("data-name", capitalize(v));
    optionLi.id = sanitize(v);
    optionLi.innerHTML = capitalize(v);
    optionLi.classList = "p-3 border-b-1 border-b-black";
    // Select option
    optionLi.setAttribute(
      "data-selected",
      state.selectedOptions.includes(sanitize(v))
    );
    selectListElement.appendChild(optionLi);

    // Callback event
    if (typeof onChangeCallback === "function") {
      optionLi.addEventListener("click", (event) => {
        const value = optionLi.getAttribute("data-value");
        const name = optionLi.getAttribute("data-name");
        window.__state[id].selectedOptions.push({ value: value, name: name });
        onChangeCallback(value);
      });
    }
  });
}

export function setFilters() {
  const filtersElement = document.getElementById("filters");

  // Set Ingredients
  const ingredientsSelect = createSelect("ingredients");
  filtersElement.appendChild(ingredientsSelect);

  // Set Appliance
  const appliancesSelect = createSelect("appliances");
  filtersElement.appendChild(appliancesSelect);

  // Set ingredients
  const ustensilsSelect = createSelect("ustensils");
  filtersElement.appendChild(ustensilsSelect);
}

export function renderFilters(
  filterRecipes,
  selectedIngredient,
  selectedAppliance,
  selectedUstensil,
  onSelectFilters
) {
  // Méthode A =
  window.__state.ingredients.values = filterRecipes.reduce((acc, cur) => {
    cur.ingredients.forEach((i) => {
      if (
        i.ingredient &&
        !acc.includes(i.ingredient) &&
        !acc.map(sanitize).includes(sanitize(i.ingredient))
      ) {
        acc.push(i.ingredient);
      }
    });
    return acc;
  }, []);

  // Méthode B =
  // Issued because ingredient can be case sensitive as "Lait de coco" and "lait de Coco" and "lait de coco" as an unique ingredient
  // window.__state.ingredients.values = [
  //   ...new Set(
  //     filterRecipes
  //       .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
  //       .filter(Boolean)
  //   ),
  // ];
  window.__state.appliances.values = [
    ...new Set(filterRecipes.map((recipe) => recipe.appliance).filter(Boolean)),
  ];
  // Méthode A
  window.__state.ustensils.values = filterRecipes.reduce((acc, cur) => {
    cur.ustensils.forEach((u) => {
      if (u && !acc.includes(u) && !acc.map(sanitize).includes(sanitize(u))) {
        acc.push(u);
      }
    });
    return acc;
  }, []);

  // Méthode B
  // window.__state.ustensils.values = [
  //   ...new Set(
  //     filterRecipes.flatMap((recipe) => recipe.ustensils).filter(Boolean)
  //   ),
  // ];

  // A passer dans render + callback
  const onIngredientsChange = (value) => {
    console.log(`Ingredients sélectionnée : ${value}`);
    onSelectFilters({ ingredient: value });
  };

  const onAppliancesChange = (value) => {
    console.log(`Appliance sélectionnée : ${value}`);
    onSelectFilters({ appliance: value });
  };

  const onUstensilsChange = (value) => {
    console.log(`Ustensils sélectionnée : ${value}`);
    onSelectFilters({ ustensil: value });
  };

  // First render
  renderOptions("ingredients", onIngredientsChange);
  renderOptions("appliances", onAppliancesChange);
  renderOptions("ustensils", onUstensilsChange);

  // Search events
  // Search ingredients event
  document
    .getElementById("search_ingredients")
    .addEventListener("input", (event) => {
      window.__state.ingredients.s = event.target.value;
      console.log(
        "Search ingredients::",
        window.__state.ingredients.s,
        selectedIngredient
      );
      renderOptions("ingredients", onSelectFilters);
    });

  // Search appliances event
  document
    .getElementById("search_appliances")
    .addEventListener("input", (event) => {
      window.__state.appliances.s = event.target.value;
      console.log(
        "Search appliances::",
        window.__state.appliances.s,
        selectedAppliance
      );
      renderOptions("appliances", onSelectFilters);
    });

  // Search ustensils event
  document
    .getElementById("search_ustensils")
    .addEventListener("input", (event) => {
      window.__state.ustensils.s = event.target.value;
      console.log(
        "Search ustensils::",
        window.__state.ustensils.s,
        selectedUstensil
      );
      renderOptions("ustensils", onSelectFilters);
    });
}
