import { Box, Typography } from "@mui/material"
import { ImageBlank } from "../recipe/utility/RecipePostCardUtil"
import { strawTheme } from "../utility/StrawTheme"
import {MacroSummary} from "./MacroCard"


export default function MealCard(props) {
    const {id, meal, image=undefined, handler=null, ...other} = props
    function handleClick() {
        if (handler !== null) {
            handler(meal)
        }
    }
    
    return (
        <Box key={meal.id} onClick={handleClick} sx={{margin:'0rem',height:'100%', color:strawTheme.palette.common.black, width:'600px'}}>
            <Box sx={{display:'grid', gridTemplateColumns:'3fr 1fr', height:'100%', width:'100%'}}>
                <Box sx={{height:'100%', display:"flex", flexDirection:'column'}}>
                    <Typography 
                        variant='h4'
                        sx={{
                            color:strawTheme.palette.common.black, 
                            background:strawTheme.palette.common.lightgrey, 
                            padding:'1rem 2rem',
                            fontWeight:'bold',
                        }}
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
                    sx={{background:strawTheme.palette.common.grey, padding:'1rem'}}
                    variant='body1'
                />
            </Box>
        </Box>
    )
}
