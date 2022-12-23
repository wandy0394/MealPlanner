import { Box, Button, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import IngredientsPane from "./IngredientsPane";
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import TabPanel, { postcardHeight } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, buttonStyle, postcardStyle, summaryStyle, sectionStyle, MAX_CHARS} from "./utility/RecipePostCardUtil";
import {UnitConverter} from "../utility/Units"
import { ACTION_TYPES } from "./utility/ActionTypes";
import useGetRecipe from "./utility/useGetRecipe";
import RecipeService from "../../service/recipe-service";
import IngredientsPaneRead from "./IngredientsPaneRead";


const calculator = new UnitConverter()

export default function CustomRecipePostCard(props) {
    const {recipeId} = props

    const [readOnly, setReadOnly] = useState(true)
    const [recipe, dispatch] = useGetRecipe(recipeId)
    const [tabNum, setTabNum] = useState(0)
    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    // useEffect(()=> {
    //     console.log(recipe)
    // }, [])

    // useEffect(()=> {
    //     const newMacros = {
    //         carbs:parseFloat(calculator.calculateCarbs(recipe.ingredients)).toFixed(2),
    //         fat:parseFloat(calculator.calculateFat(recipe.ingredients)).toFixed(2),
    //         protein:parseFloat(calculator.calculateProtein(recipe.ingredients)).toFixed(2),
    //         calories:parseFloat(calculator.calculateCalories(recipe.ingredients)).toFixed(2)
    //     }
    //     dispatch({type:ACTION_TYPES.SET_MACROS, payload: newMacros})
    // }, [recipe.ingredients])



    function handleInstructionChange(e) {
        dispatch({type:ACTION_TYPES.SET_INSTRUCTIONS, payload:e.target.value})
    }


    async function handleSaveClicked(e) {
        e.preventDefault();
        const data = {
            title:recipe.title,
            ingredients:recipe.ingredients,
            instructions:recipe.instructions,
            macros:recipe.macros,
            servings:recipe.servings,
            serving_size:recipe.serving_size,
            recipe_description:recipe.recipe_description,
            cookTime:recipe.cookTime,
            prepTime:recipe.prepTime
        }
        setReadOnly(true)
        console.log(data)
        console.log('saved')
        RecipeService.updateRecipe(data, recipeId)
    }
    function handleCancelClicked() {
        dispatch({type:ACTION_TYPES.RESET_RECIPE})
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
                            ariaLabel='Speed Dial Save Icon'
                            sx={dialStyle}
                            icon={<EditIcon/>}
                            onClick={handleEditClick}
                        >
                            <SpeedDialAction
                                
                                key='Delete'
                                icon={<DeleteIcon/>}
                                onClick={handleCancelClicked}
                            />
                        </SpeedDial>
                        )
                    }
                    {
                        !readOnly &&
                        (
                            <SpeedDial
                                ariaLabel='Speed Dial Save Icon'
                                sx={dialStyle}
                                icon={<SaveIcon/>}
                                onClick={handleSaveClicked}
                            >
                                <SpeedDialAction
                                    key='Delete'
                                    icon={<CancelIcon/>}
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
                            {/* <InfoCard value={recipe.serving_size} label='Serving Size'/> */}
                            <Typography variant='body2' sx={{color:'white', textAlign:'center'}}>Serving size: {recipe.serving_size}</Typography>
                            
                            {/* <TextField value={recipe.serving_size} onChange={e=>dispatch({type:ACTION_TYPES.SET_SERVING_SIZE, payload:e.target.value})}/> */}
                        </Stack>
                    </Box>
                </Box>

            </Box>
        </Box>

        
    )
}