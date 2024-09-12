import {getFoodsByDate, functionDate} from "./dates.js";
import { Cat } from "./cats.js";

//ALL OF THESE ARE IN GRAMS! Since this program is just for me right now, these numbers are based on my own BMI/caloric needs
const GOAL_CARBS = 326;
const GOAL_PROTEIN = 46;
const GOAL_FAT = 73;
const GOAL_FIBER = 33;

let totCarbs = 0;
let totProt = 0;
let totFat = 0;
let totFiber = 0;

let percentCarbs = 0;
let percentProt = 0;
let percentFat = 0;
let percentFiber = 0;

document.addEventListener("DOMContentLoaded", async function() {

    //function to display totals based on date
    await updateTotals();
    calculatePercentages();
    displayGoals();

    displayCats();

})

async function updateTotals() {

    const foods = await getFoodsByDate(functionDate);

    for (var i = 0; i < foods.length; ++i){
        
        let food = foods[i];
        
        totCarbs += parseFloat(food.total_carbs);
        totProt += parseFloat(food.total_protein);
        totFat += parseFloat(food.total_fat);
        totFiber += parseFloat(food.total_fiber);

    }

}

function calculatePercentages() {

   //console.log("TODO: create function to calc % of goal met");
   percentCarbs = ((totCarbs / GOAL_CARBS) * 100).toFixed(0);
   percentProt = ((totProt / GOAL_PROTEIN) * 100).toFixed(0);
   percentFat = ((totFat / GOAL_FAT) * 100).toFixed(0);
   percentFiber = ((totFiber / GOAL_FIBER) * 100).toFixed(0);

}

function displayGoals() {

    //console.log("TODO: create function to display percentages and total/goal nutrition");
    document.getElementById('carbs__percentage').textContent = `${percentCarbs}%`;
    document.getElementById('carbs__amt__goal').textContent = `${totCarbs.toFixed(1)} / ${GOAL_CARBS}g`

    document.getElementById('protein__percentage').textContent = `${percentProt}%`;
    document.getElementById('protein__amt__goal').textContent = `${totProt.toFixed(1)} / ${GOAL_PROTEIN}g`

    document.getElementById('fat__percentage').textContent = `${percentFat}%`;
    document.getElementById('fat__amt__goal').textContent = `${totFat.toFixed(1)} / ${GOAL_FAT}g`

    document.getElementById('fiber__percentage').textContent = `${percentFiber}%`;
    document.getElementById('fiber__amt__goal').textContent = `${totFiber.toFixed(1)} / ${GOAL_FIBER}g`

}

function displayCats() {

    const greyCat = new Cat("grey");
    document.getElementById('carb__cat__img').innerHTML= `<img src= ${greyCat.getPath(percentCarbs)} class=\"cat__imgs\" id=\"carb__cat\" alt=\"carb cat\"></img>`;

    const orangeCat = new Cat("orange");
    document.getElementById('fat__cat__img').innerHTML = `<img src= ${orangeCat.getPath(percentFat)} class=\"cat__imgs\" id=\"fat__cat\" alt=\"fat cat\"></img>`;

   const calicoCat = new Cat("calico");
   document.getElementById('prot__cat__img').innerHTML = `<img src= ${calicoCat.getPath(percentProt)} class=\"cat__imgs\" id=\"prot__cat\" alt=\"protein cat\"></img>`;

   const whiteCat = new Cat("white");
   document.getElementById('fib__cat__img').innerHTML = `<img src= ${whiteCat.getPath(percentFiber)} class=\"cat__imgs\" id=\"fiber__cat\" alt=\"fiber cat\"></img>`;

}