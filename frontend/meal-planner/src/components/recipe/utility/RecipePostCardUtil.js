import { Box, Typography } from "@mui/material";
import {strawTheme} from "../../utility/StrawTheme"

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <>
            {(value === index) ? (
                <Box hidden={value !== index} sx={{
                    padding:'2rem 2rem 0rem 2rem', 
                    height:'100%', 
                    overflow:'auto', 
                    display:'flex', 
                    flexDirection:'column', 
                    gap:'1rem'
                }}>
                    {children}
                </Box>
            ) : ('')}
        </>
    )
}

export function InfoCard(props) {
    const {children, label, value, index, sx, ...other} = props;
    return (
        <>
            <Box sx={{...sx, display:'flex', flexDirection:'column', alignItems:'center'}}>                
                <Typography variant='h4' sx={{color:strawTheme.palette.primary.main}}>
                    {value}
                </Typography>
                <Typography variant='body2' sx={{color:strawTheme.palette.common.black, display:'flex', flexDirection:'column', alignItems:'center'}}>
                    {label} 
                </Typography>
            </Box>
           
        </>
    )    
}

export function ImageBlank() {
    return (
        <Box sx={{
            backgroundColor:strawTheme.palette.common.lightgrey2, 
            width:'100%', 
            height:'100%', 
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'center', 
            alignItems:'center'
        }}>
            <Typography sx={{padding:'2rem'}}>Image Unavailable</Typography>
        </Box>    
    )
}

export const tabStyle = {
    borderBottom:1, 
    borderColor:'divider',
    position:'absolute',
    bottom:'0',
}

export const buttonStyle = {
    left:'calc(100%)',
    transform: 'translate(-360%, 50%)',
    margin:'0',
    padding:'0',
    zIndex:'2',
    height:'15%',
    aspectRatio:'1/1',
    backgroundColor:strawTheme.palette.primary.main,
    '&:hover': {
        backgroundColor:strawTheme.palette.primary.light
    },
    position:'absolute',
    bottom:'0',
    
}

export const postcardHeight = '65vh'

export const postcardStyle = {
    display:'block',
    height:postcardHeight,
    maxHeight:postcardHeight,
    aspectRatio:'6/4', 
    display:'grid',
    gridTemplateColumns:'1fr 1fr',
    zIndex:'1',
    position:'relative'

}

export const summaryStyle = {
    backgroundColor:strawTheme.palette.common.lightgrey,
    padding:'2rem 2rem 0rem 2rem', 
    zIndex:'1', 
    height:'35%', 
    position:'relative'
}

export const sectionStyle = {
    display:'grid', 
    gridTemplateColumns:'2fr 1fr', 
    height:'100%'
}

export const MAX_CHARS = 4000

export const INITIAL_MACROS = {
    carbs:0,
    fat:0,
    protein:0,
    calories:0
}
export const INITIAL_RECIPE = {
    title:'',
    instructions:'',
    recipe_description:'',
    ingredients:{},
    macros:INITIAL_MACROS,
    counter:0,
    servings:0,
    serving_size:'1',
    prepTime:0,
    cookTime:0
}

export default TabPanel