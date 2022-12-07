import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ContentBox } from "../utility/ContentBox"
import DataService from "../../service/data-service"


function Header({children}) {
    return (
        <Box sx={{height:'15vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0', margin:'0'}}>
            {children}
        </Box>

    )
}


export default function RecipeInfo(props) {
    //const {recipeId, getRecipe} = props
    const {recipe} = props
    const [instructions, setInstructions] = useState('')
    const [macros, setMacros] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')
    //const [recipe, setRecipe] = useState({})

    // useEffect(()=> {
        

    //     getRecipe(recipeId)
        
    // }, [recipeId])

  
    // async function getRecipe() {
    //     try {
    //         const data = await DataService.getRecipe(recipeId)
    //         console.log(data.recipe)  
    //         setRecipe(data.recipe)
    //         //parseData(data.recipe)
    //     }
    //     catch (e) {
    //         console.error('error')
    //         console.log(e)
    //     }
    // }

    return (
        
        <Box sx={{height:'100%', margin:'0', padding:'0'}}>
            <Header>

                {
                    (recipe?.recipe_images?.recipe_image !== undefined) ? 
                    (<img style={{objectFit:'cover', width:'100%', height:'100%'}} 
                        src={recipe.recipe_images.recipe_image} />) :
                    (   
                        <Box sx={{backgroundColor:'lightgrey', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                            <Typography variant='h4'>Image Unavailable</Typography>
                        </Box>                    
                    )
                        
                }                
            </Header>
            
            <Box sx={{height:'100%', marginTop:'2rem', border:'solid'}}>
                <Box>
                    Title goes here
                </Box>
                <Box>
                    Prep Time: {recipe.preparation_time_min}
                    Cook Time: {recipe.cooking_time_min}
                    Servings: {recipe.number_of_servings}
                </Box>
                <Box>
                    Rating: {recipe.rating} / 5
                </Box>
                <Box>
                    Directions
                    {
                        (recipe.directions !== undefined) ? 
                        (recipe.directions.direction.map((item, index)=>{
                            return <Box key={index}>{item.direction_number} : {item.direction_description}</Box>
                        })) : ('')
                    }
                </Box>
            </Box>

        </Box>
        
    )
}