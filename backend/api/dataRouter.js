import express from "express"
import SearchHistoryController from "./searchHistoryController.js"
import IngredientController from "./ingredientController.js"
import MealController from "./mealController.js"
import RecipeController from "./recipeController.js"

const router = express.Router()

//adding new ingredients to sql database
router.route("/ingredient")
    .post(IngredientController.apiAddIngredient)

router.route("/ingredient/all")
    .get(IngredientController.apiGetAllIngredients)


//:id is the primary key id in SQL database
router.route("/ingredient/:id")
    .get(IngredientController.apiGetIngredient)
    .put(IngredientController.apiUpdateIngredient)
    .delete(IngredientController.apiRemoveIngredient)

//interfaces to external API
router.route("/ingredient/search/:searchText/:page")
    .get(IngredientController.apiSearchIngredients)

router.route("/recipe/search/:searchText/")
    .get(RecipeController.apiSearchRecipes)

router.route("/recipe/all")
    .get(RecipeController.apiGetAllRecipes)

router.route("/recipe/add")
    .post(RecipeController.apiAddCustomRecipe)

router.route("/recipe/static")
    .post(RecipeController.apiAddStaticRecipe)

router.route("/recipe/static/all")
    .get(RecipeController.apiGetStaticRecipes)

router.route("/recipe/internal/:id")
    .get(RecipeController.apiGetCustomRecipe)
    .put(RecipeController.apiUpdateCustomRecipe)
    .delete(RecipeController.apiRemoveRecipe)


router.route("/recipe/:id")
    .get(RecipeController.apiFetchStaticRecipe)
    

router.route("/searchHistory/query/all")
    .get(SearchHistoryController.apiGetSearchHistory)

router.route("/searchHistory/query/:type")
    .get(SearchHistoryController.apiGetSearchHistoryByType)

router.route("/searchHistory/:id")
    .delete(SearchHistoryController.apiRemoveSearchQuery)


router.route("/meal")
    .get(MealController.apiGetMeal)
    .post(MealController.apiCreateMeal)
    .delete(MealController.apiRemoveMeal)
    .put(MealController.apiUpdateMealContent)

router.route("/meals")
    .get(MealController.apiGetAllMeals)


export default router
