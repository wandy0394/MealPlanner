import { Box, Button, Card, IconButton, Modal, Stack, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/material"
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add"
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <>
            {(value === index) ? (
                <Box hidden={value !== index} sx={{margin:'3rem 3rem'}}>
                    {children}
                </Box>
            ) : ('')}
        </>
    )
}

const style = {
    width:'50vw', 
    aspectRatio:'6/4', 
    // backgroundColor:'white',
    display:'grid',
    gridTemplateColumns:'1fr 1fr',
    zIndex:'1'

}
const buttonStyle = {
    // display:'block',
    // top:'0%',
    left:'calc(100% - 3rem)',
    transform: 'translate(0%, 50%)',
    margin:'0',
    padding:'0',
    position:'relative',
    zIndex:'2',
    height:'60px',
    aspectRatio:'1/1',
    backgroundColor:'goldenrod'
}

const tabStyle = {
    borderBottom:1, 
    borderColor:'divider',
    position:'relative',
    // border:'solid',
    transform:'translateY(60px)'
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
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                
                    <Card sx={style}>
                        <Box>
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
                        <Box sx={{display:'flex', flexDirection:'column', zIndex:'1'}}>
                            <Box sx={{backgroundColor:'grey', padding:'1rem 3rem 0rem 3rem', zIndex:'1'}}>
                                <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                    <Typography sx={{color:'white'}} variant='h3'>{recipe.recipe_name}</Typography>
                                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                                        <Box sx={{alignItems:'center', display:'flex', flexDirection:'column'}}>
                                            <Typography sx={{color:'goldenrod'}} variant='h4'>
                                                {recipe.number_of_servings} 
                                            </Typography>
                                            <Typography sx={{color:'white'}} variant='body'>
                                                Serves
                                            </Typography>
                                        </Box>
                                        <Box sx={{color:'goldenrod', alignItems:'center', display:'flex', flexDirection:'column', }}>
                                            <Typography sx={{color:'goldenrod'}} variant='h4'>
                                                {recipe.preparation_time_min}min   
                                            </Typography>
                                            <Typography sx={{color:'white'}} variant='body'>
                                                Prep Time   
                                            </Typography>
                                        </Box>
                                        <Box sx={{color:'goldenrod', alignItems:'center', display:'flex', flexDirection:'column'}}>
                                            <Typography sx={{color:'goldenrod'}} variant='h4'>
                                                {recipe.cooking_time_min}min
                                            </Typography>
                                            <Typography sx={{color:'white'}} variant='body'>
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
                            <Box sx={{flexGrow:'1', backgroundColor:'white', zIndex:'0'}}>
                                <TabPanel value={tabNum} index={0}>
                                    {
                                        recipe.ingredients.ingredient.map((item) => {
                                            return (
                                                <Typography variant='h6'>
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
                                                <Typography variant='h6'>
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

                        </Box>
                    </Card>

                

                

            </Modal>

        </div>
    )
}