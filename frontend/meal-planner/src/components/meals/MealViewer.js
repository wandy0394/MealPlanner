import {Box, Button, Card, CardContent, Modal, Stack, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import DatePicker from "react-multi-date-picker"
import {DateObject} from "react-multi-date-picker"
import MacroCounter from "./MacroCounter"
import EditMealForm from "./EditMealForm"
import MealCard from "./MealCard"
import { StaticMealcard } from "./MealCard"


export default function MealViewer(props) {
    const {mealSet, mealItems} = props
    const [dateValue, setDateValue] = useState(new DateObject())
    const [selectedMeal, setSelectedMeal] = useState({})
    const [recipes, setRecipes] = useState({custom:[], static:[]})
    const [open, setOpen] = useState(false)
    
    function handleClose() {
        setOpen(false)
    }
    
    //api call to get mealSet belonging to this user
    let called = false
    useEffect(()=>{
        if (!called) {
            const today = new Date()
            const dateNow = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
            if (dateNow in mealSet) {
                setSelectedMeal(mealSet[dateNow])
                const newRecpies = getAllRecipes(mealSet[dateNow])
                setRecipes(newRecpies)
            }
        }
        return ()=>{
            called = true
        }
    }, [mealSet, mealItems])

    function getRecipe(id) {
        let retval = null
        retval = Object.values(mealItems).filter((data)=>{
            return (data.type === 'custom' && data.recipe_id === id) 
        })

        return(retval.length === 1)?retval[0]:null
    }
    function getStaticRecipe(id) {
        let retval = null
        retval = Object.values(mealItems).filter((data)=>{
            return (data.type === 'static' && data.recipe_id === id)
        })
        return (retval.length === 1)?retval[0]:null
    }

    function getAllRecipes(recipeIdObj) {
        const customRecipes = Object.keys(recipeIdObj.recipes).reduce((result, data)=>{
            const newData = getRecipe(parseInt(data))
            return [...result, {...newData, qty:recipeIdObj.recipes[data].qty}] 
        }, [])

        const staticRecipes = Object.keys(recipeIdObj.staticRecipes).reduce((result, data)=>{
            const newData = getStaticRecipe(parseInt(data))
            return [...result, {...newData, qty:recipeIdObj.staticRecipes[data].qty}]
        },[])
        return {custom:customRecipes, static:staticRecipes}
    }
    function handleDateChange(e) {
        setDateValue(e)
        const dateNow = e.format('YYYY-MM-DD')
        console.log(mealSet[dateNow])
        if (dateNow in mealSet) {
            setSelectedMeal(mealSet[dateNow])
            setRecipes(getAllRecipes(mealSet[dateNow]))
        }
        else {
            setSelectedMeal({})
            setRecipes({custom:[], static:[]})
        }
    }
    function handleEditClick() {
        console.log(mealItems)
        setOpen(true)
    }
    
    return (
        <Box sx={{width:'100%', height:'100%', border:'solid'}}>
            <Stack sx={{width:'100%'}}>
                <Button variant='contained' onClick={handleEditClick}>Edit</Button>
                <DatePicker 
                    style={{margin:'0', padding:'0', width:'100%', fontSize:'28px', height:'5vh', textAlign:'center', border:'none'}} 
                    onChange={handleDateChange}
                    value={dateValue}
                    format='DD MMM YY'
                />
                <Box sx={{display:'flex', gap:'1rem'}}>
                    <MacroCounter 
                        //macroTarget={mealSet.targetCalories} 
                        macroValue={selectedMeal.totalCalories} 
                        labelText='Calories' 
                    />
                    <MacroCounter 
                        //macroTarget={mealSet.targetCalories} 
                        macroValue={selectedMeal.totalCarbs} 
                        labelText='Carbs' 
                    />
                    <MacroCounter 
                        //macroTarget={mealSet.targetCalories} 
                        macroValue={selectedMeal.totalFat} 
                        labelText='Fat' 
                    />
                    <MacroCounter 
                        //macroTarget={mealSet.targetCalories} 
                        macroValue={selectedMeal.totalProtein} 
                        labelText='Protein' 
                    />
                </Box>
                <Box sx={{width:'100%', display:'flex', gap:'1rem'}}>
                    {
                        (recipes.custom.length !== 0) && 
                            (recipes.custom.map((item, index)=>{
                                if (item === null) return
                                return (
                                    <MealCard key={index} meal={item}/>
                                )        
                            }))
                    }
                    {
                        (recipes.static.length !== 0) && 
                            (recipes.static.map((item, index)=>{
                                if (item === null) return
                                return (
                                    <StaticMealcard key={index} meal={item}/>
                                )        
                            }))
                    }
                </Box>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
            >
                <EditMealForm selectedMeal={selectedMeal} dateValue={dateValue} mealItems={mealItems}/>
            </Modal>
            
        </Box>
    )
}