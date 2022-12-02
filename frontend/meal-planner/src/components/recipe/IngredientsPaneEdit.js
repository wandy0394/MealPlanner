import { Box, Typography, FormControl, InputLabel, Select, Button, TextField, Autocomplete, MenuItem } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import units from "../utility/Units";
import { useEffect } from "react";
import { ACTION_TYPES } from "./ActionTypes";


const INITIAL = {
    qty:0, 
    name:"", 
    unit:"g",
    fat:0,
    calories:0,
    protein:0,
    carbs:0,
    food_id:''
}
export default function IngredientsPaneEntry({keyID, recipeIngredients, dispatch, ingredients, isDisabled}) {

    function handleQtyChange(e, id) {
        console.log(id)
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[id]['qty'] = e.target.value
        // setRecipeIngredients(newRecipeIngredients)        
        dispatch({type:ACTION_TYPES.SET_INGREDIENTS, payload:newRecipeIngredients})
    }
    function handleRemoveIngredient(e, id) {
        const newRecipeIngredients = {...recipeIngredients}
        delete newRecipeIngredients[id]
        // setRecipeIngredients(newRecipeIngredients)
        dispatch({type:ACTION_TYPES.SET_INGREDIENTS, payload:newRecipeIngredients})

    }
    function handleUnitChange(e, id) {
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[id]['unit'] = e.target.value
        // setRecipeIngredients(newRecipeIngredients)
        dispatch({type:ACTION_TYPES.SET_INGREDIENTS, payload:newRecipeIngredients})

    }
    function handleIngredientChange(e, id) {
        const food = getFoodByFoodId(parseInt(e.target.value))
        const newRecipeIngredients = {...recipeIngredients}
        const payload = {
            id:id,
            data:{
                ...recipeIngredients[id],
                carbs:food.carbs,
                protein:food.protein,
                calories:food.calories,
                fat: food.fat,
                food_id:food.id,
                name:food.name
            }
        }
        dispatch({type:ACTION_TYPES.UPDATE_INGREDIENTS, payload:payload})
    }

    function getFoodByFoodId(id) {
        return (ingredients.filter((item)=> {
            return item.id === id
        }))[0]
    }

    return (
        <Box key={keyID} sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
            <Typography variant='body' sx={{}}>ID: {keyID}</Typography>
            <Box>
                <TextField 
                    type='number' 
                    label='Qty' 
                    InputProps={{inputProps:{min:0}}} 
                    sx={{width:'100px'}}
                    onChange={(e)=>{handleQtyChange(e, keyID)}}
                    value={recipeIngredients[keyID]['qty']}
                    disabled={isDisabled}
                />
                <FormControl sx={{minWidth:'100px'}}>
                    <InputLabel>Units</InputLabel>
                    <Select
                        label='units'
                        onChange={e=>handleUnitChange(e,keyID)}
                        value={recipeIngredients[keyID]['unit']}
                        disabled={isDisabled}
                    >
                        {
                            Object.entries(units).map(([keyID, value])=> {
                                return <MenuItem key={keyID} value={value}>{value}</MenuItem> 
                            })
                        }
                    </Select> 
                </FormControl>
                <FormControl>
                    <InputLabel>Ingredient</InputLabel>
                    <Select
                        label='Name'
                        value={recipeIngredients[keyID]['food_id']}
                        onChange={e=>handleIngredientChange(e,keyID)}
                        sx={{minWidth:'300px'}}
                        disabled={isDisabled}
                    >   
                        {
                            ingredients.map((item)=>{
                                return (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Box> 
            <Button 
                variant='outlined' 
                onClick={e=>handleRemoveIngredient(e, keyID)}
                disabled={isDisabled}
            >
                <RemoveIcon />
            </Button>
        </Box>
    )
}