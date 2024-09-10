const pool = require('../db')
const queries = require('./queries');

//GETS//
const getMeals = (req, res) => {

    pool.query(queries.getMeals, (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);

    })

}

const getMealById = (req, res) => {

    const id = parseInt(req.params.id);

    pool.query(queries.getMealById, [id], (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);

    })
    
}

const getMealComponents = (req, res) => {

    const id = parseInt(req.params.id);

    pool.query(queries.getMealComponents, [id], (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);

    })
    
}

const getMealByName = (req, res) => {

    const meal_name = req.body.thisMeal;

    pool.query(queries.getMealByName, [meal_name], (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);

    })

}

const getMealId = (req, res) => {

    const meal_name = req.query.mealToUpdate;
    const date_added = req.query.today;
    console.log("made it to getmealid, meal name is: ", meal_name);

    pool.query(queries.getMealId, [meal_name, date_added], (error, results) => {

        if (!results.rows.length) {

            return;

        }

        if (error) throw error;
        res.status(200).json(results.rows[0].id);

    })

}

const getMealsByDate = (req, res) => {

    const date = req.query.date;

    pool.query(queries.getMealsByDate, [date], (error, results) => {

        if (error) throw error;
        res.status(200).json(results);

    })

}

//CREATES//
const createMeal = (req, res) => {

    const {meal_name, total_carbs, total_protein, total_fat, total_fiber} = req.body;

    pool.query(queries.createMeal, 
        [meal_name, total_carbs, total_protein, total_fat, total_fiber], 
        (error, results) => {

        if (error) throw error;
        res.status(201).send("success");
        console.log("meal created successfully!");
        //201 means something got created successfully

    })

}

const createEmptyMeal = (req, res) => {

    console.log("made it to empty meal");
    const meal_name = req.body.thisMeal;
    const date_added = req.body.today;
    console.log("meal name is: ", meal_name);

    pool.query(queries.getMealId, [meal_name, date_added], (error, results) => {

        if (results.rows.length) {

            return res.send("name already exists for this day")
            
        }

        pool.query(queries.createEmptyMeal, [meal_name], (error, results) =>{
    
            if (error) throw error;
            res.status(200).send("empty meal created!");
            console.log("empty meal created");
            
        })

    })

}

const createMealComponent = (req, res) => {

    const compName = req.body.compName;
    const carbs = req.body.carbs;
    const protein = req.body.protein;
    const fat = req.body.fat;
    const fiber = req.body.fiber;
    const compFK = req.body.compFK;

    pool.query(queries.createMealComponent,
        [compName, carbs, protein, fat, fiber, compFK], (error, results) => {

            if (error) throw error;
            res.status(201).send("meal component created!");
            
        }
    )

}

//DELETES//
const deleteMeal = (req, res) => {

    const id = req.query.mealId;

    pool.query(queries.getMealById, [id], (error, results) => {

        if (!results.rows.length) {

            return res.send("no meal with this ID exists");

        }

        pool.query(queries.deleteMeal, [id], (error, results) => {

            if (error) throw error;
            res.status(202).send("delete successful");
            console.log(`meal with id ${id} deleted`)

        })

    })

}

const updateMealTotals = (req, res) => {

    const id = req.body.id;
    const carbs = req.body.carbs;
    const protein = req.body.protein;
    const fat = req.body.fat;
    const fiber = req.body.fiber;


    pool.query(queries.getMealById, [id], (error, results) => {

        if (!results.rows.length) {

            return res.send("no meal with this ID exists");

        }

        //const {total_carbs, total_protein, total_fat, total_fiber} = req.body;

        pool.query(queries.updateMealTotals, [id, carbs, protein, fat, fiber], (error, results) => {

            if (error) throw error;
            res.status(200).json(results.rows);
            console.log(`meal with id ${id} updated`)

        })

    })

}

module.exports = {

    getMeals, 
    getMealComponents,
    getMealById,
    getMealByName,
    getMealId,
    getMealsByDate,

    createMeal,
    createEmptyMeal,
    createMealComponent,

    deleteMeal,

    updateMealTotals

}