import { Box, Typography, FormControl, InputLabel, Select, Button, TextField, Autocomplete, MenuItem, IconButton } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import UndoIcon from "@mui/icons-material/Undo"
import units from "../utility/Units";
import { useEffect } from "react";
import { ACTION_TYPES } from "./utility/ActionTypes";
import { strawTheme } from "../utility/StrawTheme";



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
            
            <TextField 
                variant='standard'
                type='number' 
                InputProps={{inputProps:{min:0}}} 
                sx={{width:'15%'}}
                onChange={(e)=>{handleQtyChange(e, keyID)}}
                value={recipeIngredients[keyID]['qty']}
                disabled={isDisabled || (recipeIngredients[keyID].operation === 'delete')}
            />
            <FormControl sx={{width:'15%'}}>
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
            <FormControl sx={{width:'50%'}}>
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
                    <IconButton 
                        onClick={e=>handleUndoRemoveIngredient(e, keyID)}
                        disabled={isDisabled}
                        sx={{color:strawTheme.palette.primary.main}}
                    >
                        <UndoIcon />
                    </IconButton>
                ) : ( 
                    <IconButton
                        variant='outlined' 
                        onClick={e=>handleRemoveIngredient(e, keyID)}
                        disabled={isDisabled}
                        sx={{color:strawTheme.palette.secondary.main}}

                    >
                        <RemoveIcon />
                    </IconButton>
                )
            }
        </Box>
    )
}