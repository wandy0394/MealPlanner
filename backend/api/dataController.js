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
            res.json(response)
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
                    //res.json({success: 'RecipeIngredient Added'})
                    DatabaseService.insertRecipeUser(DUMMY_EMAIL, resp.insertId)
                    .then((resp)=> {
                        res.json({success: 'Recipe_User Added'})
                    })
                    .catch((resp) => {
                        res.json({error:'Could not insert into RecipeIngredient'})
                    })
                })
                .catch((resp) => {
                    res.json({error:'Could not insert into RecipeIngredient'})
                })

             })
            .catch((resp)=>{
                res.json({error: 'Could not insert recipe into database'})
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