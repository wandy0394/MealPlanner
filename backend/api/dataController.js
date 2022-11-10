import Ingredient from "../data/ingredient.js"
import Recipe from "../data/recipe.js"
import Meal from "../data/meal.js"
import { response } from "express";

export default class DataController {
    //methods go here



    //ingredient methods
    static async apiSearchIngredients(req, res, next) {
        return
    }
    static async apiGetIngredient(req, res, next) {
        //expects /?id=someNumber
        try {
            const id = req.params.id;
            const output = await Ingredient.FetchIngredientByID(id)

            let response = {
                //extract relevant sections from output
                name: output.food.food_name,
                type: output.food.food_type,
                servings: output.food.servings
            }
            res.json(response)
            //return response;
        } catch (e) {
            console.log('error')
            res.status(500).json({error:e.message})
        }
    }

    static async apiSaveIngredient(req, res, next) {
        return
    }
    static async apiRemoveIngredient(req, res, next) {
        return
    }
    //recipe methods
    static async apiSearchRecipes(req, res, next) {
        return
    }
    static async apiGetRecipe(req, res, next) {
        return
    }
    static async apiCreateRecipe(req, res, next) {
        return
    }
    static async apiRemoveRecipe(req, res, next) {
        return
    }
    static async apiRenameRecipe(req, res, next) {
        return
    }

    static async apiUpdateRecipeContent(req, res, next) {
        return
    }
    //recipe book methods
    static async apiGetRecipeBook(req, res, next) {
        return
    }
    static async apiCreateRecipeBook(req, res, next) {
        return
    }
    static async apiRemoveRecipeBook(req, res, next) {
        return
    }
    static async apiRenameRecipeBook(req, res, next) {
        return
    }
    static async apiUpdateRecipeBookContent(req, res, next) {
        return
    }
    //meal methods
    static async apiGetMeal(req, res, next) {
        return
    }
    static async apiCreateMeal(req, res, next) {
        return
    }
    static async apiRemoveMeal(req, res, next) {
        return
    }
    static async apiRenameMeal(req, res, next) {
        return
    }
    static async apiUpdateMealContent(req, res, next) {
        return
    }
    //meal plan methods
    static async apiGetMealPlan(req, res, next) {
        return
    }
    static async apiCreateMealPlan(req, res, next) {
        return
    }
    static async apiRemoveMealPlan(req, res, next) {
        return
    }
    static async apiUpdateMealPlanContent(req, res, next) {
        return
    }
    static async apiRenameMealPlan(req, res, next) {
        return
    }




}