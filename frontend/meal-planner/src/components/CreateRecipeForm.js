import { Box, Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useId, useRef, useState } from "react";
import AddBox from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DataService from "../service/data-service";

export default function CreateRecipeForm() {
    const [instructions, setInstructions] = useState('')
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState({})
    const [ingredientCounter, setIngredientCounter] = useState(0)
    const refs = useRef([])

    useEffect(()=>{
        getIngredients()
    },[])

    async function getIngredients() {
        try {
            console.log('Refreshing Ingredients')
            const result = await DataService.getIngredients()
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }

    function handleInstructionChange(e) {
        setInstructions(e.target.value)
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleSaveClicked(e) {
        e.preventDefault();
    }
    function handleAddIngredient() {
    
        setRecipeIngredients({...recipeIngredients, [ingredientCounter]:{qty:0, name:"", unit:"g"}})
        setIngredientCounter(ingredientCounter+1)
        console.log(recipeIngredients)
    }
    function handleQtyChange(e) {
        console.log(e.target.id)
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[getID(e.target.id)]['qty'] = e.target.value
        setRecipeIngredients(newRecipeIngredients)        
    }
    function handleRemoveIngredient(e) {
        // const split = e.target.id.split('-')
        // const id = (split[split.length-1])
        const newRecipeIngredients = {...recipeIngredients}
        delete newRecipeIngredients[getID(e.target.id)]
        setRecipeIngredients(newRecipeIngredients)
    }
    function handleUnitChange(e) {
        console.log(e.target.id)
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[getID(e.target.id)]['unit'] = e.target.value
        setRecipeIngredients(newRecipeIngredients)
    }
    function handleIngredientChange(e) {
        console.log(e.target.id)
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[getID(e.target.id)]['name'] = e.target.value
        setRecipeIngredients(newRecipeIngredients)
    }
    function getID(input) {
        const split = input.split('-')
        return split[split.length-1]
    }

    return (
        <Stack>
            <form onSubmit={handleSaveClicked}>
                <Box sx={{display:'flex', gap:'1rem', padding:'1rem', alignItems:'center'}}>
                    <TextField variant='standard' label='Recipe Name' required sx={{padding:'1rem'}} onChange={handleNameChange}></TextField>
                    <Button variant='contained' sx={{height:'50%'}} type='submit'>
                        <SaveIcon/>
                        <Typography variant='body' sx={{padding:'0 1rem'}}>Save Recipe</Typography>
                    </Button>
                </Box>
                
            
                <Grid container spacing={2} sx={{padding:'1rem', border:''}}>

                    <Grid item xs={12} md={6} sx={{width:'100%'}}>
                        <Paper elevation={3} sx={{border:'solid', overflow:'scroll', maxHeight:'25vh'}}>
                            <Typography variant='h6'>Add Ingredients</Typography>
                            <Stack gap={2}>
                                {
                                    Object.entries(recipeIngredients).map(([keyID, ingrObj], index)=> {
                                        return (
                                            <Box key={keyID} sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
                                                <Typography variant='body' sx={{border:'solid'}}>ID: {keyID}</Typography>
                                                <Box>
                                                    
                                                    <TextField 
                                                        id={'qty-'+keyID} 
                                                        type='number' 
                                                        label='Qty' 
                                                        InputProps={{inputProps:{min:0}}} 
                                                        sx={{width:'100px'}}
                                                        onChange={handleQtyChange}
                                                        value={recipeIngredients[keyID]['qty']}
                                                    />
                                                    <FormControl sx={{minWidth:'100px'}}>
                                                        <InputLabel>Units</InputLabel>
                                                        <Select
                                                            label='units'
                                                            id={'unit-'+keyID}
                                                            native
                                                            onChange={handleUnitChange}
                                                            value={recipeIngredients[keyID]['unit']}
                                                        >
                                                            <option value='g'>g</option> 
                                                            <option value='ml'>ml</option> 
                                                            <option value='cup'>cup</option> 
                                                            <option value='units'>units</option> 
                                                        </Select> 
                                                    </FormControl>
                                                    <Select
                                                        label='Name'
                                                        id={'ingr-'+keyID}
                                                        value={recipeIngredients[keyID]['name']}
                                                        onChange={handleIngredientChange}
                                                        native
                                                        sx={{minWidth:'300px'}}
                                                    >   
                                                        {
                                                            ingredients.map((item)=>{
                                                                return (
                                                                    <option key={item.id}>{item.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Box> 
                                                <Button variant='outlined' id={'remove-'+keyID} onClick={handleRemoveIngredient}><RemoveIcon id={'icon-'+keyID} /></Button>
                                            </Box>
                                        )
                                    })
                                }
                                <Button type='button' variant='contained' sx={{width:'100%'}} onClick={handleAddIngredient}><AddIcon/></Button>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{width:'100%'}}>
                        <Paper elevation={3}>
                            <Typography variant='h6'>Add an Image</Typography> 
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            {/* <Typography>Instructions:</Typography> */}
                            <TextField variant='outlined' label='Instructions' 
                                multiline 
                                required 
                                sx={{width:'100%'}}
                                rows={4}
                                value={instructions}
                                onChange = {handleInstructionChange}
                            >
                                
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{width:'100%'}}>
                        <Paper elevation={3}>
                            <Typography variant='h6'>Nutrition</Typography>  

                        </Paper>
                    </Grid>

                </Grid>
            </form>
        </Stack>
    )
}