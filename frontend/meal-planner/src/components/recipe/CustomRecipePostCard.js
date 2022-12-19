import { Box, Button, FormControl, FormGroup, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useReducer, useState } from "react";
import DataService from "../../service/data-service";
import Nutrition from "./Nutrition";
import IngredientsPane from "./IngredientsPane";
import RecipeNameInput from "./RecipeNameInput";
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import TabPanel, { postcardHeight } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, buttonStyle, postcardStyle, summaryStyle, sectionStyle} from "./utility/RecipePostCardUtil";
import {UnitConverter} from "../utility/Units"
import { ACTION_TYPES } from "./ActionTypes";
import styled from "@emotion/styled";

const MAX_CHARS = 4000


const INITIAL_MACROS = {
    carbs:0,
    fat:0,
    protein:0,
    calories:0
}
const INITIAL_RECIPE = {
    title:'',
    instructions:'',
    recipe_description:'',
    ingredients:{},
    macros:INITIAL_MACROS,
    counter:0,
    servings:0,
    serving_size:'',
    prepTime:0,
    cookTime:0
}
const calculator = new UnitConverter()
let originalRecipe
function useGetRecipe(id) {
    const [recipe, dispatch] = useReducer(reducer, INITIAL_RECIPE)
    let called = false
    useEffect(()=> {        
        if (!called) getRecipe(id)
        return () => {
            called = true
        }
    }, [])
    async function getRecipe(id) {
        try {
            console.log('Refreshing recipe')
            const result = await DataService.getStoredRecipe(id)
            dispatch({type:ACTION_TYPES.SET_RECIPE, payload:result[id]})
            originalRecipe = result[id]
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    function reducer (state, action) {
        const {type, payload} = action
        switch(type) {
            case ACTION_TYPES.RESET_RECIPE:
                return {...originalRecipe, counter:originalRecipe.counter+1}
            case ACTION_TYPES.SET_RECIPE:
                return {...payload, counter:payload.counter+1}
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
                let newIngredients = {...state.ingredients}
                newIngredients[payload].operation = 'delete'
                return {...state, ingredients:newIngredients}    
            case ACTION_TYPES.UNDO_DELETE_INGREDIENT: 
                let temp = {...state.ingredients}
                temp[payload].operation = 'update'
                return {...state, ingredients:temp}    
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

    return [recipe, dispatch]
}


export default function CustomRecipePostCard(props) {
    const {recipeId} = props

    const [readOnly, setReadOnly] = useState(true)
    const [recipe, dispatch] = useGetRecipe(recipeId)
    const [tabNum, setTabNum] = useState(0)
    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    useEffect(()=> {
        console.log(recipe)
    }, [])

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
        DataService.updateRecipe(data, recipeId)
    }
    function handleCancelClicked() {
        dispatch({type:ACTION_TYPES.RESET_RECIPE})
        setReadOnly(true)
    }
    function handleEditClick(e) {
        setReadOnly(false)
        console.log(recipe)
    }
    return (
    
        <form onSubmit={handleSaveClicked}>
            <Box sx={postcardStyle}>
                <Box sx={{height:postcardHeight}}>
                    <ImageBlank/>                   
                </Box>
                <Box sx={{height:postcardHeight}}>
                    <Box sx={summaryStyle}>
                        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                            
                            <TextField 
                                helperText='Recipe Name' 
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
                                helperText='Recipe Description' 
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
                            {
                                readOnly ? ( 
                                    <Button variant='contained' sx={{width:'100%'}} onClick={handleEditClick}>
                                        <EditIcon/>
                                        <Typography variant='body' sx={{padding:'0 1rem'}}>Edit</Typography>
                                    </Button>   
                                ) : null
                            }
                            {
                                !readOnly && (<Button variant='contained' type='submit' sx={{width:'100%'}} onClick={handleCancelClicked}>
                                    <CancelIcon/>
                                    <Typography variant='body' sx={{padding:'0 1rem'}}>Cancel</Typography>
                                </Button>)
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
                                    <TextField value={recipe.serving_size} onChange={e=>dispatch({type:ACTION_TYPES.SET_SERVING_SIZE, payload:e.target.value})}/>
                                </Stack>
                        </Box>
                    </Box>

                </Box>
            </Box>

        </form>
        
    )
}