import { Box, Typography } from "@mui/material"
import { strawTheme } from "../utility/StrawTheme"

function Row({title, total,target, unit}) {
    return (
        <Box sx={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:'2rem', width:'100%', padding:'0, 2rem'}}>
            <Typography variant="body1" sx={{}}>
                {title}
            </Typography>
            <Box sx={{display:'flex', alignItems:'baseline', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline' sx={{color:strawTheme.palette.common.black, fontWeight:'bold'}}>
                    {total}
                </Typography>
                <Typography variant="body1" display='inline'>/{target}{unit}</Typography>
            </Box>
        </Box>
    )
}

export default function MealInfo(props) {
    const {totalCalories, totalProtein, totalCarbs, totalFat, targetCalories, targetProtein, targetFat, targetCarbs} = props

    return (
        <Box sx={{
                display:'grid', 
                gridTemplateColumns:'1fr', 
                gridTemplateRows:'repeat(5, 1fr)', 
                color:strawTheme.palette.common.black, 
                justifyContent:'center', 
                alignContent:'center',
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