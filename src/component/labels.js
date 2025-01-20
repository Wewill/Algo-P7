function createLabel(id, value, onChangeCallback) {
  // Set label
  const labelElement = document.createElement("div");
  labelElement.classList =
    "label rounded-md bg-yellow-400 font-normal px-5 py-3 mr-4";

  let optionName =
    window.__state[`${id}s`].selectedOptions.find((o) =>
      o.value.includes(value)
    )?.name || "N/A";

  labelElement.innerHTML = optionName;
  labelElement.setAttribute("data-type", id);
  labelElement.setAttribute("data-value", value);

  const labelButtonElement = document.createElement("button");
  labelButtonElement.classList = "ml-8";
  labelButtonElement.innerHTML = "<i class='fa fa-close'>";

  // Callback event
  if (typeof onChangeCallback === "function") {
    labelButtonElement.addEventListener("click", (event) => {
      onChangeCallback(value);
      labelElement.remove();
    });
  }

  labelElement.appendChild(labelButtonElement);
  return labelElement;
}

export function updateLabels(ingredient, appliance, ustensil, onSelectFilters) {
  const labelsElement = document.getElementById("labels");

  if (ingredient) {
    // // Flush labels
    // document
    //   .querySelectorAll('[data-type="ingredient"]')
    //   .forEach((el) => el.remove());
    // Unset Ingredients
    const onIngredientsChange = (value) => {
      console.log(`Option dé-sélectionnée : ${value}`, window.__state);

      // Méthode A
      window.__state.ingredients.selectedOptions =
        window.__state.ingredients.selectedOptions.filter(
          (option) => option.value !== value
        );

      // Méthode B
      if (window.__state.ingredients.selectedOptions.indexOf(value) !== -1) {
        window.__state.ingredients.selectedOptions.splice(
          window.__state.ingredients.selectedOptions.indexOf(value),
          1
        );
      }

      onSelectFilters({
        ingredient: window.__state.ingredients.selectedOptions,
      });
    };
    const ingredientsLabel = createLabel(
      "ingredient",
      ingredient,
      onIngredientsChange
    );
    labelsElement.appendChild(ingredientsLabel);
  }

  if (appliance) {
    // Flush labels
    document
      .querySelectorAll('[data-type="appliance"]')
      .forEach((el) => el.remove());
    // Unset appliance
    const onAppliancesChange = (value) => {
      console.log(`Option dé-sélectionnée : ${value}`);
      onSelectFilters({ appliance: null });
    };
    const appliancesLabel = createLabel(
      "appliance",
      appliance,
      onAppliancesChange
    );
    labelsElement.appendChild(appliancesLabel);
  }

  if (ustensil) {
    // Flush labels
    document
      .querySelectorAll('[data-type="ustensil"]')
      .forEach((el) => el.remove());
    // Unset ustensil
    const onUstensilsChange = (value) => {
      console.log(`Option dé-sélectionnée : ${value}`);
      onSelectFilters({ ustensil: null });
    };
    const ustensilsLabel = createLabel("ustensil", ustensil, onUstensilsChange);
    labelsElement.appendChild(ustensilsLabel);
  }
}
