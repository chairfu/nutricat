import { createFoodElement } from "./createFoodElement.js";

let day = new Date();
let formattedDate = day.toLocaleDateString('en-US');
export let functionDate = day.toLocaleDateString('en-ZA');
document.getElementById("date").innerHTML = formattedDate;


document.addEventListener("DOMContentLoaded", function() {

    console.log("window loaded :)")
    displayFoodByDate(functionDate);
    //call function to get the data for today's date

})

export async function getFoodsByDate(functionDate) {

    try {

        const response = await axios.get(`http://localhost:3000/api/v1/database/gbd`, {
            params : {date : functionDate}});
        
        return response.data.rows;
        
    } catch (error) {

        console.error('problems getting meal by dates', error)
        
    }
    
}

async function displayFoodByDate(functionDate) {

    const foods = await getFoodsByDate(functionDate);
    
    for (var i = 0; i < foods.length; ++i){
        
        let food = foods[i];
        console.log(food);
        //call create food element
        const mealCard = createFoodElement(food.meal_name, food.total_carbs, food.total_protein, food.total_fat, food.total_fiber);
        document.getElementById('food__cards').appendChild(mealCard);

    }

}




