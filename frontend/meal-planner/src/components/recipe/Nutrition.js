import { Box, Paper, Typography } from "@mui/material";



export default function Nutrition({macros}) {
    return (
        <Paper elevation={3}>
            <Typography variant='h6'>Nutrition</Typography>  
            <Box sx={{display:'flex', gap:'2rem'}}>
                <Typography variant='body'>Calories: {macros.calories}</Typography>  
                <Typography variant='body'>Carbs: {macros.carbs}</Typography>  
                <Typography variant='body'>Protein: {macros.protein}</Typography>  
                <Typography variant='body'>Fat: {macros.fat}</Typography>  
            </Box>

        </Paper>
    )
}