function createLabel(id, value, onChangeCallback) {
  // Set label
  const labelElement = document.createElement("div");
  labelElement.classList =
    "label rounded-md bg-yellow-400 font-light px-3 py-1 mr-4";
  labelElement.innerHTML = "value : " + value;
  labelElement.setAttribute("data-type", id);

  const labelButtonElement = document.createElement("button");
  labelButtonElement.innerHTML = "X";

  // Callback event
  if (typeof onChangeCallback === "function") {
    labelButtonElement.addEventListener("click", (event) => {
      onChangeCallback(event.target.value);
      labelElement.remove();
    });
  }

  labelElement.appendChild(labelButtonElement);
  return labelElement;
}

export function updateLabels(ingredient, appliance, ustensil, onSelectFilters) {
  const labelsElement = document.getElementById("labels");

  if (ingredient) {
    // Flush labels
    document
      .querySelectorAll('[data-type="ingredient"]')
      .forEach((el) => el.remove());
    // Unset Ingredients
    const onIngredientsChange = (value) => {
      console.log(`Option dé-sélectionnée : ${value}`);
      onSelectFilters({ ingredient: null });
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
