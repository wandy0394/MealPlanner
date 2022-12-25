import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import MacroWeeklyCard from "./MacroWeeklyCard"
import { calculateTotalMacros } from "./MealItemUtil"

export default function MacroWeeklySummary({mealSets}) {
    const [macros, setMacros] = useState({})

    let called = false
    useEffect(()=>{
        if (!called) {
            setMacros(calculateTotalMacros(mealSets))
        }

        return ()=>{
            called = true
        }
    }, [mealSets])

    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem', alignItems:'center', justifyContent:'center'}}>
            <MacroWeeklyCard value={macros.totalCalories} name='Calories' unit='kcal' target={macros.targetCalories}/>
            <MacroWeeklyCard value={macros.totalCarbs} name='Carbs' unit='g' target={macros.targetCarbs}/>
            <MacroWeeklyCard value={macros.totalFat} name='Fat' unit='g' target={macros.targetFat}/>
            <MacroWeeklyCard value={macros.totalProtein} name='Protein' unit='g' target={macros.targetProtein}/>
        </Box>
    )
}