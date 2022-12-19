import Ingredient from "../data/ingredient.js"


const DUMMY_EMAIL = 'dev@email.com'

export default class IngredientController {
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
        //console.log(params)
        Ingredient.insertIngredient(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                res.json({success: 'Ingredient Added'})
            })
            .catch((resp)=>{
                res.json({error: 'Could not insert ingredient into database'})
            })
    }

    static apiGetAllIngredients(req, res, next) {
        const params = req.body
        // console.log(params)
        Ingredient.getAllIngredients(DUMMY_EMAIL)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not insert ingredient into database'})
            })        
    }
    static async apiRemoveIngredient(req, res, next) {
        const params = req.body
        //console.log(req.params)
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
        // console.log(params)
        Ingredient.updateIngredient(DUMMY_EMAIL, params, req.params.id)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error: 'Could not update ingredient in database'})
            })       
    }
}