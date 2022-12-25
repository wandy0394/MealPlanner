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
export const useGetAllFood0 = () => {
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
                            return {data:RecipeService.getRecipe(item.recipe_id), id:item.id}
                        }
                    })).then((resp)=>{
                        resp.forEach((item) => {
                            item.data.then((value)=>{
                                lineItems = {...lineItems, 
                                    [counter] : {
                                        name:value.recipe.recipe_name,
                                        calories:parseFloat(value.recipe.serving_sizes.serving.calories),
                                        carbs: parseFloat(value.recipe.serving_sizes.serving.carbohydrate),
                                        fat: parseFloat(value.recipe.serving_sizes.serving.fat),
                                        protein: parseFloat(value.recipe.serving_sizes.serving.protein),
                                        image: value.recipe.recipe_images.recipe_image, 
                                        recipe_id:item.id,  //consider renaming id
                                        api_id:value.recipe.recipe_id,
                                        type:'static'
                                    }
                                }
                                counter++    
                                console.log(lineItems)
                                setMealLineItems(lineItems)                    
                            })
                            .catch(()=>{
                                setMealLineItems(lineItems) 
                            })
                        })
                    }).catch((resp)=>{
                        console.log(resp)
                        setMealLineItems(lineItems)  
                    })



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

export const useGetMealsInRange = (from, to) => {
    //from and to are strings in format 'YYYY-MM-DD'
    // console.log(from)
    // console.log(to)
    const [meals, setMeals] = useState({})
    let counter=0
    let called = false
    useEffect(()=> {        
        if (!called) {
            async function fetchData() {
                try {
                    console.log(from)
                    console.log(to)
                    const result = await MealService.getMealsInRange(from, to)
                    console.log(`Meals: ${result}`)
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