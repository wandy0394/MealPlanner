import { Box, Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
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
    counter:0,
    servings:0,
    prepTime:0,
    cookTime:0
}
const calculator = new UnitConverter()

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
        }
        catch (e) {
            console.error(e)
        }
    }
    function reducer (state, action) {
        const {type, payload} = action
        switch(type) {
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
            default:
                return state
        }
    }

    return [recipe, dispatch]
}



export default function RecipeContent(props) {

    const {recipeId} = props
    const [readOnly, setReadOnly] = useState(true)
    const [recipe, dispatch] = useGetRecipe(recipeId)

    function handleInstructionChange(e) {
        dispatch({type:ACTION_TYPES.SET_INSTRUCTIONS, payload:e.target.value})
    }

    function handleEditClick(e) {
        setReadOnly(false)
        console.log(recipe)
    }

    async function handleSaveClicked(e) {
        e.preventDefault();
        const data = {
            title:recipe.title,
            ingredients:recipe.ingredients,
            instructions:recipe.instructions,
            macros:recipe.macros,
            servings:recipe.servings,
            cookTime:recipe.cookTime,
            prepTime:recipe.prepTime
        }
        setReadOnly(true)
        DataService.updateRecipe(data, recipeId)
    }

    function handleCancelClicked() {
        setReadOnly(true)
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

    return (
        <Stack>
            <form onSubmit={handleSaveClicked}>
                <Grid container spacing={3} sx={{padding:'1rem', border:''}}>
                <Grid item xs={12} md={12}>
                        <Box sx={{dsplay:'flex'}}>
                            {
                             readOnly ? ( 
                                <Button variant='contained' sx={{width:'100%'}} onClick={handleEditClick}>
                                    <EditIcon/>
                                    <Typography variant='body' sx={{padding:'0 1rem'}}>Edit</Typography>
                                </Button>   
                             ) : null
                                
                            }
                            {
                                readOnly ? (
                                    null
                                ) : (
                                    <Box sx ={{display:'flex', gap: '1rem'}}>
                                        <Button variant='contained' type='submit' sx={{width:'100%'}} onClick={handleSaveClicked}>
                                            <SaveIcon/>
                                            <Typography variant='body' sx={{padding:'0 1rem'}}>Save</Typography>
                                        </Button>
                                        <Button variant='contained' type='submit' sx={{width:'100%'}} onClick={handleCancelClicked}>
                                            <CancelIcon/>
                                            <Typography variant='body' sx={{padding:'0 1rem'}}>Cancel</Typography>
                                        </Button>
                                    </Box>
                                )
                            }
  
                        </Box>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <RecipeNameInput
                            title={recipe?.title}
                            prepTime={recipe?.prepTime}
                            cookTime={recipe?.cookTime}
                            servings={recipe?.servings}
                            dispatch={dispatch}
                            readOnly={readOnly}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
                            <Nutrition macros={recipe?.macros} />
                    </Grid>
                    

                    <Grid item sm={12} md={6} sx={{width:'100%'}}>
                        <IngredientsPane 
                            recipeIngredients={recipe?.ingredients}
                            dispatch={dispatch}
                            isDisabled={false}
                            readOnly={readOnly}
                        />
                    </Grid>

                    <Grid item sm={12} md={6} >
                        <Paper elevation={3} sx={{height:'50vh', padding:'1rem'}}>
                            <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                                <Box sx={{display:'flex', alignItems:'center',gap:'1rem'}}>
                                    <Typography variant='h6'>Instructions</Typography>
                                    <Typography variant='body'> {recipe?.instructions.length}/{MAX_CHARS}</Typography> 
                                </Box>
                            
                                <TextField variant='standard' label='Write your instructions here' 
                                        multiline 
                                        required 
                                        sx={{width:'100%', height:'90%'}}
                                        maxRows={20}
                                        value={recipe.instructions}
                                        onChange = {handleInstructionChange}
                                        inputProps={{maxLength:MAX_CHARS}}
                                        disabled={readOnly}
                                    >
                                    
                                </TextField>
                            </Box>
                        </Paper>    
                    </Grid>

                </Grid>

            </form>
        </Stack>
    )
}