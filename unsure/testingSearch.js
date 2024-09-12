const axios = require('axios');

const APP_KEY = "47d6f560640457daf5062b45991b3303";
const APP_ID = "42dd1c7f";

const url = '';

axios.defaults.headers.common['x-app-id'] = APP_ID;
axios.defaults.headers.common['x-app-key'] = APP_KEY;

let typedFood = "apple";

class Food {

    constructor(carbs, protein, fat, fiber) {

        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
        this.fiber = fiber;

    }

}


handleSearch = () => {

    const options = {

        method: 'POST',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
        'Content-Type': 'application/json',
        'x-app-id': APP_ID,
        'x-app-key': APP_KEY
    },
    data: {
        query: typedFood,
        
    }

    }

    let exampleCalorie = 0;

    axios(options)
    .then((response) => {
        //update results somehow
        console.log(response.data);
        if (response.data.foods){
            result = response.data.foods[0];
            food = new Food(result.nf_total_carbohydrates, result.nf_protein, result.nf_total_fat, result.nf_dietary_fiber);
            console.log(food.fat)
        }
    })
    .catch((error) => {

        console.log(error)

    })

}

// const foodTest = ["apple", "orange", "banana"];

//api only creates an array if we set line_deliniate or whatever to true, so we're good to stick to one food at a time and use food[0]
// foodTest.forEach(element => {
    
//     typedFood = `${element}`;
handleSearch();

// });

//axios is making headers automatically included, so no need to add them manually

