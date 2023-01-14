import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import IngredientService from "../../service/ingredient-service";
import { SEVERITY } from "../utility/StatusSnackbar";


export default function SaveIngredientForm(props) {
    const {open, handleClose, ingredient, setStatusMessageState} = props
    const [name, setName] = useState('')
    const [calories, setCalories] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fat, setFat] = useState(0)
    const [protein, setProtein] = useState(0)
    const [message, setMessage] = useState('')

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

        data = await IngredientService.addIngredient(params)
        setStatusMessageState({message:`Ingredient (${name}) added.`, severity:SEVERITY.SUCCESS, isMessageVisible:true})
        
        handleClose()
    }

    useEffect(()=>{
        if (ingredient.normalised) {
            setCarbs(ingredient.carbs)
            setFat(ingredient.fat)
            setProtein(ingredient.protein)
            setCalories(ingredient.calories)
            setMessage('')
        }
        else {
            setCarbs(0)
            setFat(0)
            setProtein(0)
            setCalories(0)
            setMessage('Unrecognized serving size. Please estimate macros per 100g.')
        }
        setName(ingredient.name)
    }, [ingredient])



    function handleCaloriesChange(e) {
        setCalories(e.target.value)
    }

    function handleNameChange(e) {
        setName(e.target.value)
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



    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>                
                <DialogTitle>Add ingredient</DialogTitle>
                <DialogContent sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                    <TextField variant='standard' label='Name' 
                        value={name}
                        onChange={handleNameChange} 
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
                    <Typography variant='body2'>
                        {message}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveClick}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}