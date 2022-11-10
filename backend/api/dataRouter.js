import express from "express"
import DataController from "./dataController.js"

const router = express.Router()

router.route("/ingredient/:id")
    .get(DataController.apiGetIngredient)
    .delete(DataController.apiRemoveIngredient)
    .post(DataController.apiSaveIngredient)

router.route("/ingredient/search/:searchText")
    .get(DataController.apiSearchIngredients)

router.route("/recipe/search/:searchText")
    .get(DataController.apiSearchRecipes)
router.route("/recipe/:id")
    .get(DataController.apiGetRecipe)
    .post(DataController.apiCreateRecipe)
    .delete(DataController.apiRemoveRecipe)
    .put(DataController.apiUpdateRecipeContent)
router.route("/recipe/all")
    .get(DataController.apiGetAllRecipes)


router.route("/recipe-book")
    .get(DataController.apiGetRecipeBook)
    .post(DataController.apiCreateRecipeBook)
    .delete(DataController.apiRemoveRecipeBook)
    .put(DataController.apiUpdateRecipeBookContent)

router.route("/meal")
    .get(DataController.apiGetMeal)
    .post(DataController.apiCreateMeal)
    .delete(DataController.apiRemoveMeal)
    .put(DataController.apiUpdateMealContent)


router.route("/meal-plan")
    .get(DataController.apiGetMealPlan)
    .post(DataController.apiCreateMealPlan)
    .delete(DataController.apiRemoveMealPlan)
    .put(DataController.apiUpdateMealPlanContent)
export default router
