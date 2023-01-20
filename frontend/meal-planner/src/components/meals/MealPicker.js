import { Box, Button, Typography } from "@mui/material"
import { ACTION_TYPES } from "./ActionTypes"
import MealCard from "./MealCard"
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove'


export default function MealPicker(props) {
    const {mealItems, meals, handleIncrement, handleDecrement, sx, ...other} = props

    return (
        <Box sx={sx}>
            {
                Object.entries(mealItems).map(([key, item], index)=>{
                    return (
                        <Box key={index}    sx={{display:'grid', gridTemplateColumns:'3fr 1fr'}}>
                            <MealCard key={index} id={key} meal={item} image={item.image}/>
                            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:'2rem', padding:'1rem'}}>
                                <Typography variant='h4'>{meals[key]?.qty !== undefined ? meals[key]?.qty : 0 }</Typography>
                                <Button variant='contained' sx={{aspectRatio:'1/1'}} onClick={e=>handleIncrement(key, item)}><AddIcon/></Button>
                                <Button variant='contained' sx={{aspectRatio:'1/1'}} onClick={e=>handleDecrement(key, item)}><RemoveIcon/></Button>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}