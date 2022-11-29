import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import units from "../utility/Units";
import {UnitConverter} from "../utility/Units"


const FACTOR = 0.01
export default function Nutrition({foods, macros, setMacros, doCalculate=true}) {
    function calculateCarbs() {
        const c = new UnitConverter()    
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return c.convert[data.unit](parseFloat(data.qty))*parseFloat(data.carbs) + prev
        },0)) * FACTOR
    }

    function calculateProtein() {
        const c = new UnitConverter()    
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return c.convert[data.unit](parseFloat(data.qty))*parseFloat(data.protein) + prev
        },0)) * FACTOR
    }

    function calculateFat() {
        const c = new UnitConverter()    
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return c.convert[data.unit](parseFloat(data.qty))*parseFloat(data.fat) + prev
        },0)) * FACTOR
    }


    function calculateCalories() {
        const c = new UnitConverter()    
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return c.convert[data.unit](parseFloat(data.qty))*parseFloat(data.calories) + prev
        },0)) * FACTOR
    }

    useEffect(()=> {
        if (doCalculate) {
            const newMacros = {
                carbs:parseFloat(calculateCarbs()).toFixed(2),
                fat:parseFloat(calculateFat()).toFixed(2),
                protein:parseFloat(calculateProtein()).toFixed(2),
                calories:parseFloat(calculateCalories()).toFixed(2)
            }
            setMacros(newMacros)
        }
        else {
            //setMacros(macros)
        }
        
    }, [foods])

    return (
        <Paper elevation={3}>
            <Typography variant='h6'>Nutrition</Typography>  
            <Box sx={{display:'flex', gap:'2rem'}}>
                <Typography variant='body'>Calories: {macros.calories}</Typography>  
                <Typography variant='body'>Carbs: {macros.carbs}</Typography>  
                <Typography variant='body'>Protein: {macros.protein}</Typography>  
                <Typography variant='body'>Fat: {macros.fat}</Typography>  
            </Box>

        </Paper>
    )
}