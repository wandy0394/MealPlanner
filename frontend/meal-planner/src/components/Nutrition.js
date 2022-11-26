import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import units from "./Units";
import {UnitConverter} from "./Units"


const FACTOR = 0.01
export default function Nutrition({foods}) {
    const [carbs, setCarbs] = useState(0)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [calories, setCalories] = useState(0)

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
        setCarbs(calculateCarbs())
        setProtein(calculateProtein())
        setFat(calculateFat())
        setCalories(calculateCalories)
    }, [foods])

    return (
        <Paper elevation={3}>
            <Typography variant='h6'>Nutrition</Typography>  
            <Box sx={{display:'flex', gap:'2rem'}}>
                <Typography variant='body'>Calories: {calories}</Typography>  
                <Typography variant='body'>Carbs: {carbs}</Typography>  
                <Typography variant='body'>Protein: {protein}</Typography>  
                <Typography variant='body'>Fat: {fat}</Typography>  
            </Box>

        </Paper>
    )
}