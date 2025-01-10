function ingredient(i) {
  return `<li>
            ${
              i.ingredient ? i.ingredient : ""
            } <span class="text-gray-500 block">
              ${i.quantity ? i.quantity : ""}${i.unit ? " " + i.unit : ""}
            </span>
          </li>`;
}

export function card(element) {
  return `
          <!-- begin:: Card -->
          <div class="card bg-white shadow-smooth rounded-2xl">
            <div class="card-header bg-cover bg-center h-[250px] rounded-t-2xl relative" 
            style="background-image: url('${"/recipes/" + element.image}')">
              <div class="badge rounded-full bg-yellow-400 font-light absolute px-3 py-1 top-6 right-6">${
                element.time
              }min</div>
            </div>
            <div class="card-content p-6">
              <h2 class="font-Anton text-xl tracking-wide mt-3 mb-6">
                ${element.name}
              </h2>

              <h6
                class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4"
              >
                Recette
              </h6>
              <p class="mb-8">
                ${element.description}
              </p>

              <h6
                class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4"
              >
                Ingrédients
              </h6>
              <ul class="grid grid-cols-2 gap-4">
                ${element.ingredients.map((i) => ingredient(i)).join("")}
              </ul>
            </div>
          </div>
          <!-- end:: Card -->
`;
}
