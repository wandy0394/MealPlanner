import { Box } from "@mui/material"
import { ACTION_TYPES } from "./ActionTypes"
import MealCard from "./MealCard"


export default function MealSelect(props) {
    const {mealItems, handleSelect, sx, ...other} = props

    return (
        <Box sx={sx}>
            {
                Object.entries(mealItems).map(([key, item], index)=>{
                    return <MealCard key={index} id={key} meal={item} handler={e=>handleSelect(key, e)} />
                })
            }
        </Box>
    )
}