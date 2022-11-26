import { Box, Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import DataService from "../service/data-service";
import Nutrition from "./Nutrition";
import IngredientsPane from "./IngredientsPane";



export default function CreateRecipeForm() {
    const [instructions, setInstructions] = useState('')
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState({})
    const [ingredientCounter, setIngredientCounter] = useState(0)

    useEffect(()=>{
        getIngredients()
        // console.log(units)
    },[])

    useEffect(()=> {
        console.log(recipeIngredients)
    }, [recipeIngredients])

    async function getIngredients() {
        try {
            console.log('Refreshing Ingredients')
            const result = await DataService.getIngredients()
            console.log(result)
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


    return (
        <Stack>
            <form onSubmit={handleSaveClicked}>
                <Box sx={{display:'flex', gap:'1rem', padding:'1rem', alignItems:'center'}}>
                    <TextField variant='standard' label='Recipe Name' required sx={{padding:'1rem'}} 
                        onChange={handleNameChange} value={name}
                    />
                    <Button variant='contained' sx={{height:'50%'}} type='submit'>
                        <SaveIcon/>
                        <Typography variant='body' sx={{padding:'0 1rem'}}>Save Recipe</Typography>
                    </Button>
                </Box>
                
            
                <Grid container spacing={2} sx={{padding:'1rem', border:''}}>

                    <Grid item xs={12} md={6} sx={{width:'100%'}}>
                        <IngredientsPane 
                            recipeIngredients={recipeIngredients}
                            setRecipeIngredients={setRecipeIngredients}
                            ingredientCounter={ingredientCounter}
                            setIngredientCounter={setIngredientCounter}
                            ingredients={ingredients} 
                        />
                        <Nutrition foods={recipeIngredients}/>
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
                        <Paper elevation={3}>
                            <Typography variant='h6'>Add an Image</Typography> 
                        </Paper>
                    </Grid>
                    
                </Grid>
            </form>
        </Stack>
    )
}