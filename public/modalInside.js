import { Food } from "./food.js";
import { createFoodElement } from "./createFoodElement.js";
import { functionDate } from "./dates.js";

export async function createFood(sendString, typedMeal) {

    await addEmptyMealDb(typedMeal);
    let foodToAdd = new Food();

    //need to keep food operations in here because that's when we know the data actually got received
    foodToAdd.fetchData(sendString)
        .then (()=> {

            console.log("MADE IT");
            console.log("foodToAdd carbs: ", foodToAdd.carbs);
            //make a cutesy function to update ui elements

            createMealComponent(foodToAdd, typedMeal, sendString);
            //updateMealTotals(foodToAdd,);

            //displayMealComponent
            
            //REFACTOR AFTER DATABASE SETUP
            const foodElement = createFoodElement(sendString, foodToAdd.carbs, foodToAdd.protein, foodToAdd.fat, foodToAdd.fiber, true);
            document.getElementById("meal__components").appendChild(foodElement);


        })
        .catch (error => {

            console.error("bad response", error);

        })

}

async function addEmptyMealDb(typedMeal) {

    const thisMeal = typedMeal;
    const today = functionDate;

    //create an empty meal in database
    try {

        const response = await axios.post(`http://localhost:3000/api/v1/database`, {thisMeal: thisMeal, today: today});
        console.log("empty meal created: ", response.data)
        
    } catch (error) {

        console.error("problem creating empty meal", error)
        
    }

}

//move out of this file later
export async function getMealId (typedMeal) {

    const today = functionDate;
    console.log("functionDate in getMealId is: ", functionDate);

    const mealToUpdate = typedMeal;
    let mealId = null;
    console.log("mealToUpdate is: ", mealToUpdate);

    //this is really gross split into diff functions later
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/database/getid`,{
            params: {mealToUpdate: mealToUpdate, today: today}}
        );
        console.log("meal id: ", response.data)
        mealId = response.data
        
    } catch (error) {

        console.error("problem getting mealId", error)
        
    }

    console.log("meal id outside: ", mealId)

    return mealId;

}

async function createMealComponent(foodToAdd, typedMeal, sendString) {

    const mealId = await getMealId(typedMeal);

    try {

        const response = await axios.post(`http://localhost:3000/api/v1/database/meal_comp/add`,
                {compName: sendString,
                 carbs: foodToAdd.carbs, 
                 protein: foodToAdd.protein, 
                 fat: foodToAdd.fat, 
                 fiber: foodToAdd.fiber, 
                 compFK: mealId}
                );
            console.log("meal component created on frontend");
        
    } catch (error) {
        
        console.error("problem adding meal component", error);

    }

    //update totals, move into separate function later
    try {

        const response = await axios.put(`http://localhost:3000/api/v1/database/`,
            {id: mealId,
             carbs: foodToAdd.carbs, 
             protein: foodToAdd.protein, 
             fat: foodToAdd.fat, 
             fiber: foodToAdd.fiber, 
            });
        
    } catch (error) {

        console.error("problem updating totals", error);
        
    }

}

//move out of this file as well (because we'll be using it for the displayed meals as well)
export async function deleteMeal(typedMeal) {

    const mealId = await getMealId(typedMeal);

    if (mealId){

        console.log("TRYING TO CALL AXIOS TO DELETE");
        try {

            await axios.delete(`http://localhost:3000/api/v1/database`, 
                {params: {mealId: mealId}})
            console.log("meal and its components have been deleted");
            
        } catch (error) {

            console.error("problem deleting meal", error);
            
        }
        
    }

}

export async function deleteMealComponent(typedMeal, component) {

    const compFk = await getMealId(typedMeal);

    try {

        await axios.delete(`http://localhost:3000/api/v1/database`, 
            {params: {compFk: compFk, component: component}})
        console.log("meal component deleted")
        
    } catch (error) {

        console.error("problem deleting meal component")
        
    }

}


//this file should have totals for ONLY THE MEAL BEING ADDED, then those totals get added to the granddd total