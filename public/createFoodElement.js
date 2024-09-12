import { deleteMeal, deleteMealComponent } from "./modalInside.js";
export function createFoodElement(foodTitle, carbs, protein, fat, fiber, component) {

    let newFoodElement = document.createElement("div");
    newFoodElement.className = "food__element";

    let closeButton = document.createElement("button");
    closeButton.id = "close__button";
    closeButton.textContent = "\u00D7";

    let title = document.createElement("h3");
    title.className = "food__element__title";
    title.textContent = foodTitle;

    let nutritionInfo = document.createElement("p");
    nutritionInfo.className = "food__element__nutrition";
    nutritionInfo.textContent = `carb: ${carbs}g    prot: ${protein}g    fat: ${fat}g    fib: ${fiber}g`
    
    newFoodElement.appendChild(title);
    newFoodElement.appendChild(closeButton);

    closeButton.addEventListener('click', async function() {
    
        // if (component) {

        //     deleteMealComponent()

        // }
        await deleteMeal(foodTitle);
        location.reload();
    
    });

    newFoodElement.appendChild(nutritionInfo);

    return newFoodElement;

}