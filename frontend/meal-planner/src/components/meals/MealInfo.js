import { Box, Typography } from "@mui/material"

export default function MealInfo(props) {
    const {totalCalories, totalProtein, totalCarbs, totalFat, targetCalories, targetProtein, targetFat, targetCarbs} = props

    return (
        <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr 1fr 1fr 1fr', color:'white', justifyContent:'center', alignContent:'center'}}>

            <Typography variant="body1" sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'2rem'}}></Typography>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline' sx={{color:'goldenrod'}}>Total</Typography>
                <Typography variant="body1" display='inline'>/Target</Typography>
            </Box>

                <Typography variant="body1" sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'2rem'}}>Calories</Typography>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline' sx={{color:'goldenrod'}}>{totalCalories}</Typography>
                <Typography variant="body1"display='inline'>/{targetCalories}kcal</Typography>

            </Box>
            <Typography variant="body1" sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'2rem'}}>Carbs</Typography>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline'sx={{color:'goldenrod'}}>{totalCarbs}</Typography>
                <Typography variant="body1" display='inline'>/{targetCarbs}g</Typography>
            </Box>
            
            
            <Typography variant="body1" sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'2rem'}}>Fat</Typography>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline'sx={{color:'goldenrod'}}>{totalFat}</Typography>
                <Typography variant="body1" display='inline'>/{targetFat}g</Typography>
            </Box>

            <Typography variant="body1" sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'2rem'}}>Protein</Typography>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline'sx={{color:'goldenrod'}}>{totalProtein}</Typography>
                <Typography variant="body1" display='inline'>/{targetProtein}g</Typography>
            </Box>
        </Box>
    )
}