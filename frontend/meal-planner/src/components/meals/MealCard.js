import { Box, Card, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import RecipeService from "../../service/recipe-service"
import { ImageBlank } from "../recipe/utility/RecipePostCardUtil"
import MacroCard, {MacroSummary} from "./MacroCard"


export default function MealCard(props) {
    const {id, meal, image=undefined, handler=null, ...other} = props
    function handleClick() {
        console.log('clicked')
        if (handler !== null) {
            handler(meal)
        }
    }
    
    return (
        <Box key={meal.id} onClick={handleClick} sx={{margin:'0rem',height:'100%', color:'black'}}>
            <Box sx={{display:'grid', gridTemplateColumns:'3fr 1fr'}}>
                <Box sx={{height:'100%', display:"flex", flexDirection:'column'}}>
                    <Typography 
                        variant='h4'
                        sx={{color:'white',background:'grey', paddingLeft:'1rem'}}
                    >
                        {meal.name}
                    </Typography>
                    {                    
                        (image !== undefined) ? 
                        (<img style={{objectFit:'cover', width:'100%', height:'100%'}} 
                            src={image} />) :
                        (<ImageBlank/>)
                    }
                </Box>
                <MacroSummary
                    totalCalories = {meal.calories}
                    totalCarbs= {meal.carbs}
                    totalProtein={meal.protein}
                    totalFat={meal.fat}
                    servings={meal.qty}
                    directionX='column'
                    directionY='column'
                    sx={{background:'grey', padding:'1rem'}}
                    variant='body1'
                />
            </Box>
        </Box>
    )
}

export function StaticMealcard(props) {
    const {meal, ...other} = props
    return <MealCard meal={meal} image={meal.image}/>
}
