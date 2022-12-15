import { Box, Card, CardContent, Typography } from "@mui/material"
import { ACTION_TYPES } from "./ActionTypes"

function OptionCard(props) {
    const {mealLineItem, dispatch, id} = props
    function handleClick(e, id) {
        console.log('clicked')
        console.log()
        dispatch({type:ACTION_TYPES.REMOVE_MEAL, payload:{id:id}})
    }
    
    return (
        <Card key={id} onClick={e=>handleClick(e, id)} sx={{margin:'1rem', display:'inline-block', border:'solid', aspectRatio:'1/1', height:'15vh', color:'black'}}>
            <CardContent sx={{}}>
                <Typography variant='h6'>{mealLineItem.name}</Typography>
                <Typography variant='h6'>Qty: {mealLineItem.qty}</Typography>
                <Typography variant='h6'>RecipeID: {mealLineItem.recipe_id}</Typography>
                <Typography variant='h6'>Type: {mealLineItem.type}</Typography>

            </CardContent> 
        </Card>
    )
}



export default function MealPane(props) {
    const {mealLineItems, dispatch} = props
    return (
        <Box sx={{width:'100%', border:'solid', height:'20vh', overflowX:'scroll', overflowY:'hidden', whiteSpace:'nowrap'}}>
            {
                Object.entries(mealLineItems).map(([key, data], index)=>{
                    return <OptionCard key={index} mealLineItem={data} dispatch={dispatch} id={key}/>
                })
            }
        </Box>
    )
}