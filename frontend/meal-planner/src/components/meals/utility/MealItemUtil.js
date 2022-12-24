import { useEffect, useState } from "react"
import IngredientService from "../../../service/ingredient-service"
import MealService from "../../../service/meal-service"
import RecipeService from "../../../service/recipe-service"

function IngredientToMealLineItem(ingredient) {
    return
}

function RecipeToMealLineItem(recipe) {
    return
}

function StaticRecipeToMealLineItem(recipe) {
    return
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
                                        type:'custom'
                                    }
                        }
                        counter++
                    })
                    staticResult.forEach((item) => {
                        lineItems = {...lineItems, 
                            [counter] : {
                                name:item.recipe_name, 
                                calories:0,
                                fat:0,
                                protein:0,            
                                carbs:0, 
                                recipe_id:item.id,  //consider renaming id
                                api_id:item.recipe_id,
                                type:'static'
                            }
                        }
                        counter++                        
                    })
                    console.log(lineItems)
                    setMealLineItems(lineItems)
                }
                catch (e) {

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

export const useGetMeals = () => {
    const [meals, setMeals] = useState({})
    let counter=0
    let called = false
    useEffect(()=> {        
        if (!called) {
            async function fetchData() {
                try {
                    const result = await MealService.getMeals()
                    console.log(result)
                    setMeals(result)
                }
                catch (e) {

                }
            }
            fetchData();
        }
        return () =>{
            called = true
        }
    },[])
    return [meals, setMeals]
}