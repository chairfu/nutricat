const {Router} = require ('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getMeals);
router.get('/meal_comp/:id', controller.getMealComponents)
//router.get('/:id', controller.getMealById)
router.get('/getid', controller.getMealId)
router.get('/gbd', controller.getMealsByDate)

router.post('/add', controller.createMeal);
router.post('/', controller.createEmptyMeal);
router.post('/meal_comp/add', controller.createMealComponent);

router.delete('/', controller.deleteMeal);
router.delete('/meal_comp', controller.deleteMealComponent)

router.put('/', controller.updateMealTotals);

module.exports = router;