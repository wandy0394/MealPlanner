import AddBox from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import { Paper, Stack, Box, Typography, Modal, Button, IconButton, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import CreateMealForm from "../components/meals/CreateMealForm";
import MealList from "../components/meals/MealList";
import { useGetAllFood, useGetMeals, useGetMealsInRange } from "../components/meals/utility/MealItemUtil";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MealService from "../service/meal-service";

function DatePicker(props) {
    const {day, setDay, handleDateChange} = props


    function incrementWeek() {
        const newDay = new DateObject()
        newDay.setDate(day.add(7, 'days'))
        setDay(newDay)
        handleDateChange(newDay)
    }

    function decrementWeek() {
        const newDay = new DateObject()
        newDay.setDate(day.subtract(7, 'days'))
        setDay(newDay)
        handleDateChange(newDay)
    }

    return (
        <Box sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', gap:'2rem', paddingBottom:'2rem'}}>
            <Button variant='contained' onClick={decrementWeek}><ChevronLeftIcon/></Button>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='h3'>{day.format('ddd DD/MM/YY')}</Typography>
                <Typography variant='subtitle'>Week starting</Typography>
            </Box>
            <Button variant='contained' onClick={incrementWeek}><ChevronRightIcon/></Button>

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
    const [mealSets, setMealSets] = useGetMealsInRange(prevMonday.format('YYYY-MM-DD'), nextMonday.format('YYYY-MM-DD'))

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function removeMeal(key) {
        const newMealSets = {...mealSets}
        delete newMealSets[key]
        setMealSets(newMealSets)
    }

    function handleDateChange(newDate) {
        console.log(newDate.format('YYYY-MM-DD'))
        const endDate = new DateObject(newDate)
        
        MealService.getMealsInRange(newDate.format('YYYY-MM-DD'), endDate.add(7, 'days'))
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
                    <IconButton onClick={handleClickOpen}><AddIcon/></IconButton>
                </>
            }
            mainContent={
                <>
                    <DatePicker day={day} setDay={setDay} handleDateChange={handleDateChange}/>
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
        >
        </MainPane>
    )
}