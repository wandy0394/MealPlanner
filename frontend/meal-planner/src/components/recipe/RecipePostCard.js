import { Box, Button, Card, IconButton, Modal, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material"
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add"

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <>
            {(value === index) ? (
                <Box hidden={value !== index} sx={{padding:'3rem 3rem 0rem 3rem', height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:'1rem'}}>
                    {children}
                </Box>
            ) : ('')}
        </>
    )
}
function MacroCard(props) {
    const {children, label, value, index, sx, ...other} = props;
    return (
        <>
            <Box sx={{...sx, width:'75%', display:'flex', flexDirection:'column', alignItems:'center'}}>                
                <Typography variant='h4' sx={{color:'goldenrod'}}>
                    {value}
                </Typography>
                <Typography variant='body2' sx={{color:'white', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    {label} 
                </Typography>
            </Box>
           
        </>
    )    
}
const style = {
    // width:'50vw', 
    display:'block',
    height:'80vh',
    maxHeight:'80vh',
    aspectRatio:'6/4', 
    // backgroundColor:'white',
    display:'grid',
    gridTemplateColumns:'1fr 1fr',
    zIndex:'1',
    position:'relative'

}
const buttonStyle = {
    // display:'block',
    // top:'0%',
    left:'calc(100%)',
    transform: 'translate(-280%, 50%)',
    // transform: 'translate(-10vw, 0)',
    margin:'0',
    padding:'0',
    // position:'relative',
    zIndex:'2',
    height:'15%',
    aspectRatio:'1/1',
    backgroundColor:'goldenrod',
    '&:hover': {
        backgroundColor:'#EAEAC0'
    },
    position:'absolute',
    bottom:'0',
    
}

const tabStyle = {
    borderBottom:1, 
    borderColor:'divider',
    position:'absolute',
    bottom:'0'
    // marginTop:'1rem'
    // border:'solid',
    //transform:'translateY(60px)'
}
export default function RecipePostCard(props) {
    const {recipe, open, handleClose} = props

    const [tabNum, setTabNum] = useState(0)
    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{display:'grid', justifyContent:'center', alignItems:'center'}}
            >
                
                    <Box sx={style}>
                        <Box sx={{height:'80vh'}}>
                            {
                                (recipe?.recipe_images?.recipe_image !== undefined) ? 
                                (<img style={{objectFit:'cover', width:'100%', height:'100%'}} 
                                    src={recipe.recipe_images.recipe_image} />) :
                                (   
                                    <Box sx={{backgroundColor:'lightgrey', width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                        <Typography variant='h4'>Image Unavailable</Typography>
                                    </Box>                    
                                )
                                    
                            }  
                        </Box>
                        <Box sx={{height:'80vh'}}>
                            <Box sx={{backgroundColor:'gray', padding:'1rem 3rem 0rem 3rem', zIndex:'1', height:'35%', position:'relative'}}>
                                <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                    <Typography sx={{color:'white'}} variant='h3'>{recipe.recipe_name}</Typography>
                                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Box sx={{alignItems:'center', display:'flex', flexDirection:'column'}}>
                                            <Typography sx={{color:'goldenrod'}} variant='h4'>
                                                {recipe.number_of_servings} 
                                            </Typography>
                                            <Typography sx={{color:'white'}} variant='body2'>
                                                Serves
                                            </Typography>
                                        </Box>
                                        <Box sx={{color:'goldenrod', alignItems:'center', display:'flex', flexDirection:'column', }}>
                                            <Typography sx={{color:'goldenrod'}} variant='h4'>
                                                {recipe.preparation_time_min}min   
                                            </Typography>
                                            <Typography sx={{color:'white'}} variant='body2'>
                                                Prep Time   
                                            </Typography>
                                        </Box>
                                        <Box sx={{color:'goldenrod', alignItems:'center', display:'flex', flexDirection:'column'}}>
                                            <Typography sx={{color:'goldenrod'}} variant='h4'>
                                                {recipe.cooking_time_min}min
                                            </Typography>
                                            <Typography sx={{color:'white'}} variant='body2'>
                                                Cooking Time      
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography sx={{color:'white'}} variant='body'>{recipe.recipe_description}</Typography>
                                </Box>
                                <Tabs value={tabNum} onChange={handleTabChange} sx={tabStyle}>
                                    <Tab label='Ingredients' sx={{}}/>
                                    <Tab label='Instructions' sx={{}}/>  
                                    <Tab label='Macros' sx={{}}/>  
                                </Tabs>  
                                <IconButton sx={buttonStyle}><AddIcon/></IconButton>
                                </Box>
                            <Box sx={{display:'grid', gridTemplateColumns:'2fr 1fr', height:'100%'}}>
                                <Box sx={{backgroundColor:'white', height:'65%', maxHeight:'65%'}}>
                                    <TabPanel value={tabNum} index={0}>
                                        {
                                            recipe.ingredients.ingredient.map((item, index) => {
                                                return (
                                                    <Typography variant='body' key={index}>
                                                        {item.ingredient_description}
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabNum} index={1}>
                                        {
                                            recipe.directions.direction.map((item) => {
                                                return (
                                                    <Typography variant='body' key={item.direction_number}>
                                                        {item.direction_number}: {item.direction_description}
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </TabPanel>
                                    <TabPanel value={tabNum} index={2}>
                                        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                            <Typography variaint='body'>Serving size: {recipe.serving_sizes.serving.serving_size}</Typography>
                                        </Box>
                                    </TabPanel>
                                </Box>
                                <Box sx={{backgroundColor:'dimgrey', height:'65%', padding:'3rem 0'}}>
                                        <Stack alignItems='center' justifyContent='space-around' sx={{height:'100%'}}>
                                            <MacroCard value={recipe.serving_sizes.serving.calories} label='Calories'/>
                                            <MacroCard value={recipe.serving_sizes.serving.carbohydrate} label='Carbs'/>
                                            <MacroCard value={recipe.serving_sizes.serving.fat} label='Fat'/>
                                            <MacroCard value={recipe.serving_sizes.serving.protein} label='Protein'/>
                                        </Stack>
                                        <Typography variant='body2' sx={{color:'white', textAlign:'center'}}>Serving size: {recipe.serving_sizes.serving.serving_size}</Typography>
                                </Box>
                            </Box>

                        </Box>
                    </Box>

                

                

            </Modal>

        </div>
    )
}