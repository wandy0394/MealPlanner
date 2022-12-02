import { Box, Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useReducer, useState } from "react";
import DataService from "../../service/data-service";
import Nutrition from "./Nutrition";
import IngredientsPane from "./IngredientsPane";
import RecipeNameInput from "./RecipeNameInput";
import {UnitConverter} from "../utility/Units"
import { ACTION_TYPES } from "./ActionTypes";

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
    ingredients:{},
    macros:INITIAL_MACROS,
    counter:0
}
const calculator = new UnitConverter()

export default function CreateRecipeForm2() {
    const [recipe, dispatch] = useReducer(reducer, INITIAL_RECIPE)

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
                delete newIngredients[payload.id]
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
            ingredients:recipe.ingredients,
            instructions:recipe.instructions,
            macros:recipe.macros
        }
        console.log(data)
        //const result = await DataService.addRecipe(data)
    }


    return (
        <Stack>
            <form onSubmit={handleSaveClicked}>
                <RecipeNameInput
                    title={recipe.title}
                    dispatch={dispatch}
                />
                <Grid container spacing={2} sx={{padding:'1rem', border:''}}>

                    <Grid item xs={12} md={8} sx={{width:'100%'}}>
                        <IngredientsPane 
                            recipeIngredients={recipe.ingredients}
                            dispatch={dispatch}
                            isDisabled={false}
                        />
                        <Box>
                            
                            <TextField variant='outlined' label='Instructions' 
                                multiline 
                                required 
                                sx={{width:'100%'}}
                                rows={4}
                                value={recipe.instructions}
                                onChange = {handleInstructionChange}
                                inputProps={{maxLength:MAX_CHARS}}
                            >
                                
                            </TextField>
                            <Typography>Count: {recipe.instructions.length}/{MAX_CHARS}</Typography>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>
                            <Typography variant='h6'>Add an Image</Typography> 
                        </Paper>
                        <Nutrition macros={recipe.macros} />

                    </Grid>
                    
                </Grid>
            </form>
        </Stack>
    )
}