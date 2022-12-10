import { Box, Typography, FormControl, InputLabel, Select, Button, TextField, Autocomplete, MenuItem } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import UndoIcon from "@mui/icons-material/Undo"
import units from "../utility/Units";
import { useEffect } from "react";
import { ACTION_TYPES } from "./ActionTypes";



export default function IngredientsPaneEntry({keyID, recipeIngredients, dispatch, ingredients, isDisabled}) {

    function handleQtyChange(e, id) {
        dispatch({type:ACTION_TYPES.UPDATE_QTY, payload:{id:id, data:e.target.value}})
    }
    function handleRemoveIngredient(e, id) {
        dispatch({type:ACTION_TYPES.DELETE_INGREDIENT, payload:id})
    }
    function handleUndoRemoveIngredient(e, id) {
        dispatch({type:ACTION_TYPES.UNDO_DELETE_INGREDIENT, payload:id})
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
        dispatch({type:ACTION_TYPES.UPDATE_INGREDIENTS, payload:payload})
    }

    function getFoodByFoodId(id) {
        return (ingredients.filter((item)=> {
            return item.id === id
        }))[0]
    }

    return (
        <Box key={keyID} sx={{width:'100%', display:'flex', justifyContent:'space-around', alignItems:'flex-end'}}>
            {/* <Typography variant='body' sx={{}}>ID: {keyID}</Typography> */}
            <TextField 
                variant='standard'
                type='number' 
                label='Qty' 
                InputProps={{inputProps:{min:0}}} 
                sx={{width:'15%'}}
                onChange={(e)=>{handleQtyChange(e, keyID)}}
                value={recipeIngredients[keyID]['qty']}
                disabled={isDisabled || (recipeIngredients[keyID].operation === 'delete')}
            />
            <FormControl sx={{width:'20%'}}>
                <InputLabel>Units</InputLabel>
                <Select
                    label='units'
                    variant='standard'
                    onChange={e=>handleUnitChange(e,keyID)}
                    value={recipeIngredients[keyID]['unit']}
                    disabled={isDisabled || (recipeIngredients[keyID].operation === 'delete')}
                >
                    {
                        Object.entries(units).map(([keyID, value])=> {
                            return <MenuItem key={keyID} value={value}>{value}</MenuItem> 
                        })
                    }
                </Select> 
            </FormControl>
            <FormControl sx={{width:'40%'}}>
                <InputLabel>Ingredient</InputLabel>
                <Select
                    label='Name'
                    variant='standard'
                    value={recipeIngredients[keyID]['food_id']}
                    onChange={e=>handleIngredientChange(e,keyID)}
                    sx={{minWidth:'0'}}
                    disabled={isDisabled || (recipeIngredients[keyID].operation === 'delete')} 
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
            {
                (recipeIngredients[keyID].operation === 'delete') ? (
                    <Button 
                        variant='outlined' 
                        onClick={e=>handleUndoRemoveIngredient(e, keyID)}
                        disabled={isDisabled}
                    >
                        <UndoIcon />
                    </Button>
                ) : ( 
                    <Button 
                        variant='outlined' 
                        onClick={e=>handleRemoveIngredient(e, keyID)}
                        disabled={isDisabled}
                    >
                        <RemoveIcon />
                    </Button>
                )
            }
        </Box>
    )
}