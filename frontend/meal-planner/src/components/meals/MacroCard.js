import { Box, Typography } from "@mui/material"
import { strawTheme } from "../utility/StrawTheme"

export default function MacroCard({type, value, units, variant='h4'}) {
    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:'0rem', alignItems:'center', justifyContent:'center'}}>
            <Box>
                <Typography sx={{display:'inline', color:strawTheme.palette.common.black, fontWeight:'bold'}} variant={variant}>
                    {value}
                </Typography>
                <Typography sx={{display:'inline', color:strawTheme.palette.common.black}} variant='body1'>
                    {units}
                </Typography>  
            </Box>
            <Typography variant='body' sx={{color:strawTheme.palette.common.black}}>
                {type}
            </Typography>
        </Box>
    )
}

export function MacroSummary({totalCalories, totalCarbs, totalFat, totalProtein, directionX, directionY, sx, variant, servings=null}) {

    return (
        <Box sx={{display:'flex', flexDirection:directionX, gap:'1rem', alignItems:'center', justifyContent:'space-evenly', ...sx}}>
            <Box sx={{display:'flex'}}>
                <MacroCard type='Calories' value={totalCalories} units='kcal'variant={variant}/>  
            </Box>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:directionY, gap:'1rem'}}>
                <MacroCard type='Carbs' value={totalCarbs} units='g'variant={variant}/>
                <MacroCard type='Fat' value={totalFat} units='g'variant={variant}/>
                <MacroCard type='Protein' value={totalProtein} units='g'variant={variant}/>
                {
                    (servings) ?  (<MacroCard type='Servings' value={servings} variant={variant}/>):''
                }
            </Box>

        </Box>
    )
}