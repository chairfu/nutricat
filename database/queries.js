const getMeals = "SELECT * FROM meal_totals";
const getMealComponents = "SELECT DISTINCT mc.* FROM meal_components AS mc JOIN meal_totals AS mt ON $1 = mc.meal_totals_id"
const getMealById = "SELECT * FROM meal_totals WHERE id = $1"
const getMealByName = "SELECT * FROM meal_totals WHERE meal_name = $1"
const getMealId = "SELECT id FROM meal_totals WHERE meal_name = $1 AND date_added = $2"
const getMealsByDate = "SELECT * FROM meal_totals WHERE date_added = $1"

const createMeal = "INSERT INTO meal_totals (meal_name, total_carbs, total_protein, total_fat, total_fiber) VALUES ($1, $2, $3, $4, $5)";
const createEmptyMeal = "INSERT INTO meal_totals (meal_name, total_carbs, total_protein, total_fat, total_fiber) VALUES ($1, 0, 0, 0, 0)";
const createMealComponent = "INSERT INTO meal_components (component_name, component_carbs, component_protein, component_fat, component_fiber, meal_totals_id) VALUES ($1, $2, $3, $4, $5, $6)";

const deleteMeal = "DELETE FROM meal_totals WHERE id = $1"
const updateMealTotals = "UPDATE meal_totals SET total_carbs = total_carbs + $2, total_protein = total_protein + $3, total_fat = total_fat + $4, total_fiber = total_fiber + $5 WHERE id = $1"

module.exports = {

    getMeals,
    getMealComponents,
    getMealByName,
    getMealById,
    getMealId,
    getMealsByDate,

    createMeal,
    createEmptyMeal,
    createMealComponent,

    deleteMeal,

    updateMealTotals
}