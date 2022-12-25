import DateObject from 'react-date-object'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Button, Typography } from '@mui/material'

export default function WeekPicker(props) {
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
        <Box sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'baseline', gap:'2rem', padding:'1rem'}}>
            <Button variant='contained' onClick={decrementWeek}><ChevronLeftIcon/></Button>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Typography variant='h3'>{day.format('ddd DD/MM/YY')}</Typography>
                <Typography variant='subtitle'>Week starting</Typography>
            </Box>
            <Button variant='contained' onClick={incrementWeek}><ChevronRightIcon/></Button>

        </Box>
    )
}