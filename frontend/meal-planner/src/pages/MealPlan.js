import { Box, Typography, Button, IconButton, Dialog, Stack, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import CreateMealForm from "../components/meals/CreateMealForm";
import MealList from "../components/meals/MealList";
import { useGetAllFood, useGetMealsInRange, getMealSets, INITIAL_MEAL, calculateTotalMacros } from "../components/meals/utility/MealItemUtil";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import SideMenuHeader from "../components/menu/SideMenuHeader";
import WeekPicker from "../components/utility/WeekPicker";




function MacroWeeklyCard(props) {
    const {value, target, name, unit} = props
    let percentage = 0
    if (target === 0) {
        percentage = 0
    }
    else if (value > target) {
        percentage = 100
    }
    else {
        percentage = value/target*100
    }
    return (
        <Box sx={{height:'auto', width:'75%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
            <Box sx={{position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center', flexDirection:'column', width:'100%', aspectRatio:'1/1'}}>
                <CircularProgress 
                    variant='determinate' 
                    value={(percentage>100)?100:percentage} 
                    size='75%'
                    sx={{zIndex:'1'}}
                />
                    
                <Box sx={{
                        position:'absolute', 
                        display:'flex', 
                        flexDirection:'column',
                        alignItems:'center', 
                        justifyContent:'center', 
                        top:0, 
                        left:0, 
                        bottom:0,
                        right:0,
                        margin:0,
                        padding:0,
                        zIndex:'2',
                    }}
                >
                        <Typography variant='h4'>{value}</Typography>
                        <Typography variant='body2'>/{target} {unit}</Typography>
                </Box>
            </Box>
            <Typography variant='h4'>{name}</Typography>
        </Box>
    )
}

function MacroWeeklySummary({mealSets}) {
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

export default function MealPlans() {
    
    const targetDay = 1 //Monday
    const prevMonday = new DateObject()
    const numDays = (prevMonday.weekDay.index + (7-targetDay)) % 7
    prevMonday.subtract(numDays, 'days')
    const nextMonday = new DateObject(new Date())
    nextMonday.add(7-numDays, 'days')
    const [day, setDay] = useState(prevMonday)
    
    const [open, setOpen] = useState(false)
    const [mealItems, setMealItems] = useGetAllFood()
    const [mealSets, setMealSets] = useGetMealsInRange(prevMonday.format('YYYY-M-D'), nextMonday.format('YYYY-M-D'))

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function removeMeal(key) {
        const newMealSets = {...mealSets}
        newMealSets[key] = INITIAL_MEAL
        setMealSets(newMealSets)
    }

    function handleDateChange(newDate) {
        const endDate = new DateObject(newDate)
        getMealSets(newDate.format('YYYY-M-D'), (new DateObject(newDate)).add(7, 'days').format('YYYY-M-D'))
            .then((result)=>{
                console.log(result)
                setMealSets(result)
            })
    }
    return (
        <MainPane
            title='What do you plan to eat?'
            buttons={
                <>
                    {/* <IconButton onClick={handleClickOpen}><AddIcon/></IconButton> */}
                </>
            }
            headerContent={
                <>
                    <WeekPicker day={day} setDay={setDay} handleDateChange={handleDateChange}/> 
                </>
            }
            mainContent={
                <>
                    <MealList mealSets={mealSets} mealItems={mealItems} removeMeal={removeMeal}/>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
                    >
                        <CreateMealForm mealItems={mealItems}/>
                    </Dialog>
                </>
            }

            sideContent={
                <>
                    <SideMenuHeader>
                        <Typography variant='h4'>Weekly Stats</Typography>
                    </SideMenuHeader>
                    <MacroWeeklySummary mealSets={mealSets}/>
                </>
            }
        >
        </MainPane>
    )
}