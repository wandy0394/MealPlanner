import { Typography } from "@mui/material";
import { useState } from "react";
import { useGetAllFood, useGetMealsInRange, calculateTotalMacros, getMealSets } from "../components/meals/utility/MealItemUtil";
import SideMenuHeader from "../components/menu/SideMenuHeader";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import WeekPicker from "../components/utility/WeekPicker";

function DayPicker(props) {
    const {startDate, endDate} = props
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
                </>
            }
            sideContent={
                <>
                    <SideMenuHeader>
                        <Typography variant='h4'>Macro Summary</Typography>

                    </SideMenuHeader>
                </>
            }

        
        />
    )
}