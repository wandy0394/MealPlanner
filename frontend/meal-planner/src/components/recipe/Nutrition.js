import { Box, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";


const FIELDS = {
    carbs:'Carbs (g)',
    protein:'Protein (g)',
    fat: 'Fat (g)',
    calories:'Calories (kcal)'
}
export default function Nutrition({macros}) {
    return (
        <Paper elevation={3} sx={{padding:'1rem', height:'100%', width:'100%'}}>
            <Typography variant='h6'>Nutrition</Typography>  
            <Box sx={{display:'flex', gap:'2rem', justifyContent:'space-around', paddingTop:'1rem'}}>
                {
                    Object.entries(macros).map(([key, data]) => {
                        return (
                            <Card sx={{flexGrow:1, display:'flex', alignItems:'center', flexDirection:'column'}}>

                                <CardContent>
                                    <Typography variant='h5'>{data}</Typography>  
                                </CardContent>                    
                                <CardContent>
                                    <Typography variant='body'>{FIELDS[key]}</Typography>  
                                </CardContent>
                            </Card>
                        )
                    })

                }
            </Box>

        </Paper>
    )
}