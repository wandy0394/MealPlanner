import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useGetAllFood, useGetMealsInRange, calculateTotalMacros, getMealSets } from "../components/meals/utility/MealItemUtil";
import SideMenuHeader from "../components/menu/SideMenuHeader";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import WeekPicker from "../components/utility/WeekPicker";
import MacroWeeklySummary from "../components/meals/utility/MacroWeeklySummary";

const dayStyle = {
    position:'relative', 
    border:'1px solid #555555',
    '&:hover': {
        background:'#f5f6c9'
    }
}

const active = {
    background: 'goldenrod'
}

function DayPicker(props) {
    const {mealSets} = props
    const [active, setActive] = useState(0)

    function handleClick(index) {
        setActive(index)
    }

    return (
        <Box sx={{width:'100%', height:'5vh', display:'grid', gridTemplateRows:'1fr', gridTemplateColumns:'repeat(7, 1fr)'}}>
            {
                Object.keys(mealSets).map((item, index)=>{
                    const dateObj = new DateObject(item)
                    return (
                        <Box key={index} sx={{...dayStyle, background:((active === index) ? 'goldenrod' : '')}} onClick={e=>handleClick(index)}>
                            <Typography variant='h5' sx={{position:'absolute', top:0, left:0, padding:'1rem',}}>{dateObj.format('ddd')}</Typography>
                            <Typography variant='h5' sx={{position:'absolute', bottom:0, right:0, padding:'1rem'}}>{dateObj.day}</Typography>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default function Dashboard() {

    const targetDay = 1 //Monday
    const prevMonday = new DateObject()
    const numDays = (prevMonday.weekDay.index + (7-targetDay)) % 7
    prevMonday.subtract(numDays, 'days')
    const nextMonday = new DateObject(new Date())
    nextMonday.add(7-numDays, 'days')

    const [day, setDay] = useState(prevMonday)
    const [mealItems, setMealItems] = useGetAllFood()
    const [mealSets, setMealSets] = useGetMealsInRange(prevMonday.format('YYYY-M-D'), nextMonday.format('YYYY-M-D'))



    function handleWeekChange(newDate) {
        const endDate = new DateObject(newDate)
        getMealSets(newDate.format('YYYY-M-D'), (new DateObject(newDate)).add(7, 'days').format('YYYY-M-D'))
            .then((result)=>{
                setMealSets(result)
                console.log(result)
            })
    }

    return (
        <MainPane
            title='Weekly Summary'
            headerContent = {
                <>
                    <WeekPicker day={day} setDay={setDay} handleDateChange={handleWeekChange}/>
                </>
            }
            mainContent={
                <>
                    <DayPicker mealSets={mealSets} />
                </>
            }
            sideContent={
                <>
                    <SideMenuHeader>
                        <Typography variant='h4'>Macro Summary</Typography>
                    </SideMenuHeader>
                    <MacroWeeklySummary mealSets={mealSets}/>
                </>
            }

        
        />
    )
}