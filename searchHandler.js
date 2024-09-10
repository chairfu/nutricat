const axios = require('axios');

const APP_KEY = "47d6f560640457daf5062b45991b3303";
const APP_ID = "42dd1c7f";

axios.defaults.headers.common['x-app-id'] = APP_ID;
axios.defaults.headers.common['x-app-key'] = APP_KEY;

const handleSearch = async (toSearch) => {

    console.log("made it to handleSearch");
    const options = {

        method: 'POST',
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        headers: {
        'Content-Type': 'application/json',
        'x-app-id': APP_ID,
        'x-app-key': APP_KEY
    },
    data: {
        query: toSearch,
        
    }

    }

    try {

        const response = await axios(options)
        if (response.data.foods) {

            console.log("api call successful");
            return response.data;

        }

    } catch (error) {

        console.log(error);
        throw new Error("api call unsuccessful");

    }

}

module.exports = handleSearch