import Ingredient from "../data/ingredient.js"
import Recipe from "../data/recipe.js"
import Meal from "../data/meal.js"
import DatabaseService from "../services/database-service.js"

const DUMMY_EMAIL = 'dev@email.com'

export default class DataController {
    //methods go here

    static apiGetSearchHistory(req, res, next) {
        DatabaseService.getRecipeSearchHistory(DUMMY_EMAIL)
            .then((resp)=> {
                console.log('resolved')
                const output = resp.map((item)=> {
                    return {id: item.id, searchText: item.search_text, searchType: item.search_type, searchTime:item.search_time}
                })
                console.log(output)
                res.json(output)
            })
            .catch((resp)=> {
                //console.log('caught')
                //console.log(resp)
                return resp
            })
    }
    static apiGetSearchHistoryByType(req, res, next) {
        const type = req.params.type
        console.log(type)
        DatabaseService.getRecipeSearchHistoryByType(DUMMY_EMAIL, type)
            .then((resp)=> {
                console.log('resolved')
                const output = resp.map((item)=> {
                    return {id: item.id, searchText: item.search_text, searchType: item.search_type, searchTime:item.search_time}
                })
                console.log(output)
                res.json(output)
            })
            .catch((resp)=> {
                console.log('caught')
                console.log(resp)
                //console.log(resp)
                return resp
            })
    }
    static apiRemoveSearchQuery(req, res, next) {
        const params = req.body
        console.log(req.params)
        DatabaseService.removeSearchQuery(req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not delete query from database'})
            })       

        return        
    }

    //ingredient methods
    static async apiSearchIngredients(req, res, next) {
        //expects /?searchText=string
        try {
            const searchText = req.params.searchText;
            const page = req.params.page
            const query = req.query
            console.log(query)
            const output = await Ingredient.searchIngredients(searchText, page, query)
            res.json(output.foods)
            //return response;
        } catch (e) {
            console.log('error')
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetIngredient(req, res, next) {
        //expects /?id=someNumber
        try {
            const id = req.params.id;
            const output = await Ingredient.fetchIngredientByID(id)

            let response = {
                //extract relevant sections from output
                name: output.food.food_name,
                type: output.food.food_type,
                servings: output.food.servings
            }
            res.json(output)
            //return response;
        } catch (e) {
            console.log('error')
            res.status(500).json({error:e.message})
        }
    }
    static apiAddIngredient(req, res, next) {
        const params = req.body
        console.log(params)
        DatabaseService.insertIngredient(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                res.json({success: 'Ingredient Added'})
            })
            .catch((resp)=>{
                res.json({error: 'Could not insert ingredient into database'})
            })
    }
    static apiAddRecipe(req, res, next) {
        const params = req.body
        console.log(params)
        DatabaseService.insertRecipe(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                //res.json({success: 'Recipe Added'})
                DatabaseService.insertRecipeIngredient(req.body.ingredients, resp.insertId)
                    .then(()=> {
                        res.json({success: 'success'})
                    })
                    .catch((resp) => {
                        res.json({error:'Could not insert into RecipeIngredient'})
                    })

             })
            .catch((resp)=>{
                res.json({error: 'Could not insert recipe into database'})
            })

    
    }
    static apiAddStaticRecipe(req, res, next) {
        const params = req.body
        console.log(params)
        DatabaseService.insertStaticRecipe(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                res.json({success: 'success'})
             })
            .catch((resp)=>{
                res.json({error: 'Could not insert recipe into database'})
            })

    }
    static apiGetStaticRecipes(req, res, next) {
        const params = req.body
        console.log(params)
        DatabaseService.getStaticRecipes(DUMMY_EMAIL)
            .then((resp)=>{
                res.json(resp)
             })
            .catch((resp)=>{
                res.json({error: 'Could not select recipes from database'})
            })

    }
    static apiGetAllIngredients(req, res, next) {
        const params = req.body
        // console.log(params)
        DatabaseService.getAllIngredients(DUMMY_EMAIL)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not insert ingredient into database'})
            })        
    }
    static async apiSaveIngredient(req, res, next) {
        return
    }
    static async apiRemoveIngredient(req, res, next) {
        const params = req.body
        console.log(req.params)
        DatabaseService.removeIngredient(req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not delete ingredient from database'})
            })       

        return
    }
    static async apiUpdateIngredient(req, res, next) {
        const params = req.body
        // console.log(params)
        DatabaseService.updateIngredient(DUMMY_EMAIL, params, req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not update ingredient in database'})
            })       

        return
    }
    //recipe methods
    static async apiSearchRecipes(req, res, next) {
        //expects /?searchText=string
        try {
            const searchText = req.params.searchText;
            //console.log(req.query)
            //const output = await Recipe.searchRecipes(searchText)
            const output = await Recipe.searchRecipesWithData(req.query)
            res.json(output)
            //return response;
        } catch (e) {
            console.log('error')
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetRecipe(req, res, next) {
        //expects /?id=someNumber
        try {
            const id = req.params.id;
            const output = await Recipe.fetchRecipeByID(id)

            let response = {
                //extract relevant sections from output
            }
            res.json(output)
            //return response;
        } catch (e) {
            console.log('error')
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetAllRecipes(req, res, next) {
        //const params = req.body
        // console.log(params)
        DatabaseService.apiGetAllRecipes(DUMMY_EMAIL)
            .then((resp)=>{
                const result = {}
                Object.entries(resp).forEach(([key, value]) => {
                    if (!(value.id in result)) {
                        result[value.id] = {
                            title:value.title,
                            ingredients:[],
                            macros:{
                                carbs:value.total_carbs,
                                fat:value.total_fat,
                                protein:value.total_protein,
                                calories:value.total_calories,
                            },
                            instructions: value.instructions,
                            servings:value.servings,
                            cookTime:value.cookTime,
                            prepTime:value.prepTime,
                            serving_size:value.serving_size,
                            recipe_description:value.recipe_description
                        }
                    }                    
                    result[value.id]['ingredients'].push({
                        name: value.name,
                        carbs: value.carbs,
                        protein: value.protein,
                        fat: value.fat,
                        qty: value.qty,
                        unit: value.units,
                        id:value.ingredient_id,
                        calories:value.calories
                    })
                    
                })
                res.json(result)
            })
            .catch((resp)=>{
                res.json({error: 'Could not get all recipes from database'})
            })       
    }
    static async apiGetStoredRecipe(req, res, next) {
        //expects /?id=someNumber
        const id = req.params.id;
        DatabaseService.apiGetRecipe(DUMMY_EMAIL, id)
            .then((resp)=>{
                const result = {}
                Object.entries(resp).forEach(([key, value], index) => {
                    if (!(value.id in result)) {
                        result[value.id] = {
                            title:value.title,
                            ingredients:{},
                            macros:{
                                carbs:value.total_carbs,
                                fat:value.total_fat,
                                protein:value.total_protein,
                                calories:value.total_calories,
                            },
                            instructions: value.instructions,
                            servings:value.servings,
                            cookTime:value.cookTime,
                            prepTime:value.prepTime,
                            serving_size:value.serving_size,
                            recipe_description:value.recipe_description
                        }
                    }                    
                    result[value.id]['ingredients'][index]={
                        name: value.name,
                        carbs: value.carbs,
                        protein: value.protein,
                        fat: value.fat,
                        qty: value.qty,
                        unit: value.units,
                        food_id:value.ingredient_id,
                        calories:value.calories,
                        operation:'update',
                        recipeIngredientId: value.recipeIngredientId
                        
                    }
                    result[value.id]['counter'] = index               
                })
                //console.log(result)
                res.json(result)
            })
            .catch((resp)=>{
                res.json({error: 'Could not get all recipes from database'})
            }) 
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

    static async apiUpdateRecipe(req, res, next) {
        const recipeId = req.params.id
        DatabaseService.updateRecipe(DUMMY_EMAIL, req.body, recipeId) 
            .then ((resp) => {
                DatabaseService.updateRecipeIngredients(req.body.ingredients, recipeId)
                .then((resp)=> {
                    res.json({success:'Recipe Updated'})
                })
                .catch((resp)=>{
                    res.json({error:'Could not update recipe_ingredient table'})
                })
            })
            .catch ((resp)=> {
                res.json({error:'Could not update recipe table'})
            })
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
    static async apiCreateMeal(req, res, next) {
        const params = req.body
        console.log(params)
        DatabaseService.insertMeal(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                console.log(resp)
                // DatabaseService.insertMealRecipe(DUMMY_EMAIL, req.body)
                //     .then((resp)=>{
                //         DatabaseService.insertMealStaticRecipe(DUMMY_EMAIL, req.body)
                //             .then((resp)=>{
                //                 res.json({success:'success'})
                //             })
                //             .catch((resp)=>{
                //                 res.json({error:'Could not insert into meal_static_recipe'})
                //             })
                //     })
                //     .catch((resp)=>{
                //         res.json({error:'Could not insert into meal_recipe'})
                //     })
             })
            .catch((resp)=>{
                res.json({error: 'Could not insert meal into database'})
            })

    }
    static async apiGetMeal(req, res, next) {
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