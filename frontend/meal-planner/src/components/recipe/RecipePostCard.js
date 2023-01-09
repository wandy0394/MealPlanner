import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete'
import TabPanel from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, buttonStyle, postcardStyle, postcardHeight, summaryStyle, sectionStyle} from "./utility/RecipePostCardUtil";
import RecipeService from "../../service/recipe-service";

export default function RecipePostCard(props) {
    const {recipe, readOnly=false, deleteable=false, refresh} = props
    const [tabNum, setTabNum] = useState(0)
    
    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }


    async function handleAddClick() {
        const data = {
            recipe_id:recipe.recipe_id,
            recipe_name:recipe.recipe_name
        }
        const result = await RecipeService.addStaticRecipe(data)
    }

    function handleDeleteClick() {
        RecipeService.removeStaticRecipe(recipe.id)
            .then((resp)=>{
                refresh()
            })
    }

    return (
        <Box sx={postcardStyle}>
            <Box sx={{height:postcardHeight}}>
                {
                    (recipe?.recipe_images?.recipe_image !== undefined) ? 
                    (<img style={{objectFit:'cover', width:'100%', height:'100%'}} 
                        src={recipe.recipe_images.recipe_image} />) :
                    (   
                        <ImageBlank/>                   
                    )
                }  
            </Box>
            <Box sx={{height:postcardHeight}}>
                <Box sx={summaryStyle}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <Typography sx={{color:'white'}} variant='h3'>{recipe.recipe_name}</Typography>
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <InfoCard value={recipe.number_of_servings}  label='Servings'/>
                            <InfoCard value={recipe.preparation_time_min+'min'} label='Prep Time'/>
                            <InfoCard value={recipe.cooking_time_min + 'min'} label='Cook Time'/>
                        </Box>
                        <Typography sx={{color:'white'}} variant='body'>{recipe.recipe_description}</Typography>
                    </Box>
                    <Tabs value={tabNum} onChange={handleTabChange} sx={tabStyle}>
                        <Tab label='Ingredients' sx={{color:'white'}}/>
                        <Tab label='Instructions' sx={{color:'white'}}/>  
                    </Tabs>  
                        {
                            readOnly ? '' : (<IconButton disabled={readOnly} sx={buttonStyle} onClick={handleAddClick}><AddIcon/></IconButton>)
                        }
                        {
                            deleteable ? (
                                <IconButton disabled={!deleteable} 
                                    sx={{
                                        right:'0%',
                                        transform: 'translate(-3.2vw, 1.6vh)',
                                        margin:'0',
                                        padding:'0',
                                        zIndex:'2',
                                        position:'absolute',
                                        bottom:'0',
                                        aspectRatio:'1/1',
                                        backgroundColor:'goldenrod',
                                        '&:hover': {
                                            backgroundColor:'#EAEAC0'
                                        },
                                        height:'15%'
                                    }} 
                                    onClick={handleDeleteClick}>
                                        <DeleteIcon/>
                                </IconButton>) : ''
                        }
                    </Box>
                <Box sx={sectionStyle}>
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
                    </Box>
                    <Box sx={{backgroundColor:'dimgrey', height:'65%', padding:'2rem 0'}}>
                        <Stack alignItems='center' justifyContent='space-between' sx={{height:'100%'}}>
                            <InfoCard value={recipe.serving_sizes.serving.calories} label='Calories'/>
                            <InfoCard value={recipe.serving_sizes.serving.carbohydrate} label='Carbs'/>
                            <InfoCard value={recipe.serving_sizes.serving.fat} label='Fat'/>
                            <InfoCard value={recipe.serving_sizes.serving.protein} label='Protein'/>
                            <Typography variant='body2' sx={{color:'white', textAlign:'center'}}>Serving size: {recipe.serving_sizes.serving.serving_size}</Typography>
                        </Stack>
                </Box>
                </Box>

            </Box>
        </Box>
    )
}