import { Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import RecipeService from "../../service/recipe-service"

export default function MealCard(props) {
    const {id, meal, handler=null, ...other} = props
    function handleClick() {
        console.log('clicked')
        if (handler !== null) {
            handler(meal)
        }
    }
    
    return (
        <Card key={meal.id} onClick={handleClick} sx={{margin:'1rem', display:'inline-block', aspectRatio:'1/1', height:'35%', minHeight:'20vh', color:'black'}}>
            <CardContent>
                <Typography variant='h6'>{meal.name}</Typography>
                <Typography variant='h6'>ID: {meal.recipe_id}</Typography>
                <Typography variant='h6'>Qty: {meal.qty}</Typography>
                <Typography variant='h6'>Calories: {meal.calories}</Typography>
                <Typography variant='h6'>Carbs: {meal.carbs}</Typography>
                <Typography variant='h6'>Fat: {meal.fat}</Typography>
                <Typography variant='h6'>Protein: {meal.protein}</Typography>

            </CardContent> 
        </Card>
    )
}

export function StaticMealcard(props) {
    const {meal, ...other} = props
    const [newMeal, setNewMeal] = useState(meal)

    async function getRecipeData() {
        console.log('called')
        return await RecipeService.getRecipe(meal.api_id)
    } 

    let called = false
    useEffect(()=>{
        if (!called) {
            console.log('effect')
            getRecipeData().then((resp)=>{
                console.log(resp)
                const newMeal = {
                    name: resp.recipe.recipe_name,
                    recipe_id: meal.recipe_id,
                    qty:meal.qty,
                    calories:resp.recipe.serving_sizes.serving.calories,
                    carbs: resp.recipe.serving_sizes.serving.carbohydrate,
                    fat: resp.recipe.serving_sizes.serving.fat,
                    protein: resp.recipe.serving_sizes.serving.protein
                }
                setNewMeal(newMeal)
            })
        }
        return () => {
            called = true
        }
    }, [meal])

    return <MealCard meal={newMeal}/>
}
