import { Box, Typography } from "@mui/material"
import { strawTheme } from "../utility/StrawTheme"

function Row({title, total,target, unit}) {
    return (
        <>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'end'}}>
                <Typography variant="body1">
                    {title}
                </Typography>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Typography variant="h4" display='inline' sx={{color:strawTheme.palette.common.black, fontWeight:'bold'}}>
                    {total}
                </Typography>
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'start'}}>
                <Typography variant="body1" display='inline' sx={{display:'flex', alignItems:'baseline', justifyContent:'flex-start'}}>
                    {target}{unit}
                </Typography>
            </Box>
        </>
    )
}

export default function MealInfo(props) {
    const {totalCalories, totalProtein, totalCarbs, totalFat, targetCalories, targetProtein, targetFat, targetCarbs} = props

    return (
        <Box sx={{
                display:'grid', 
                gridTemplateColumns:'repeat(3, 1fr)', 
                gridTemplateRows:'repeat(5, 1fr)', 
                color:strawTheme.palette.common.black, 
                justifyContent:'center', 
                alignContent:'center',
                gap:'1rem',
                paddingTop:'2rem',
                paddingLeft:'2rem',
                borderLeft: '2px solid #9e9e9e',
            }}
        >

            <Row
                title=''
                total='Total'
                target='Target'
            />

            <Row
                title='Calories'
                total={totalCalories}
                target={targetCalories}
                unit='kcal'
            />

<           Row
                title='Carbs'
                total={totalCarbs}
                target={targetCarbs}
                unit='g'
            />
            <Row
                title='Fat'
                total={totalFat}
                target={targetFat}
                unit='g'
            />
            <Row
                title='Protein'
                total={totalProtein}
                target={targetProtein}
                unit='g'
            />

        </Box>
    )
}