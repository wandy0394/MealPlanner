import { Box, Stack } from "@mui/material"
import MealSet from "./MealSet"

export default function MealList(props) {
    const {mealSets, mealItems, removeMeal} = props

    return (
        <Box sx={{width:'100%', height:'100%', paddingBottom:'10rem'}}>
            <Stack sx={{width:'100%', paddingBottom:'10rem'}} gap={3}>
                {
                    Object.entries(mealSets).map(([key, value], index)=>{
                        return (
                            <MealSet 
                                key={index} 
                                mealItems={mealItems} 
                                mealSet={value}
                                dateValue={key}
                                removeMeal={removeMeal}
                            />
                        )
                    })
                }
            </Stack>
        </Box>
    )
}