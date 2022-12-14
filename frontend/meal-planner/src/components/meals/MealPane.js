import { Box, Card, CardContent, Typography } from "@mui/material"

function OptionCard(props) {
    const {mealLineItem} = props
    function handleClick(e, id, name) {
        console.log('clicked')
        console.log()
        // dispatch({type:ACTION_TYPES.ADD_MEAL, payload:{id:id, name:name}})
    }
    
    return (
        <Card sx={{margin:'1rem', display:'inline-block', border:'solid', aspectRatio:'1/1', height:'15vh', color:'black'}}>
            <CardContent sx={{border:'solid'}}>
                <Typography variant='h6'>{mealLineItem.name}</Typography>
            </CardContent> 
        </Card>
    )
}



export default function MealPane(props) {
    const {mealLineItems} = props
    return (
        <Box sx={{width:'100%', border:'solid', height:'20vh', overflowY:'scroll'}}>
            {
                Object.entries(mealLineItems).map(([key, data])=>{
                    return <OptionCard mealLineItem={data}/>
                })
            }
        </Box>
    )
}