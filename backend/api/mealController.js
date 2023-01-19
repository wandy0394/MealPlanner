import Meal from "../data/meal.js"


const DUMMY_EMAIL = 'dev@email.com'

export default class MealController {
    static async apiCreateMeal(req, res, next) {
        //expects body
        /*
        {
            datestamp:DATETIME,
            user_id:string,
            targetCalories:float,
            targetCarbs:float,
            targetFat:float,
            targetProtein:float
            totalCalories:float,    
            totalCarbs:float,
            totalFat:float,
            totalProtein:float

        }
        */
        Meal.insertMeal(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                Meal.insertMealRecipe(DUMMY_EMAIL, Object.entries(resp), Object.entries(req.body.meals))
                    .then((resp)=>{
                        res.json({success:'success'})
                    })
                    .catch((resp)=>{
                        res.json({error:'Could not insert into meal_recipe'})
                    })
             })
            .catch((resp)=>{
                res.json({error: 'Could not insert meal into database'})
            })

    }
    static async apiGetMeal(req, res, next) {
        return
    }
    static async apiGetAllMeals(req, res, next) {
        //expects query
        /*
        {
            from: string,
            to:string
        }
        */
        let from=null, to=null
        if (req.query && Object.keys(req.query).length > 0) {
            from = req.query.from
            to = req.query.to
        }

        Meal.getAllMeals(DUMMY_EMAIL, from, to)
            .then((resp)=>{
                /**
                 * returns object 
                 * {
                 *      dateString: {
                 *          meal_id: integer,
                 *          recipes: {
                 *              recipe_id: {
                 *                  recipe_id:integer,
                 *                  recipe_qty: integer
                 *              }
                 *          }
                 *          staticRecipes: {
                 *              static_recipe_id: {
                 *                  static_recipe_id:integer,
                 *                  static_recipe_qty:integer
                 *              }
                 *          },
                 *          targetCalories: float,
                 *          targetCarbs: float,
                 *          targetFat: float,
                 *          targetProtein: float,
                 *          totalCalories: float,
                 *          totalFat: float,
                 *          totalProtein: float,
                 *      }
                 * }
                 */
                res.json(resp)
            })
            .catch((resp)=>{
                res.json({error:'Could not get all meals'})
            })
    }
    static async apiRemoveMeal(req, res, next) {
        const mealId = req.params.id
        Meal.deleteMeal(DUMMY_EMAIL, mealId)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                req.json({error:'Could not delete meal'})
            })
    }
    static async apiRenameMeal(req, res, next) {
        return
    }
    static async apiUpdateMealContent(req, res, next) {

        //expects body
        /*
        {
            targetCarbs:float,
            targetCalories:float,
            targetProtein:float,
            targetFat:float,
            totalCarbs:float,
            totalCalories:float,
            totalFat:float,
            totalProtein:float,
            type: 'static' | 'custom'
            operation: 'insert' | 'update' | 'delete
        }
        */

        const meals = req.body
        const mealId = req.body.meal_id
        Meal.updateMeal(DUMMY_EMAIL, meals, mealId)
        .then((resp)=>{
            res.json(resp)
        })
        .catch((resp)=>{
            res.json({error:'Could not get all meals'})
        })
    }
}