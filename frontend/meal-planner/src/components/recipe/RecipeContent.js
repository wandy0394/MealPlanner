import { Box, Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import DataService from "../../service/data-service";
import Nutrition from "./Nutrition";
import IngredientsPane from "./IngredientsPane";

const MAX_CHARS = 4000
const INITIAL_MACROS = {
    carbs:0,
    fat:0,
    protein:0,
    calories:0
}
export default function RecipeContent({storedInstructions, storedTitle, storedRecipeIngredients, storedMacros}) {
    const [instructions, setInstructions] = useState(storedInstructions)
    const [title, setTitle] = useState(storedTitle)
    const [ingredients, setIngredients] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState({})
    const [ingredientCounter, setIngredientCounter] = useState(0)
    const [macros, setMacros] = useState(storedMacros)



    useEffect(()=>{
        getIngredients()
        setIngredientCounter(storedRecipeIngredients.length)
        setRecipeIngredients(storedRecipeIngredients)
        //setMacros(storedMacros)
        // console.log(units)
    },[])

    useEffect(()=> {
        setTitle(storedTitle)
        setInstructions(storedInstructions)
        setRecipeIngredients(storedRecipeIngredients)
        setIngredientCounter(storedRecipeIngredients.length)
        setMacros(storedMacros)
    }, [storedInstructions, storedTitle, storedRecipeIngredients, storedMacros])

    useEffect(()=> {
        console.log(recipeIngredients)
        
    }, [recipeIngredients])

    function setupRecipeIngredients() {
        const arr = storedRecipeIngredients.map((item, index) => {
            return {
                [index]:{...item, id:item.id}
            }
        })
        setIngredientCounter(storedRecipeIngredients.length)
        return arr
    }
    

    async function getIngredients() {
        try {
            console.log('Refreshing Ingredients')
            const result = await DataService.getIngredients()
            //console.log(result)
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }

    function handleInstructionChange(e) {
        setInstructions(e.target.value)
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    async function handleSaveClicked(e) {
        e.preventDefault();
        const data = {
            title:title,
            ingredients:recipeIngredients,
            instructions:instructions,
            macros:macros
        }
        const result = await DataService.addRecipe(data)
    }


    return (
        <Stack>
            <form onSubmit={handleSaveClicked}>
                <Box sx={{display:'flex', gap:'1rem', padding:'1rem', alignItems:'center'}}>
                    <TextField disabled variant='standard' label='Recipe Name' required sx={{padding:'1rem'}} 
                        onChange={handleTitleChange} value={title}
                    />
                    <Button disabled variant='contained' sx={{height:'50%'}} type='submit'>
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
                            isDisabled={true}
                        />
                        <Nutrition foods={recipeIngredients} macros={macros} setMacros={setMacros} doCalculate={false}/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box>
                            
                            <TextField variant='outlined' label='Instructions' 
                                multiline 
                                required 
                                sx={{width:'100%'}}
                                rows={4}
                                value={instructions}
                                onChange = {handleInstructionChange}
                                inputProps={{maxLength:MAX_CHARS}}
                                disabled 
                            >
                                
                            </TextField>
                            <Typography>Count: {instructions.length}/{MAX_CHARS}</Typography>
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