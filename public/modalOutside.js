import { createFood, deleteMeal } from "./modalInside.js";
import { createFoodElement } from "./createFoodElement.js";

const addFoodButton = document.getElementById('add__food__btn');

const modalOpen = document.getElementById('input__button');
const foodPopUp = document.querySelector(".food__modal");
const popUpClose = document.querySelector(".modal__close");
const overlay = document.querySelector(".overlay");

const deleteBtn = document.getElementById("close__button");

//const inputBox = document.getElementsByClassName('input__box');


modalOpen.addEventListener('click', function() {

    foodPopUp.classList.remove("hidden");
    overlay.classList.remove("hidden");

});

function closeModal() {

    foodPopUp.classList.add("hidden");
    overlay.classList.add("hidden");
    document.getElementById('meal__components').innerHTML = "";

    console.log("typed meal in closeModal is: ", typedMeal);

}

let typedFood = "";
let typedAmt = "";
let typedMeal = "";

document.getElementById('meal__name__box').addEventListener('change', function() {

    typedMeal = this.value;
    console.log(typedMeal);

});

document.getElementById('amt__box').addEventListener('change', function() {

    typedAmt = this.value;
    console.log(typedAmt);

});

document.getElementById('food__box').addEventListener('change', function() {

    typedFood = this.value;
    console.log(typedFood);

});


let sendString = "";

//
//ADD TO MEAL BUTTON
//
document.getElementById('add__to__meal').addEventListener('click', () => {

    if (typedAmt === "" || typedFood === ""){

        console.log("here");
        alert("Please fill out both fields :)");
        
    }
    else { //PUT THIS SHIT IN A FUNCTION!!!!!!!

        sendString = typedAmt + " " + typedFood;
        console.log(sendString);

        createFood(sendString, typedMeal);

    }

});

//const foodContainer = document.getElementById('food__cards');

addFoodButton.addEventListener('click', function() { //need to find a way to NOT add a card if there's no input

    if (typedAmt === "" || typedFood === "" || typedMeal === ""){

        console.log("here");
        alert("Please fill out all fields :)");
        
    }
    // else if (totCarbs === 0 && totProt === 0 && totFiber === 0 && totFat === 0) {

    //     alert("Must add to meal first!");

    // }
    //change above code to look at the database meals totals!
    
    else { //PUT THIS SHIT IN A FUNCTION!!!!!!!

        //const foodCard = createFoodElement(typedMeal, totCarbs, totProt, totFat, totFiber);
        //document.getElementById('food__cards').appendChild(foodCard);
    
        closeModal();
        location.reload();

    }

    

}, false);

popUpClose.addEventListener('click', () => {
    
    closeModal();

});

deleteBtn.addEventListener('click', () => {
    
    deleteMeal(typedMeal);

});


//refactor this a  little: have the addFoodButton ONLY open the modal, and have the "confirm" button on the modal add the card
// if there's missing info, make a popup that says you have to fill everything in (which is just serving size and food)

