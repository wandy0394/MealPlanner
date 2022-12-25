import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllFood, useGetMealsInRange, calculateTotalMacros, getMealSets, INITIAL_MEAL } from "../components/meals/utility/MealItemUtil";
import SideMenuHeader from "../components/menu/SideMenuHeader";
import MainPane from "../layouts/MainPane";
import DateObject from 'react-date-object'
import WeekPicker from "../components/utility/WeekPicker";
import MacroWeeklySummary from "../components/meals/utility/MacroWeeklySummary";
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import MealSet from "../components/meals/MealSet";

const dayStyle = {
    position:'relative', 
    border:'1px solid #555555',
    '&:hover': {
        background:'#f5f6c9'
    },
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'1rem 1rem'
}

const active = {
    background: 'goldenrod'
}

function DayPicker(props) {
    const {active, setActive, mealSets, selectMeal, setSelectedDay} = props

    function handleClick(index, date) {
        setActive(index)
        selectMeal(date)
        setSelectedDay(date)
    }

    return (
        <Box sx={{width:'100%', height:'auto', display:'grid', gridTemplateRows:'1fr', gridTemplateColumns:'repeat(7, 1fr)'}}>
            {
                Object.keys(mealSets).map((item, index)=>{
                    const dateObj = new DateObject(item)
                    return (
                        <Box key={index} sx={{...dayStyle, background:((active === index) ? 'goldenrod' : '')}} onClick={e=>handleClick(index, item)}>
                            <Typography variant='h6' >{dateObj.format('ddd')}</Typography>
                            <Typography variant='h6' >{dateObj.day}</Typography>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

function MacroChart(props) {
    const {mealSets} = props

    ChartJS.register(
        CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
    )

    const options = {
        responsive: true,
        interaction: {
            mode:'index',
            intersect:false
        },
        maintainAspectRatio:false,
        stacked:false,
        plugins: {
            legend: {
                position:'top'
            }
        },
        title: {
            display:true,
            text:'Macros throughout the week'
        },
        scales: {
            y: {
                type:'linear',
                display:true,
                position:'left'
            },
            y1: {
                type:'linear',
                display:'true',
                position:'right',
                grid: {
                    drawOnChartArea:false
                }
            }
        }
    }

    const labels = Object.keys(mealSets).map((item)=>{
        const dateObj = new DateObject(item)
        return dateObj.format('ddd')
    })

    let macros = [
        {
            label:'Calories',
            borderColor:'rgb(255, 99, 132, 80)',
            data: [],
            yAxisID:'y1'
        },
        {
            label:'Carbs',
            borderColor:'rgb(99, 252, 132, 80)',
            data: [],
            yAxisID:'y'
        },
        {
            label:'Fat',
            borderColor:'rgb(99, 42, 242, 80)',
            data: [],
            yAxisID:'y'
        },
        {
            label:'Protein',
            orderColor:'rgb(99, 10, 42, 80)',
            data: [],
            yAxisID:'y'
        }
    ]
    Object.values(mealSets).forEach((item)=>{
        macros[0].data.push(item.totalCalories)   
        macros[1].data.push(item.totalCarbs)   
        macros[2].data.push(item.totalFat)   
        macros[3].data.push(item.totalProtein)   
    })

    const data = {
        labels,
        datasets:macros
    }

    return (
        // <Box sx={{minWidth:'100%', padding:'0', height:'100%'}}>
        // </Box>
            <Line options={options} data={data} sx={{border:'solid', width:'50vw'}}/>
    )

}

export default function Dashboard() {

    const targetDay = 1 //Monday
    const prevMonday = new DateObject()
    const numDays = (prevMonday.weekDay.index + (7-targetDay)) % 7
    prevMonday.subtract(numDays, 'days')
    const nextMonday = new DateObject(new Date())
    nextMonday.add(7-numDays, 'days')

    const [active, setActive] = useState(0)
    const [day, setDay] = useState(prevMonday)
    const [selectedDay, setSelectedDay] = useState(prevMonday.format('YYYY-M-D'))
    const [mealItems, setMealItems] = useGetAllFood()
    const [mealSets, setMealSets] = useGetMealsInRange(prevMonday.format('YYYY-M-D'), nextMonday.format('YYYY-M-D'))
    const [selectedMeal, setSelectedMeal] = useState(INITIAL_MEAL)


    useEffect(()=>{
        if (mealSets !== undefined && selectedDay !== undefined) {
            if (selectedDay in mealSets) {
                setSelectedMeal(mealSets[selectedDay])
            }
        }
    }, [selectedDay, mealSets])

    function handleWeekChange(newDate) {
        const endDate = new DateObject(newDate)
        getMealSets(newDate.format('YYYY-M-D'), (new DateObject(newDate)).add(7, 'days').format('YYYY-M-D'))
            .then((result)=>{
                setMealSets(result)
            })
        const newSelectedDate = new DateObject(newDate)
        // newSelectedDate.add(7, 'days')
        setSelectedDay(newSelectedDate.format('YYYY-M-D'))
        setActive(0)
    }

    function handleDayChange(date) {
        console.log(date)
        console.log(mealSets[date])
        setSelectedMeal(mealSets[date])
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
                    <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <DayPicker mealSets={mealSets} selectMeal={handleDayChange} setSelectedDay={setSelectedDay} active={active} setActive={setActive}/>
                        <Box sx={{display:'grid', gridTemplateRows:'1fr 2fr', gap:'1rem', height:'100%'}}>
                            <Box sx={{height:'100%'}}>
                                <MealSet mealSet={selectedMeal} dateValue={selectedDay} mealItems={mealItems} removeMeal={null}/>
                            </Box>
                            <Box sx={{height:'50%'}}>
                                <MacroChart mealSets={mealSets} />
                            </Box>
                        </Box>
                        
                    </Box>
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