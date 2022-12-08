import express from "express"
import DataController from "./dataController.js"

const router = express.Router()

//adding new ingredients to sql database
router.route("/ingredient")
    .post(DataController.apiAddIngredient)


router.route("/ingredient/all")
    .get(DataController.apiGetAllIngredients)


//:id is the primary key id in SQL database
router.route("/ingredient/:id")
    .get(DataController.apiGetIngredient)
    .put(DataController.apiUpdateIngredient)
    .delete(DataController.apiRemoveIngredient)

//interfaces to external API
router.route("/ingredient/search/:searchText/:page")
    .get(DataController.apiSearchIngredients)

router.route("/recipe/search/:searchText/")
    .get(DataController.apiSearchRecipes)

router.route("/recipe/all")
    .get(DataController.apiGetAllRecipes)

router.route("/recipe/add")
    .post(DataController.apiAddRecipe)

router.route("/recipe/internal/:id")
    .get(DataController.apiGetStoredRecipe)
    .put(DataController.apiUpdateRecipe)
    //.put(DataController.apiUpdateRecipeContent)

router.route("/recipe/:id")
    .get(DataController.apiGetRecipe)
    .post(DataController.apiCreateRecipe)
    .delete(DataController.apiRemoveRecipe)
    

router.route("/searchHistory/query/all")
    .get(DataController.apiGetSearchHistory)

router.route("/searchHistory/query/:type")
    .get(DataController.apiGetSearchHistoryByType)

router.route("/searchHistory/:id")
    .delete(DataController.apiRemoveSearchQuery)

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
