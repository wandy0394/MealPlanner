import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentBox } from "../components/utility/ContentBox";
import RecipeService from "../service/recipe-service";



export default function SearchDetails(props) {
    const params = useParams()
    const [instructions, setInstructions] = useState('')
    const [macros, setMacros] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')


    function parseData(recipe) {
        if (recipe === null || recipe === undefined) return
        setTitle(recipe.recipe_name)
        const directions = recipe.directions.direction.reduce((acc, item) => {
            return acc + item.direction_number + ': ' + item.direction_description + '\n' 
        },'')
        setInstructions(directions)


        //ingredients object structure
        // const INITIAL = {
        //     qty:0, 
        //     name:"", 
        //     unit:"g",
        //     fat:0,
        //     calories:0,
        //     protein:0,
        //     carbs:0,
        //     id:null
        // }

        const ingredients = recipe.ingredients.ingredient.map((item)=> {
            return {
                qty:item.number_of_units,
                name:item.food_name, 
                unit:item.measurement_description,
                fat:0,
                calories:0,
                protein:0,
                carbs:0,
                id:item.food_id                
            }
        })
        setIngredients(ingredients)
        const numServings = recipe.number_of_servings
        const macros = {
            carbs:parseFloat(recipe.serving_sizes.serving.carbohydrate).toFixed(2),
            fat: parseFloat(recipe.serving_sizes.serving.fat).toFixed(2),
            protein: parseFloat(recipe.serving_sizes.serving.protein).toFixed(2),
            calories: parseFloat(recipe.serving_sizes.serving.calories).toFixed(2)
        }
        setMacros(macros)
    }
    useEffect(()=> {
        getRecipe()
    }, [])

    async function getRecipe() {
        try {
            const data = await RecipeService.getRecipe(params.id)
            parseData(data.recipe)
        }
        catch (e) {
            console.error('error')
            console.error(e)
        }
    }

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box>
                    <Typography variant='h3' sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>
                        Recipe Details
                    </Typography>
                </Box>
                <Box>

                </Box>

            </Stack>
        </ContentBox>
    )
}