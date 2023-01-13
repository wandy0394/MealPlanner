import { Box, Stack } from "@mui/material"
import MealSet from "./MealSet"
import {INITIAL_STATUS} from "../utility/StatusSnackbar"
import StatusSnackbar from "../utility/StatusSnackbar"
import { useState } from "react"

export default function MealList(props) {
    const {mealSets, mealItems, removeMeal, addMeal} = props
    const [statusMessageState, setStatusMessageState] = useState(INITIAL_STATUS)

    return (
        <Box sx={{width:'100%', height:'100%', paddingBottom:'10rem'}}>
            <Box sx={{
                    width:'100%', 
                    paddingBottom:'10rem',
                    display:'grid',
                    gridAutoRows:'1fr',
                    gap:'3rem'
                }} 
            >
                {
                    Object.entries(mealSets).map(([key, value], index)=>{
                        return (
                            <MealSet 
                                key={index} 
                                mealItems={mealItems} 
                                mealSet={value}
                                dateValue={key}
                                removeMeal={removeMeal}
                                addMeal={addMeal}
                                setStatusMessageState={setStatusMessageState}
                            />
                        )
                    })
                }
            </Box>
            <StatusSnackbar
                statusMessageState={statusMessageState}
                setStatusMessageState={setStatusMessageState}
            />
        </Box>
    )
}