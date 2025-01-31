import { sanitize, capitalize, safe } from "../helpers/helpers";

const selectNames = {
  ingredients: "Ingrédients",
  appliances: "Appareils",
  ustensils: "Ustensiles",
};

function createSelect(id) {
  // Select wrapper
  const selectElement = document.createElement("div");
  selectElement.id = id;
  selectElement.classList = "h-[50px] w-[195px] cursor-pointer relative z-10";

  // Set button to open dropdown
  const selectButtonElement = document.createElement("button");
  selectButtonElement.id = "button_" + id;
  selectButtonElement.type = "button";
  selectButtonElement.ariaExpanded = window.__state[id].dropdownOpen;
  selectButtonElement.title = "Bouton pour ouvrir le menu déroulant";
  let buttonClass =
    " p-3 h-[50px] border-none bg-white cursor-pointer align-left block w-full flex justify-between items-center";
  selectButtonElement.classList =
    (window.__state[id].dropdownOpen ? "rounded-t-md" : "rounded-md") +
    buttonClass;

  // Set label
  const selectButtonLabelElement = document.createElement("label");
  selectButtonLabelElement.innerHTML = selectNames[id];

  // Set Icon
  const selectButtonIconElement = document.createElement("i");
  let iconClass = " fa-solid";
  selectButtonIconElement.classList =
    (window.__state[id].dropdownOpen ? "fa-chevron-up" : "fa-chevron-down") +
    iconClass;
  selectButtonIconElement.setAttribute("aria-hidden", "true");

  selectButtonElement.appendChild(selectButtonLabelElement);
  selectButtonElement.appendChild(selectButtonIconElement);

  // Set dropdown wrapper
  const selectDropdownElement = document.createElement("div");
  selectDropdownElement.id = "dropdown_" + id;
  let dropdownClass =
    " shadow-md rounded-b-md bg-white absolute top-0 left-0 mt-[50px] w-[195px] flex flex-col max-h-[300px] overflow-x-scroll";
  selectDropdownElement.classList =
    (window.__state[id].dropdownOpen ? "block" : "hidden") + dropdownClass;

  // Set input search
  const selectLabelSearchElement = document.createElement("label");
  selectLabelSearchElement.classList = "flex m-4 mt-2 bg-red relative";

  const selectSearchElement = document.createElement("input");
  selectSearchElement.name = selectNames[id];
  selectSearchElement.id = "search_" + id;
  selectSearchElement.placeholder = "Filtrer..."; // + selectNames[id];
  selectSearchElement.classList =
    "rounded-sm border-zinc-300 border p-1 w-full";

  const selectSubmitSearchElement = document.createElement("div");
  selectSubmitSearchElement.id = "submit_search_" + id;
  selectSubmitSearchElement.classList =
    "absolute right-2 top-1 text-zinc-300 hover:text-black";
  selectSubmitSearchElement.innerHTML = "<i class='fa fa-search'></i>";

  const selectResetSearchElement = document.createElement("button");
  selectResetSearchElement.id = "submit_search_" + id;
  selectResetSearchElement.classList =
    "-hidden absolute right-2 top-1 bg-green mr-6 text-zinc-300 hover:text-black";
  selectResetSearchElement.innerHTML = "<i class='fa fa-close'></i>";

  selectResetSearchElement.addEventListener("click", () => {
    selectSearchElement.value = "";
    window.__state[id].s = "";
    renderOptions(id);
  });

  selectLabelSearchElement.appendChild(selectSearchElement);
  selectLabelSearchElement.appendChild(selectSubmitSearchElement);
  selectLabelSearchElement.appendChild(selectResetSearchElement);

  // Set dropdown
  const selectListElement = document.createElement("ul");
  selectListElement.id = "list_" + id;
  selectListElement.role = "listbox";
  selectListElement.classList = "rounded-md border-none bg-white";

  function toggleDropdown(id) {
    // Button
    selectButtonElement.ariaExpanded = window.__state[id].dropdownOpen;
    selectButtonElement.classList =
      (window.__state[id].dropdownOpen ? "rounded-t-md" : "rounded-md") +
      buttonClass;
    // Button icon
    selectButtonIconElement.classList =
      (window.__state[id].dropdownOpen ? "fa-chevron-up" : "fa-chevron-down") +
      iconClass;
    // Dropdown
    selectDropdownElement.classList =
      (window.__state[id].dropdownOpen ? "block" : "hidden") + dropdownClass;
  }

  // Set dropdown events
  selectButtonElement.addEventListener("click", () => {
    window.__state[id].dropdownOpen = !window.__state[id].dropdownOpen;
    toggleDropdown(id);
  });

  // Close dropdowns select on click outside
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest("button") &&
      !event.target.closest("input")?.id.includes("search_")
    ) {
      window.__state[id].dropdownOpen = false;
    }
    toggleDropdown(id);
  });

  // Append to DOM
  selectDropdownElement.appendChild(selectLabelSearchElement);
  selectDropdownElement.appendChild(selectListElement);

  selectElement.appendChild(selectButtonElement);
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
  // Flush list options
  selectListElement.textContent = "";
  // Populate list options
  let selectedOptions = [];
  let unselectedOptions = [];
  filteredValues.forEach((v) => {
    const optionLi = document.createElement("li");
    optionLi.setAttribute("data-value", sanitize(v));
    optionLi.setAttribute("data-name", capitalize(v));
    optionLi.id = sanitize(v);
    optionLi.innerHTML = capitalize(v);
    optionLi.classList =
      "py-2 px-4 border-b-1 border-b-black text-sm flex flex-row justify-between items-center cursor-pointer";

    // Select option
    optionLi.setAttribute(
      "data-selected",
      state.selectedOptions.some((option) => option.value === sanitize(v))
    );

    // Highlight selected option
    if (state.selectedOptions.some((option) => option.value === sanitize(v))) {
      optionLi.classList += " bg-yellow-400";

      const removeButton = document.createElement("button");
      removeButton.classList =
        "text-yellow-400 rounded-full bg-black w-4 h-4 p-0 m-0 flex flex-row justify-center items-center";
      removeButton.innerHTML = "<i class='fa fa-close text-xs'></i>";
      removeButton.addEventListener("click", (event) => {});
      optionLi.appendChild(removeButton);

      selectedOptions.push(optionLi);
    } else {
      unselectedOptions.push(optionLi);
    }

    // Callback event
    if (typeof onChangeCallback === "function") {
      optionLi.addEventListener("click", (event) => {
        const value = optionLi.getAttribute("data-value");
        const name = optionLi.getAttribute("data-name");
        // Add unique selected option or remove it
        if (
          !window.__state[id].selectedOptions.some(
            (option) => option.value === value
          )
        ) {
          // Add selected option
          window.__state[id].selectedOptions.push({ value: value, name: name });
          onChangeCallback(value);
        } else {
          // Remove selected option
          window.__state[id].selectedOptions = window.__state[
            id
          ].selectedOptions.filter((option) => option.value !== value);
          onChangeCallback(value);
        }
      });
    }
  });

  // Then, append to DOM
  // Append selected options first
  selectedOptions.forEach((option) => selectListElement.appendChild(option));
  // Append unselected options
  unselectedOptions.forEach((option) => selectListElement.appendChild(option));
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

export function renderFilters(filteredRecipes, onSelectFilters) {
  //**** Ingredients */
  // Méthode A =
  window.__state.ingredients.values = filteredRecipes.reduce((acc, cur) => {
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
  //     filteredRecipes
  //       .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
  //       .filter(Boolean)
  //   ),
  // ];

  //**** Appliances */
  window.__state.appliances.values = [
    ...new Set(
      filteredRecipes.map((recipe) => recipe.appliance).filter(Boolean)
    ),
  ];

  //**** Ustensils */
  // Méthode A
  window.__state.ustensils.values = filteredRecipes.reduce((acc, cur) => {
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
  //     filteredRecipes.flatMap((recipe) => recipe.ustensils).filter(Boolean)
  //   ),
  // ];

  // First render options
  renderOptions("ingredients", onSelectFilters);
  renderOptions("appliances", onSelectFilters);
  renderOptions("ustensils", onSelectFilters);

  // Search events, trigger search and re-render options
  // Search ingredients event
  document
    .getElementById("search_ingredients")
    .addEventListener("input", (event) => {
      // Clean value to prevent XSS
      window.__state.ingredients.s = safe(event.target.value) || "";
      renderOptions("ingredients", onSelectFilters);
    });

  // Search appliances event
  document
    .getElementById("search_appliances")
    .addEventListener("input", (event) => {
      // Clean value to prevent XSS
      window.__state.appliances.s = safe(event.target.value) || "";
      renderOptions("appliances", onSelectFilters);
    });

  // Search ustensils event
  document
    .getElementById("search_ustensils")
    .addEventListener("input", (event) => {
      // Clean value to prevent XSS
      window.__state.ustensils.s = safe(event.target.value) || "";
      renderOptions("ustensils", onSelectFilters);
    });
}
