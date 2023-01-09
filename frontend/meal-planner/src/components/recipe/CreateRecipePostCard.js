import { Box, IconButton, Tab, Tabs, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useReducer, useState } from "react";
import IngredientsPane from "./IngredientsPane";
import {UnitConverter} from "../utility/Units"
import { ACTION_TYPES } from "./utility/ActionTypes";
import TabPanel, { postcardHeight } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, buttonStyle, postcardStyle, summaryStyle, sectionStyle, INITIAL_RECIPE, MAX_CHARS} from "./utility/RecipePostCardUtil";
import RecipeService from "../../service/recipe-service";


const calculator = new UnitConverter()

export default function CreateRecipePostCard(props) {
    const {readOnly=false} = props
    const [recipe, dispatch] = useReducer(reducer, INITIAL_RECIPE)
    const [tabNum, setTabNum] = useState(0)
    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    function reducer (state, action) {
        const {type, payload} = action
        switch(type) {
            case ACTION_TYPES.SET_TITLE:
                return {...state, title:payload}
            case ACTION_TYPES.SET_MACROS:
                return {...state, macros:payload}
            case ACTION_TYPES.SET_INSTRUCTIONS:
                return {...state, instructions:payload}
            case ACTION_TYPES.SET_COUNTER:
                return {...state, counter:payload}
            case ACTION_TYPES.SET_INGREDIENTS:
                return {...state, ingredients:payload}
            case ACTION_TYPES.UPDATE_INGREDIENTS:
                return {...state, ingredients:{...state.ingredients, [payload.id]:payload.data}}
            case ACTION_TYPES.INCREMENT_COUNTER:
                return{...state, counter: state.counter + 1}
            case ACTION_TYPES.ADD_INGREDIENT:
                return {...state, ingredients:{...state.ingredients, [state.counter]:payload}, counter:state.counter+1} 
            case ACTION_TYPES.DELETE_INGREDIENT:
                const newIngredients = {...state.ingredients}
                delete newIngredients[payload]
                return {...state, ingredients:newIngredients}    
            case ACTION_TYPES.UPDATE_QTY:
                return {...state, 
                    ingredients:{
                        ...state.ingredients, 
                        [payload.id]:{
                            ...state.ingredients[payload.id], 
                            qty:payload.data
                        }
                    }
                }
            case ACTION_TYPES.UPDATE_UNIT:
                return {...state, 
                    ingredients:{
                        ...state.ingredients, 
                        [payload.id]:{
                            ...state.ingredients[payload.id], 
                            unit:payload.data
                        }
                    }
                }
            case ACTION_TYPES.SET_SERVINGS:
                return {...state, servings:payload}
            case ACTION_TYPES.SET_PREP_TIME:
                return {...state, prepTime:payload}
            case ACTION_TYPES.SET_COOK_TIME:
                return {...state, cookTime:payload}
            case ACTION_TYPES.SET_SERVING_SIZE:
                return {...state, serving_size:payload}
            case ACTION_TYPES.SET_RECIPE_DESCRIPTION:
                return {...state, recipe_description:payload}
            default:
                return state
        }
    }

    useEffect(()=> {
        const newMacros = {
            carbs:parseFloat(calculator.calculateCarbs(recipe.ingredients)).toFixed(2),
            fat:parseFloat(calculator.calculateFat(recipe.ingredients)).toFixed(2),
            protein:parseFloat(calculator.calculateProtein(recipe.ingredients)).toFixed(2),
            calories:parseFloat(calculator.calculateCalories(recipe.ingredients)).toFixed(2)
        }
        dispatch({type:ACTION_TYPES.SET_MACROS, payload: newMacros})
    }, [recipe.ingredients])



    function handleInstructionChange(e) {
        dispatch({type:ACTION_TYPES.SET_INSTRUCTIONS, payload:e.target.value})
    }


    async function handleSaveClicked(e) {
        e.preventDefault();
        const data = {
            title:recipe.title,
            servings:recipe.servings,
            servings_size:recipe.serving_size,
            cookTime:recipe.cookTime,
            prepTime:recipe.prepTime,
            ingredients:recipe.ingredients,
            instructions:recipe.instructions,
            recipe_description:recipe.recipe_description,
            macros:recipe.macros
        }
        const result = await RecipeService.addRecipe(data)
    }


    return (
    
        <form onSubmit={handleSaveClicked}>
            <Box sx={{...postcardStyle, gridTemplateColumns:'1fr 2fr'}}>
                <Box sx={{height:postcardHeight}}>
                    <ImageBlank/>                   
                </Box>
                <Box sx={{height:postcardHeight}}>
                    <Box sx={summaryStyle}>
                        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                            
                            <TextField 
                                placeholder='Recipe Name' 
                                required 
                                variant='standard'
                                value={recipe.title}
                                onChange={e=>dispatch({type:ACTION_TYPES.SET_TITLE, payload:e.target.value})}
                            />
                            <Box sx={{display:'flex', justifyContent:'space-between', gap:'3rem'}}>
                                    <InfoCard 
                                        value={<TextField 
                                                required 
                                                variant='standard' 
                                                inputProps={{min:0, type:'number'}}
                                                value={recipe.servings}
                                                onChange={e=>dispatch({type:ACTION_TYPES.SET_SERVINGS, payload:e.target.value})}
                                                />}
                                        label='Servings*'
                                    />
                                    <InfoCard 
                                        value={<TextField 
                                                required 
                                                variant='standard' 
                                                inputProps={{min:0, type:'number'}}
                                                value={recipe.prepTime}
                                                onChange={e=>dispatch({type:ACTION_TYPES.SET_PREP_TIME, payload:e.target.value})}
                                                />}
                                        label='Prep Time*'
                                    />
                                    <InfoCard 
                                        value={<TextField 
                                                required 
                                                variant='standard'
                                                inputProps={{min:0, type:'number'}}
                                                value={recipe.cookTime}
                                                onChange={e=>dispatch({type:ACTION_TYPES.SET_COOK_TIME, payload:e.target.value})}
                                                />}
                                        label='Cook Time*'
                                    />
                            </Box>
                            <TextField 
                                variant='standard' 
                                placeholder='Recipe Description' 
                                value={recipe.recipe_description} 
                                onChange={e=>dispatch({type:ACTION_TYPES.SET_RECIPE_DESCRIPTION, payload:e.target.value})}
                            />
                        </Box>
                        <Tabs value={tabNum} onChange={handleTabChange} sx={tabStyle}>
                            <Tab label='Ingredients' sx={{color:'white'}}/>
                            <Tab label='Instructions' sx={{color:'white'}}/>  
                        </Tabs>  
                            {
                                readOnly ? '' : (<IconButton disabled={readOnly} sx={buttonStyle} type='submit'><SaveIcon/></IconButton>)
                            }
                        </Box>

                    <Box sx={sectionStyle}>
                        <Box sx={{backgroundColor:'white', height:'65%', maxHeight:'65%'}}>
                            <TabPanel value={tabNum} index={0}>
                                <IngredientsPane 
                                    recipeIngredients={recipe.ingredients}
                                    dispatch={dispatch}
                                    isDisabled={false}
                                />
                            </TabPanel>
                            <TabPanel value={tabNum} index={1}>
                                <TextField variant='standard' label='Write your instructions here' 
                                    multiline 
                                    required 
                                    sx={{width:'100%', height:'90%'}}
                                    maxRows={20}
                                    value={recipe.instructions}
                                    onChange = {handleInstructionChange}
                                    inputProps={{maxLength:MAX_CHARS}}
                                />
                          
                            </TabPanel>
                        </Box>
                        <Box sx={{backgroundColor:'dimgrey', height:'65%', padding:'3rem 0'}}>
                                <Stack alignItems='center' justifyContent='space-between' sx={{height:'100%'}}>
                                    <InfoCard value={recipe.macros.calories} label='Calories'/>
                                    <InfoCard value={recipe.macros.carbs} label='Carbs'/>
                                    <InfoCard value={recipe.macros.fat} label='Fat'/>
                                    <InfoCard value={recipe.macros.protein} label='Protein'/>
                                    <InfoCard value='1' label='Serving Size'/>
                                </Stack>
                        </Box>
                    </Box>

                </Box>
            </Box>

        </form>
        
    )
}