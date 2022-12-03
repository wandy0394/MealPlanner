import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material"
import { useState } from "react";
import DataService from "../service/data-service";


export default function AddIngredientModel({open, handleClose, refresh}) {
    const [name, setName] = useState('')
    const [calories, setCalories] = useState(null)
    const [carbs, setCarbs] = useState(null)
    const [fat, setFat] = useState(null)
    const [protein, setProtein] = useState(null)

    async function handleAddClick(e) {
        const params = {
            name:name,
            calories:calories,
            carbs:carbs,
            fat:fat,
            protein:protein,
            food_id:null
        }
        const data = await DataService.addIngredient(params)
        console.log(data)
        handleClose()
        refresh()
    }

    function handleNameChange(e) {
        setName(e.target.value)
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

    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>                
                <DialogTitle>Add your own ingredient</DialogTitle>
                <DialogContent sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                    <TextField variant='standard' label='Name'
                        onChange={handleNameChange} required></TextField>
                    <TextField variant='standard' label='Calories' type='number'
                        onChange={handleCaloriesChange} 
                        InputProps ={{ inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Carbs' type='number'
                        onChange={handleCarbsChange} 
                        InputProps ={{inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Protein' type='number' 
                        onChange={handleProteinChange}
                        InputProps ={{inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Fats' type='number'
                        onChange={handleFatChange} 
                        InputProps ={{inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClick}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}