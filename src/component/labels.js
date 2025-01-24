function createLabel(id, value, onChangeCallback) {
  // Set label
  const labelElement = document.createElement("div");
  labelElement.classList =
    "label rounded-md bg-yellow-400 font-normal px-5 py-3 mr-4 cursor-pointer";

  // Get option name
  let optionName =
    window.__state[`${id}s`].selectedOptions.find((o) =>
      o.value.includes(value)
    )?.name || "N/A";

  labelElement.innerHTML = optionName;
  labelElement.setAttribute("data-type", id);
  labelElement.setAttribute("data-value", value);

  // Set label close button
  const labelButtonElement = document.createElement("button");
  labelButtonElement.classList = "ml-8";
  labelButtonElement.innerHTML =
    "<i class='fa fa-close' aria-hidden='true'></i>";

  // Callback event
  if (typeof onChangeCallback === "function") {
    labelElement.addEventListener("click", () => {
      onChangeCallback(value);
      labelElement.remove();
    });
  }

  labelElement.appendChild(labelButtonElement);
  return labelElement;
}

export function updateLabels(onSelectFilters) {
  const labelsElement = document.getElementById("labels");

  // Flush labels
  labelsElement.innerHTML = "";

  //**** Ingredients */
  window.__state.ingredients.selectedOptions.forEach((ingredient) => {
    const onIngredientsChange = (value) => {
      window.__state.ingredients.selectedOptions =
        window.__state.ingredients.selectedOptions.filter(
          (option) => option.value !== value
        );

      onSelectFilters();
    };
    const ingredientsLabel = createLabel(
      "ingredient",
      ingredient.value,
      onIngredientsChange
    );
    labelsElement.appendChild(ingredientsLabel);
  });

  //**** Appliances */
  window.__state.appliances.selectedOptions.forEach((appliance) => {
    const onAppliancesChange = (value) => {
      window.__state.appliances.selectedOptions =
        window.__state.appliances.selectedOptions.filter(
          (option) => option.value !== value
        );

      onSelectFilters();
    };
    const appliancesLabel = createLabel(
      "appliance",
      appliance.value,
      onAppliancesChange
    );
    labelsElement.appendChild(appliancesLabel);
  });

  //**** Ustensils */
  window.__state.ustensils.selectedOptions.forEach((ustensil) => {
    const onUstensilsChange = (value) => {
      window.__state.ustensils.selectedOptions =
        window.__state.ustensils.selectedOptions.filter(
          (option) => option.value !== value
        );

      onSelectFilters();
    };
    const ustensilsLabel = createLabel(
      "ustensil",
      ustensil.value,
      onUstensilsChange
    );
    labelsElement.appendChild(ustensilsLabel);
  });
}
