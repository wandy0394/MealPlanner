import { useEffect, useState } from "react"
import IngredientService from "../../../service/ingredient-service"
import MealService from "../../../service/meal-service"
import RecipeService from "../../../service/recipe-service"
import DateObject from 'react-date-object'

function IngredientToMealLineItem(ingredient) {
    return
}

function RecipeToMealLineItem(recipe) {
    return
}

function StaticRecipeToMealLineItem(recipe) {
    return
}
export function calculateTotalMacros(mealSets) {
    const retval = Object.values(mealSets).reduce((result, data)=>{
        result = {
            totalCalories:result.totalCalories+data.totalCalories,
            totalCarbs:result.totalCarbs+data.totalCarbs,
            totalFat:result.totalFat+data.totalFat,
            totalProtein:result.totalProtein+data.totalProtein,
            targetCalories:result.targetCalories+data.targetCalories,
            targetCarbs:result.targetCarbs+data.targetCarbs,
            targetFat:result.targetFat+data.targetFat,
            targetProtein:result.targetProtein+data.targetProtein,
        }
        
        return result 
    }, {
        totalCalories:0,
        totalCarbs:0,
        totalFat:0,
        totalProtein:0,
        targetCalories:0,
        targetCarbs:0,
        targetFat:0,
        targetProtein:0,
    })
    return retval
}
export const useGetAllFood = () => {
    const [mealLineItems, setMealLineItems] = useState({})
    let counter=0
    let called = false
    useEffect(()=> {        
        if (!called) {
            async function fetchData() {
                try {
                    const ingredientResult = await IngredientService.getIngredients()
                    const recipeResult = await RecipeService.getRecipes()
                    const staticResult = await RecipeService.getStaticRecipes()
                    let lineItems = {}
                    Object.entries(recipeResult).forEach(([key, data])=> {
                        lineItems = {...lineItems, 
                                    [counter] : {
                                        name:data.title, 
                                        calories:data.macros.calories,
                                        fat:data.macros.fat,
                                        protein:data.macros.protein,            
                                        carbs:data.macros.carbs, 
                                        recipe_id:parseInt(key),
                                        image:undefined,
                                        type:'custom'
                                    }
                        }
                        counter++
                    })

                    Promise.all(staticResult.map((item)=>{
                        if (item.recipe_id !== undefined) {
                            return RecipeService.getRecipe(item.recipe_id)
                        }
                    })).then((resp)=>{
                        for (let i = 0; i < staticResult.length; i++) {
                            lineItems = {...lineItems, 
                                [counter] : {
                                    name:resp[i].recipe.recipe_name,
                                    calories:parseFloat(resp[i].recipe.serving_sizes.serving.calories),
                                    carbs: parseFloat(resp[i].recipe.serving_sizes.serving.carbohydrate),
                                    fat: parseFloat(resp[i].recipe.serving_sizes.serving.fat),
                                    protein: parseFloat(resp[i].recipe.serving_sizes.serving.protein),
                                    image: (resp[i].recipe.recipe_images !== undefined) ? resp[i].recipe.recipe_images.recipe_image : undefined, 
                                    recipe_id:staticResult[i].id,  //consider renaming id
                                    api_id:resp[i].recipe.recipe_id,
                                    type:'static'
                                }
                            }
                            counter++
                        }
                        setMealLineItems(lineItems)  
                    })
                }
                catch (e) {
                    console.error('Error fetching meal items.')
                }
            }
            fetchData();
        }
        return () => {
            called = true
        }
    }, [])
    return [mealLineItems, setMealLineItems]
}

export const INITIAL_MEAL = {
    meal_id:null,
    recipes:{},
    staticRecipes:{},
    meals:{},
    targetCarbs:0,
    targetCalories:0,
    targetProtein:0,
    targetFat:0,
    totalCarbs:0,
    totalCalories:0,
    totalFat:0,
    totalProtein:0,
    counter:0,
    days:[],
    dateObjects:null

}

export const getMealSets = (from, to) => {
    let retval = {}
    const startDate = new DateObject(from)
    const endDate = new DateObject(to)
    for (let day=startDate; day < endDate; day.add(1, 'days')) {
        retval[day.format('YYYY-M-D')] = {...INITIAL_MEAL, days:[day], dateObjects:day}
    }
    
    const promise = new Promise((resolve, reject)=>{
        MealService.getMealsInRange(from, to)
            .then((result)=>{
                Object.entries(result).forEach(([key, value])=>{
                    retval[key] = value
                })
                resolve(retval)
                
            })
            .catch((result) => {
                console.error('reject')
                reject(retval)
            })

    })
    return promise
}

export const useGetMealsInRange = (from, to) => {
    //from and to are strings in format 'YYYY-M-D'
    const [meals, setMeals] = useState({})
    let counter=0
    let called = false
    useEffect(()=> {        
        if (!called) {
            getMealSets(from, to)
                .then((result)=>{
                    setMeals(result)
                })
                .catch((result)=>{
                    setMeals(result)
                })
        }
        return () =>{
            called = true
        }
    },[])
    return [meals, setMeals]
}