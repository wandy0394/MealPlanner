import Recipe from "../data/recipe.js"
import DatabaseService from "../services/database-service.js"


const DUMMY_EMAIL = 'dev@email.com'
export default class RecipeController {

    static apiAddCustomRecipe(req, res, next) {

        /*
        expects body
        {
            recipe_description:string,
            servings:integer,
            serving_size:integer,
            prep_time:integer,
            cook_time:integer,
            macros: {
                carbs:float, 
                protein:float, 
                fat:float, 
                calories:float, 
            }
            instructions:string, 
        }
        */

        const params = req.body
        Recipe.insertCustomRecipe(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                Recipe.insertRecipeIngredient(req.body.ingredients, resp.insertId)
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

    static apiRemoveRecipe(req, res, next) {
        const recipeId = req.params.id
        Recipe.deleteCustomRecipe(DUMMY_EMAIL, recipeId)
            .then((resp)=>{
                res.json({success:'success'})
            })
            .catch((resp)=>{
                res.json({error:`Could not delete ${recipeId}`})
            })
    }

    static apiAddStaticRecipe(req, res, next) {
        /*
        expects body 
        {
            recipe_id:integer,
            recipe_name:string,
        }
        */
        const params = req.body
        Recipe.insertStaticRecipe(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                res.json({success: 'success'})
             })
            .catch((resp)=>{
                res.json({error: 'Could not insert recipe into database'})
            })

    }
    static apiRemoveStaticRecipe(req, res, next) {
        const recipeId = req.params.id
        Recipe.deleteStaticRecipe(DUMMY_EMAIL, recipeId)
            .then((resp)=>{
                res.json({success:'success'})
            })
            .catch((resp)=>{
                res.json({error:`Could not delete ${recipeId}`})
            })
    }
    static apiGetStaticRecipes(req, res, next) {
        // returns array of objects
        // {
        //     recipe_id: integer,
        //     recipe_name: string
        // }
        Recipe.getStaticRecipes(DUMMY_EMAIL)
            .then((resp)=>{
                res.json(resp)
             })
            .catch((resp)=>{
                res.json({error: 'Could not select recipes from database'})
            })

    }

    static async apiSearchRecipes(req, res, next) {
        //expects /?searchText=string
        try {
            const searchText = req.params.searchText;

            const output = await Recipe.searchRecipesWithData(req.query)
            res.json(output)
            //refer to fatsecretAPi documentation for return format
        } catch (e) {
            console.error('error')
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetAllRecipes(req, res, next) {
        Recipe.apiGetAllCustomRecipes(DUMMY_EMAIL)
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

    static async apiGetCustomRecipe(req, res, next) {
        //expects /?id=integer
        const id = req.params.id;
        Recipe.apiGetCustomRecipe(DUMMY_EMAIL, id)
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
                res.json(result)
            })
            .catch((resp)=>{
                res.json({error: 'Could not get all recipes from database'})
            }) 
    }

    static async apiUpdateCustomRecipe(req, res, next) {
        /*
        expects body
        {
            title:string,
            recipe_description:string,
            servings:integer,
            serving_size:integer,
            prepTime:integer,
            cookTime:integer,
            macros: {
                carbs: float,
                protein: float,
                fat: float,
                calories: float,
            },
            instructions:string
        } 
        */
        const recipeId = req.params.id
        Recipe.updateCustomRecipe(DUMMY_EMAIL, req.body, recipeId) 
            .then ((resp) => {
                Recipe.updateCustomRecipeIngredients(req.body.ingredients, recipeId)
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

    static async apiFetchStaticRecipe(req, res, next) {
        //expects /?id=integer
        try {
            const id = req.params.id;
            const output = await Recipe.fetchRecipeByID(id)

            res.json(output)
            //refer to fatSecretAPI documentation for return format
        } catch (e) {
            console.error('error')
            res.status(500).json({error:e.message})
        }
    }

}