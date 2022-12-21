import { Box } from "@mui/material"
import { ACTION_TYPES } from "./ActionTypes"
import MealCard from "./MealCard"


export default function MealSelect(props) {
    const {mealItems, handleSelect, sx, ...other} = props

    // function handleSelect(id, item) {
    //     dispatch({type:ACTION_TYPES.REMOVE_MEAL, payload:{id:id}}) 
    // }
    return (
        <Box sx={sx}>
        {/* <Box sx={{width:'100%', border:'solid', height:'20vh', overflowX:'scroll', overflowY:'hidden', whiteSpace:'nowrap'}}> */}
            {
                Object.entries(mealItems).map(([key, item], index)=>{
                    return <MealCard key={index} id={key} meal={item} handler={e=>handleSelect(key, e)} />
                })
            }
        </Box>
    )
}