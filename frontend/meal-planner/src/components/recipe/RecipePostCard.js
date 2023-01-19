import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from '@mui/icons-material/Delete'
import TabPanel, { controlStyle } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, buttonStyle, postcardStyle, postcardHeight, summaryStyle, sectionStyle} from "./utility/RecipePostCardUtil";
import RecipeService from "../../service/recipe-service";
import {strawTheme} from "../utility/StrawTheme"
import { SEVERITY } from "../utility/StatusSnackbar";

export default function RecipePostCard(props) {
    const {recipe, id, readOnly=false, deleteable=false, refresh, removeStaticRecipe, setStatusMessageState=null} = props
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
        if (setStatusMessageState !== null) {
            setStatusMessageState({message:`Recipe (${recipe.recipe_name}) added.`, severity:SEVERITY.SUCCESS, isMessageVisible:true})
        }
    }

    function handleDeleteClick() {
        RecipeService.removeStaticRecipe(recipe.id)
            .then((resp)=>{
                if (setStatusMessageState !== null) {
                    setStatusMessageState({message:'Recipe deleted.', severity:SEVERITY.SUCCESS, isMessageVisible:true})
                }
                removeStaticRecipe(recipe.id)
            })
    }

    return (
        <Box sx={postcardStyle}>
            <Box sx={{height:postcardHeight, display:'flex', flexDirection:'column'}}>
                {
                    (recipe?.recipe_images?.recipe_image !== undefined) ? 
                    (<img style={{objectFit:'cover', width:'100%', height:'100%'}} 
                        src={recipe.recipe_images.recipe_image} />) :
                    (   
                        <ImageBlank/>                   
                    )
                }  
                <Box sx={summaryStyle}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <Typography sx={{color:strawTheme.palette.common.black}} variant='h3'>{recipe.recipe_name}</Typography>
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <InfoCard value={recipe.number_of_servings}  label='Servings'/>
                            <InfoCard value={recipe.preparation_time_min+'min'} label='Prep Time'/>
                            <InfoCard value={recipe.cooking_time_min + 'min'} label='Cook Time'/>
                        </Box>
                        <Typography sx={{color:strawTheme.palette.common.black}} variant='body'>{recipe.recipe_description}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{height:postcardHeight, display:'grid', gridTemplateRows:'10% 90%'}}>
                <Box sx={controlStyle}>
                    <Tabs value={tabNum} onChange={handleTabChange} sx={{...tabStyle}}>
                        <Tab label='Ingredients' sx={{color:strawTheme.palette.common.black}}/>
                        <Tab label='Instructions' sx={{color:strawTheme.palette.common.black}}/>  
                    </Tabs>
                        {
                            readOnly ? 
                                '' : 
                                (<IconButton 
                                    disabled={readOnly} 
                                    sx={buttonStyle} 
                                    onClick={handleAddClick}
                                >
                                    <AddIcon/>
                                </IconButton>)
                        }
                        {
                            deleteable ? (
                                <IconButton disabled={!deleteable} 
                                    sx={buttonStyle} 
                                    onClick={handleDeleteClick}>
                                        <DeleteIcon/>
                                </IconButton>) : ''
                        }
                </Box>
                <Box sx={sectionStyle}>
                    <Box sx={{backgroundColor:strawTheme.palette.common.white, height:'100%', maxHeight:'100%', overflowY:'hidden'}}>
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
                    <Box sx={{backgroundColor:strawTheme.palette.common.grey, height:'100%', padding:'2rem 0'}}>
                        <Stack alignItems='center' justifyContent='space-between' sx={{height:'100%'}}>
                            <InfoCard value={recipe.serving_sizes.serving.calories} label='Calories'/>
                            <InfoCard value={recipe.serving_sizes.serving.carbohydrate} label='Carbs'/>
                            <InfoCard value={recipe.serving_sizes.serving.fat} label='Fat'/>
                            <InfoCard value={recipe.serving_sizes.serving.protein} label='Protein'/>
                            <Typography variant='body2' sx={{color:strawTheme.palette.common.black, textAlign:'center'}}>
                                Serving size: {recipe.serving_sizes.serving.serving_size}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}