
export class Food {

    constructor() {

        this.name = "";
        this.carbs = 0;
        this.protein = 0;
        this.fat = 0;
        this.fiber = 0;

    }

    setNutrition(data) {

        this.name = data.food_name;
        this.carbs = data.nf_total_carbohydrate;
        this.protein = data.nf_protein;
        this.fat = data.nf_total_fat;
        this.fiber = data.nf_dietary_fiber;

    }

    fetchData = async function(sendString) {
        try {
    
            const response = await axios.get(`http://localhost:3000/api/getnutrition?toSearch=${sendString}`);
            const data = response.data.foods[0];
            console.log('data got: ', data);
    
            //the problem before was that fetchData wouldn't resolve before returning, so food didn't get updated
            //fix this by using await, so the we only return after the promise is resolved!
            this.setNutrition(data);
    
        } catch(error) {
    
            console.error('data not got :(', error);
            throw error;
    
        }
    
    }

}













