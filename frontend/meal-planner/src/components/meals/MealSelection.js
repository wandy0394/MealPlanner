import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { ACTION_TYPES } from "./ActionTypes";

function OptionCard(props) {
    const {selectOptions, dispatch, id, ...other} = props
    function handleClick(e, id, name) {
        console.log('clicked')
        console.log()
        dispatch({type:ACTION_TYPES.ADD_MEAL, payload:{id:id, name:name, recipe_id:selectOptions.recipe_id, type:selectOptions.type}})
    }
    
    return (
        <Card key={id} onClick={e=>handleClick(e, id, selectOptions.name)} sx={{margin:'1rem', display:'inline-block', border:'solid', aspectRatio:'1/1', height:'15vh', color:'black'}}>
            <CardContent sx={{border:'solid'}}>
                <Typography variant='h6'>{selectOptions.name}</Typography>
                <Typography variant='h6'>{selectOptions.recipe_id}</Typography>
            </CardContent> 
        </Card>
    )
}

export default function MealSelection({selectOptions, dispatch}) {
    
    return (
        <Box sx={{width:'100%', border:'solid', height:'40vh', overflowY:'scroll'}}>
            {
                Object.entries(selectOptions).map(([key, item], index) => {
                    // return <p>{item.name}</p>
                    return <OptionCard key={index} id={key} selectOptions={item} dispatch={dispatch} />
                })
            }
        </Box>
    )
}