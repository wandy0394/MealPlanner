import { Box, SpeedDial, SpeedDialAction, Tab, Tabs, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Stack } from "@mui/system";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit'
import TabPanel, { postcardHeight } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, postcardStyle, controlStyle, summaryStyle, sectionStyle, MAX_CHARS} from "./utility/RecipePostCardUtil";
import {UnitConverter} from "../utility/Units"
import { strawTheme } from "../utility/StrawTheme";
import IngredientsPaneRead from "./IngredientsPaneRead";
import RecipeService from "../../service/recipe-service";
import { SEVERITY } from "../utility/StatusSnackbar";


const calculator = new UnitConverter()

export default function ReadCustomRecipePostCard(props) {
    const {recipe, readOnly, setReadOnly, refresh, setStatusMessageState=null} = props
    const [tabNum, setTabNum] = useState(0)

    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    function handleDeleteClick() {
        RecipeService.removeRecipe(recipe.recipe_id)
            .then((resp)=>{
                refresh()
            })

        if (setStatusMessageState !== null) {
            setStatusMessageState({message:'Recipe deleted.', severity:SEVERITY.SUCCESS, isMessageVisible:true})
        }
    }
    function handleEditClick(e) {
        setReadOnly(false)
    }

    const dialStyle = {
        margin:'0',
        padding:'0',
        height:'100%',
    }
    return (
    
        <Box sx={postcardStyle}>
            <Box sx={{height:postcardHeight, display:'flex', flexDirection:'column'}}>
                <ImageBlank/>                   
                <Box sx={summaryStyle}>
                    <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <Typography sx={{color:strawTheme.palette.common.black}} variant='h3'>{recipe.title}</Typography>
                        <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        
                            <InfoCard value={recipe.servings}  label='Servings'/>
                            <InfoCard value={recipe.prepTime+'min'} label='Prep Time'/>
                            <InfoCard value={recipe.cookTime + 'min'} label='Cook Time'/>
                        </Box>
                        <Typography sx={{color:strawTheme.palette.common.black}} variant='body'>{recipe.recipe_description}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{height:postcardHeight, display:'grid', gridTemplateRows:'10% 90%'}}>
                <Box sx={controlStyle}>

                    <Tabs value={tabNum} onChange={handleTabChange} sx={tabStyle}>
                        <Tab label='Ingredients' sx={{color:strawTheme.palette.common.black}}/>
                        <Tab label='Instructions' sx={{color:strawTheme.palette.common.black}}/>  
                    </Tabs>  
                    {
                        readOnly && 

                        (
                            <SpeedDial
                            ariaLabel='Speed Dial More Icon'
                            sx={dialStyle}
                            direction='left'
                            icon={<MoreVertIcon/>}
                            FabProps={{size:'small'}}
                        >
                            <SpeedDialAction
                                key='Edit'
                                icon={<EditIcon/>}
                                onClick={handleEditClick}
                            />
                            <SpeedDialAction
                                
                                key='Delete'
                                icon={<DeleteIcon/>}
                                onClick={handleDeleteClick}
                            />
                        </SpeedDial>
                        )
                    }
                </Box>

                <Box sx={sectionStyle}>
                    <Box sx={{backgroundColor:strawTheme.palette.common.white, height:'100%', maxHeight:'100%', overflowY:'hidden'}}>
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
                                value={recipe.instructions}
                                disabled
                                inputProps={{maxLength:MAX_CHARS}}
                            />
                        </TabPanel>
                    </Box>
                    <Box sx={{backgroundColor:strawTheme.palette.common.grey, height:'100%', padding:'2rem 0'}}>
                        <Stack alignItems='center' justifyContent='space-between' sx={{height:'100%'}}>
                            <InfoCard value={recipe.macros.calories} label='Calories'/>
                            <InfoCard value={recipe.macros.carbs} label='Carbs'/>
                            <InfoCard value={recipe.macros.fat} label='Fat'/>
                            <InfoCard value={recipe.macros.protein} label='Protein'/>
                            <Typography variant='body2' sx={{color:strawTheme.palette.common.black, textAlign:'center'}}>Serving size: {recipe.serving_size}</Typography>
                        </Stack>
                    </Box>
                </Box>

            </Box>
        </Box>

        
    )
}