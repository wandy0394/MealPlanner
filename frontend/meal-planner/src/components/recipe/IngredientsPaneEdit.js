import { Box, Typography, FormControl, InputLabel, Select, Button, TextField, Autocomplete, MenuItem } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import units from "../utility/Units";
import { useEffect } from "react";
import { ACTION_TYPES } from "./ActionTypes";



export default function IngredientsPaneEntry({keyID, recipeIngredients, dispatch, ingredients, isDisabled}) {

    //console.log(recipeIngredients)
    //console.log(ingredients)
    function handleQtyChange(e, id) {
        dispatch({type:ACTION_TYPES.UPDATE_QTY, payload:{id:id, data:e.target.value}})
    }
    function handleRemoveIngredient(e, id) {
        dispatch({type:ACTION_TYPES.DELETE_INGREDIENT, payload:id})
    }
    function handleUnitChange(e, id) {
        dispatch({type:ACTION_TYPES.UPDATE_UNIT, payload:{id:id, data:e.target.value}})
    }
    function handleIngredientChange(e, id) {
        const food = getFoodByFoodId(parseInt(e.target.value))
        const payload = {
            id:id,
            data:{
                ...recipeIngredients[id],
                carbs:food.carbs,
                protein:food.protein,
                calories:food.calories,
                fat: food.fat,
                food_id:food.id,
                name:food.name,
            }
        }
        console.log(payload)
        dispatch({type:ACTION_TYPES.UPDATE_INGREDIENTS, payload:payload})
    }

    function getFoodByFoodId(id) {
        return (ingredients.filter((item)=> {
            return item.id === id
        }))[0]
    }

    return (
        <Box key={keyID} sx={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
            <Typography variant='body' sx={{}}>ID: {keyID}</Typography>
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
                        sx={{minWidth:'20vw'}}
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