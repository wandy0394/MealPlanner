import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import DataService from "../../service/data-service";
import IngredientAutoComplete from "./IngredientAutocomplete";


export default function CreateIngredientForm(props) {
    const {open, handleClose, refresh, ingredients} = props
    const [ingredientDict, setIngredientDict] = useState({})
    const [name, setName] = useState('')
    const [calories, setCalories] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fat, setFat] = useState('')
    const [protein, setProtein] = useState('')

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
        console.log(newDict)
        setIngredientDict(newDict)
    }, [ingredients])

    function populateMacros(value, id) {
        
        if (value === null) return
        const {name} = value
        console.log(name)
        if (!(id in ingredientDict)) {
            setCalories('')
            setFat('')
            setProtein('')
            setCarbs('')  
            setName(name)
        }
        else {
            setCalories(ingredientDict[id].calories)
            setFat(ingredientDict[id].fat)
            setProtein(ingredientDict[id].protein)
            setCarbs(ingredientDict[id].carbs)
            setName(ingredientDict[id].name)
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


                    
                    {/* <TextField variant='standard' label='Name'
                        onChange={handleNameChange} required></TextField> */}
                    <TextField variant='standard' label='Calories' type='number'
                        value={calories}
                        onChange={handleCaloriesChange} 
                        InputProps ={{ inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Carbs' type='number'
                        value={carbs}
                        onChange={handleCarbsChange} 
                        InputProps ={{inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Protein' type='number' 
                        value={protein}
                        onChange={handleProteinChange}
                        InputProps ={{inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Fats' type='number'
                        value={fat}
                        onChange={handleFatChange} 
                        InputProps ={{inputProps:{min:0}, 
                            endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClick}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}