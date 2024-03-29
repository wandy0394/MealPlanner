import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import IngredientService from "../../service/ingredient-service";
import { SEVERITY } from "../utility/StatusSnackbar";
import IngredientAutoComplete from "./IngredientAutocomplete";


export default function CreateIngredientForm(props) {
    const {open, handleClose, refresh, ingredients, setStatusMessageState} = props
    const [ingredientDict, setIngredientDict] = useState({})
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fat, setFat] = useState('')
    const [protein, setProtein] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [keyId, setKeyId] = useState(null)

    async function handleSaveClick(e) {
        const params = {
            name:name,
            calories:calories,
            carbs:carbs,
            fat:fat,
            protein:protein,
            food_id:null
        }
        let data
        if (isEditing) {
            params['id'] = keyId 
            data = await IngredientService.updateIngredient(params)
            setStatusMessageState({message:`Ingredient (${name}) updated.`, severity:SEVERITY.SUCCESS, isMessageVisible:true})
        }
        else {
            data = await IngredientService.addIngredient(params)
            setStatusMessageState({message:`Ingredient (${name}) added.`, severity:SEVERITY.SUCCESS, isMessageVisible:true})
        }
        handleClose()
        refresh()
    }

    function handleCaloriesChange(e) {
        setCalories(e.target.value)
    }

    function handleCarbsChange(e) {
        setCarbs(e.target.value)
    }

    function handleFatChange(e) {
        setFat(e.target.value)
    }

    function handleProteinChange(e) {
        setProtein(e.target.value)
    }
    useEffect(()=> {
        const newDict = ingredients.reduce((result, item) => {
            return {...result, 
                [item.id]: {
                    name:item.name, 
                    calories:item.calories, 
                    fat:item.fat, 
                    protein:item.protein, 
                    carbs:item.carbs
                }
            }
        }, {})
        setIngredientDict(newDict)
    }, [ingredients])

    function populateMacros(value, id) {
        if (value === null) return
        const {name} = value
        if (!(id in ingredientDict)) {
            setCalories('')
            setFat('')
            setProtein('')
            setCarbs('')  
            setName(name)
            setKeyId(null)
            setIsEditing(false)

        }
        else {
            setCalories(ingredientDict[id].calories)
            setFat(ingredientDict[id].fat)
            setProtein(ingredientDict[id].protein)
            setCarbs(ingredientDict[id].carbs)
            setName(ingredientDict[id].name)
            setKeyId(id)
            setIsEditing(true)
        }
    }

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>                
                <DialogTitle>Edit your ingredients</DialogTitle>
                <DialogContent sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                    <IngredientAutoComplete
                        ingredients={(ingredients).map((item)=> {
                            return {name:item.name, id:item.id}
                        })}
                        dispatch={populateMacros}
                    />
                    <TextField variant='standard' label='Calories' type='number'
                        value={calories}
                        onChange={handleCaloriesChange} 
                        InputProps ={{
                            inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>
                        }}
                    />
                    <TextField variant='standard' label='Carbs' type='number'
                        value={carbs}
                        onChange={handleCarbsChange} 
                        InputProps ={{
                            inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>
                        }}
                    />
                    <TextField variant='standard' label='Protein' type='number' 
                        value={protein}
                        onChange={handleProteinChange}
                        InputProps ={{
                            inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>
                        }}
                    />
                    <TextField variant='standard' label='Fats' type='number'
                        value={fat}
                        onChange={handleFatChange} 
                        InputProps ={{
                            inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveClick}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}