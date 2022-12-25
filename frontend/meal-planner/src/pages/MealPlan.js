import AddBox from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import { Paper, Stack, Box, Typography, Modal, Button, IconButton, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import CreateMealForm from "../components/meals/CreateMealForm";
import MealList from "../components/meals/MealList";
import { useGetAllFood, useGetMeals } from "../components/meals/utility/MealItemUtil";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function DatePicker(props) {
    const {handleDateChange} = props
    const targetDay = 1
    const prevMonday = new DateObject()

    const [day, setDay] = useState(new DateObject())
    const [temp, setTemp] = useState(0)

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
            {/* <TextField value={day.format('ddd DD/MM/YY')}/> */}
            <Button variant='contained' onClick={incrementWeek}><ChevronRightIcon/></Button>

        </Box>
    )
}

export default function MealPlans() {
    const [open, setOpen] = useState(false)
    const [mealItems, setMealItems] = useGetAllFood()
    const [mealSets, setMealSets] = useGetMeals()

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
                    <DatePicker handleDateChange={handleDateChange}/>
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