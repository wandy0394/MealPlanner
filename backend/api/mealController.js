import Meal from "../data/meal.js"


const DUMMY_EMAIL = 'dev@email.com'

export default class MealController {
    static async apiCreateMeal(req, res, next) {
        const params = req.body
        console.log(params)
        Meal.insertMeal(DUMMY_EMAIL, req.body)
            .then((resp)=>{
                Meal.insertMealRecipe(DUMMY_EMAIL, Object.entries(resp), Object.entries(req.body.meals))
                    .then((resp)=>{
                        res.json({success:'success'})
                    })
                    .catch((resp)=>{
                        console.log(resp)
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
        Meal.getAllMeals(DUMMY_EMAIL)
            .then((resp)=>{
                res.json(resp)
            })
            .catch((resp)=>{
                console.log(resp)
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
        const meals = req.body
        const mealId = req.body.meal_id
        Meal.updateMeal(DUMMY_EMAIL, meals, mealId)
        .then((resp)=>{
            res.json(resp)
        })
        .catch((resp)=>{
            console.log(resp)
            res.json({error:'Could not get all meals'})
        })
    }
}