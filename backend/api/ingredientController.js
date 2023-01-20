import Ingredient from "../data/ingredient.js"


const DUMMY_EMAIL = 'dev@email.com'

export default class IngredientController {
    static async apiSearchIngredients(req, res, next) {
        //expects /?searchText=string
        try {
            const searchText = req.params.searchText;
            const page = req.params.page
            const query = req.query
            const output = await Ingredient.searchIngredients(searchText, page, query)
            res.json(output.foods)
            //refer to fatsecretAPI documentation for return format
        } catch (e) {
            console.error('error')
            res.status(500).json({error:e.message})
        }
    }

    static async apiGetIngredient(req, res, next) {
        //expects /?id=someNumber
        try {
            const id = req.params.id;
            const output = await Ingredient.fetchIngredientByID(id)

            let response = {
                name: output.food.food_name,
                type: output.food.food_type,
                servings: output.food.servings
            }
            res.json(output)
             //refer to fatsecretAPI documentation for return format
        } catch (e) {
            console.error('error')
            res.status(500).json({error:e.message})
        }
    }

    static apiAddIngredient(req, res, next) {
        //expects a body in the format
        // {
        //     name:String,
        //     food_id:integer,
        //     carbs:float,
        //     fat:float,
        //     protien:float,
        //     caloreis:float
        // }


        const params = req.body
        Ingredient.insertIngredient(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                res.json({success: 'Ingredient Added'})
            })
            .catch((resp)=>{
                res.json({error: 'Could not insert ingredient into database'})
            })
    }

    static apiGetAllIngredients(req, res, next) {
        /**
         * returns array of objects
         * [
         *      {
         *          id:integer, 
         *          name:string, 
         *          calories:float, 
         *          fat:float, 
         *          protein:float, 
         *          carbs:float
         *      }
         * ] 
         */
        Ingredient.getAllIngredients(DUMMY_EMAIL)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not insert ingredient into database'})
            })        
    }
    static async apiRemoveIngredient(req, res, next) {
        //expects
        //params: {id}, which is the primary key of the ingredient to be removed
        Ingredient.removeIngredient(req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not delete ingredient from database'})
            })       
    }
    static async apiUpdateIngredient(req, res, next) {
        const params = req.body
        //expects
        //params: {id}, which is the primary key of the ingredient to be removed

        //expects body
        /*
        {
            name:string,
            food_id:integer,
            carbs:float,
            fat:float,
            protein:float,
            calories:float,
            userEmail:string
        }
        */

        Ingredient.updateIngredient(DUMMY_EMAIL, params, req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not update ingredient in database'})
            })       
    }
}