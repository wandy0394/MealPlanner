import { Box, SpeedDial, SpeedDialAction, Tab, Tabs, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Stack } from "@mui/system";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit'
import TabPanel, { postcardHeight } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, postcardStyle, summaryStyle, sectionStyle, MAX_CHARS} from "./utility/RecipePostCardUtil";
import {UnitConverter} from "../utility/Units"

import IngredientsPaneRead from "./IngredientsPaneRead";


const calculator = new UnitConverter()

export default function ReadCustomRecipePostCard(props) {
    const {recipe, readOnly, setReadOnly} = props

    // const [recipe, dispatch] = useGetRecipe(recipeId)
    const [tabNum, setTabNum] = useState(0)

    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    function handleCancelClicked() {
        // dispatch({type:ACTION_TYPES.RESET_RECIPE})
        setReadOnly(true)
    }
    function handleEditClick(e) {
        setReadOnly(false)
        console.log('edit')
        console.log(recipe)
    }

    const dialStyle = {
        right:'0%',
        transform: 'translate(-3vw, 4vh) scale(85%)',
        margin:'0',
        padding:'0',
        zIndex:'2',
        height:'100%',
        position:'absolute',
        bottom:'0',
    }
    return (
    
        <Box sx={postcardStyle}>
            <Box sx={{height:postcardHeight}}>
                <ImageBlank/>                   
            </Box>
            <Box sx={{height:postcardHeight}}>
                <Box sx={summaryStyle}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <Typography sx={{color:'white'}} variant='h3'>{recipe.title}</Typography>
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        
                            <InfoCard value={recipe.servings}  label='Servings'/>
                            <InfoCard value={recipe.prepTime+'min'} label='Prep Time'/>
                            <InfoCard value={recipe.cookTime + 'min'} label='Cook Time'/>
                        </Box>
                        <Typography sx={{color:'white'}} variant='body'>{recipe.recipe_description}</Typography>
                    </Box>
                    <Tabs value={tabNum} onChange={handleTabChange} sx={tabStyle}>
                        <Tab label='Ingredients' sx={{color:'white'}}/>
                        <Tab label='Instructions' sx={{color:'white'}}/>  
                    </Tabs>  
                    {
                        readOnly && 

                        (
                            <SpeedDial
                            ariaLabel='Speed Dial More Icon'
                            sx={dialStyle}
                            icon={<MoreVertIcon/>}
                        >
                            <SpeedDialAction
                                key='Edit'
                                icon={<EditIcon/>}
                                onClick={handleEditClick}
                            />
                            <SpeedDialAction
                                
                                key='Delete'
                                icon={<DeleteIcon/>}
                                onClick={handleCancelClicked}
                            />
                        </SpeedDial>
                        )
                    }
                </Box>

                <Box sx={sectionStyle}>
                    <Box sx={{backgroundColor:'white', height:'65%', maxHeight:'65%'}}>
                        <TabPanel value={tabNum} index={0}>
                            {    
                                Object.entries(recipe.ingredients).map(([keyID, ingrObj], index)=> {
                                    return (
                                        <IngredientsPaneRead 
                                            keyID={keyID}
                                            ingredient={ingrObj}
                                            key={keyID}
                                        />
                                    )
                                })
                            }
                        </TabPanel>
                        <TabPanel value={tabNum} index={1}>
                            <TextField variant='standard'
                                multiline 
                                required 
                                sx={{width:'100%', height:'100%'}}
                                maxRows={20}
                                value={recipe.instructions}
                                disabled
                                inputProps={{maxLength:MAX_CHARS}}
                            />
                        </TabPanel>
                    </Box>
                    <Box sx={{backgroundColor:'dimgrey', height:'65%', padding:'2rem 0'}}>
                        <Stack alignItems='center' justifyContent='space-between' sx={{height:'100%'}}>
                            <InfoCard value={recipe.macros.calories} label='Calories'/>
                            <InfoCard value={recipe.macros.carbs} label='Carbs'/>
                            <InfoCard value={recipe.macros.fat} label='Fat'/>
                            <InfoCard value={recipe.macros.protein} label='Protein'/>
                            <Typography variant='body2' sx={{color:'white', textAlign:'center'}}>Serving size: {recipe.serving_size}</Typography>
                        </Stack>
                    </Box>
                </Box>

            </Box>
        </Box>

        
    )
}