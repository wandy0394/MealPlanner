import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ACTION_TYPES } from "./ActionTypes";

function IngredientCard({ingredient, dispatch}) {
    
    function handleClick(e) {
        console.log('clicked')
        console.log(e.target.attributes)
        dispatch({type:ACTION_TYPES.ADD_MEAL, payload:{id:0, name:e.target.attributes.value.value}})
    }
    
    return (
        <Card value={ingredient.name} onClick={handleClick} sx={{margin:'1rem', display:'inline-block', border:'solid', aspectRatio:'1/1', height:'15vh', color:'black'}}>
            <CardContent sx={{border:'solid'}}>
                <Typography variant='h6'>{ingredient.name}</Typography>
            </CardContent> 
        </Card>
    )
}

export default function IngredientSelection({ingredients, dispatch}) {
    
    return (
        <Box sx={{width:'100%', border:'solid', height:'20vh', overflowY:'scroll'}}>
            {
                ingredients.map((item) => {
                    // return <p>{item.name}</p>
                    return <IngredientCard ingredient={item} dispatch={dispatch} />
                })
            }
        </Box>
    )
}