import { Typography, Dialog } from "@mui/material";
import { useState } from "react";
// import CreateMealForm from "../components/meals/CreateMealForm - deleteMe";
import MealList from "../components/meals/MealList";
import { useGetAllFood, useGetMealsInRange, getMealSets, INITIAL_MEAL } from "../components/meals/utility/MealItemUtil";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import SideMenuHeader from "../components/menu/SideMenuHeader";
import WeekPicker from "../components/utility/WeekPicker";
import MacroWeeklySummary from "../components/meals/utility/MacroWeeklySummary";


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
                    {/* <Dialog
                        open={open}
                        onClose={handleClose}
                        sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
                    >
                        <CreateMealForm mealItems={mealItems} handleClose={handleClose}/>
                    </Dialog> */}
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