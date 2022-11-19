import { Box, Paper, Divider, Button } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox'

export default function SearchIngredientResults({data}) {
    return (
        <Box>
            <Paper sx={{height:'5vh', display:'flex', alignItems:'center'}}>
                <Box sx={{width:'10%', height: '100%'}}>{data.food_id}</Box>
                <Divider orientation='vertical'/>
                <Box sx={{width:'30%', height: '100%'}}>{data.food_name}</Box>
                <Divider orientation='vertical'/>
                <Box sx={{width:'60%', height: '100%'}}>{data.food_description}</Box>
                <Divider orientation='vertical'/>
                <Button>
                    <AddBoxIcon/>
                </Button>
            </Paper>
        </Box>
    )
}