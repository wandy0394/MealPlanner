import { Box, Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { Stack } from "@mui/system";
import { useEffect, useId, useRef, useState } from "react";
import AddBox from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DataService from "../service/data-service";
import Nutrition from "./Nutrition";
import units from "./Units";

const INITIAL = {
    qty:0, 
    name:"", 
    unit:"g",
    fat:0,
    calories:0,
    protein:0,
    carbs:0
}

export default function CreateRecipeForm() {
    const [instructions, setInstructions] = useState('')
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipeIngredients, setRecipeIngredients] = useState({})
    const [ingredientCounter, setIngredientCounter] = useState(0)
    const addButtonRef = useRef()

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
    function handleAddIngredient() {
    
        setRecipeIngredients({...recipeIngredients, [ingredientCounter]:{...INITIAL}})
        setIngredientCounter(ingredientCounter+1)
        addButtonRef.current?.scrollIntoView({behaviour:'smooth'})
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
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id = el.id
    
        const food = getFoodByFoodId(parseInt(id)) 
        console.log(food)
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[getID(e.target.id)]['name'] = e.target.value
        newRecipeIngredients[getID(e.target.id)]['carbs'] = food.carbs
        newRecipeIngredients[getID(e.target.id)]['protein'] = food.protein
        newRecipeIngredients[getID(e.target.id)]['calories'] = food.calories
        newRecipeIngredients[getID(e.target.id)]['fat'] = food.fat
        setRecipeIngredients(newRecipeIngredients)
    }
    function getID(input) {
        const split = input.split('-')
        return split[split.length-1]
    }
    function getFoodByFoodId(id) {
        return (ingredients.filter((item)=> {
            return item.id === id
        }))[0]
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
                        <Paper elevation={3} sx={{border:'solid', overflow:'scroll', maxHeight:'45vh'}}>
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
                                                            {
                                                                Object.entries(units).map(([keyID, value])=> {
                                                                    return <option key={keyID} value={value}>{value}</option> 
                                                                })
                                                            }
                                                        </Select> 
                                                    </FormControl>
                                                    <Select
                                                        label='Name'
                                                        id={'ingr-'+keyID}
                                                        //value={recipeIngredients[keyID]['name']}
                                                        onChange={handleIngredientChange}
                                                        native
                                                        sx={{minWidth:'300px'}}
                                                    >   
                                                        <option disabled selected>Select...</option>
                                                        {
                                                            ingredients.map((item)=>{
                                                                return (
                                                                    <option id={item.id} key={item.id}>{item.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </Box> 
                                                <Button 
                                                    variant='outlined' 
                                                    id={'remove-'+keyID} 
                                                    onClick={handleRemoveIngredient}
                                                >
                                                    <RemoveIcon id={'icon-'+keyID} />
                                                </Button>
                                            </Box>
                                        )
                                    })
                                }
                                <Button 
                                    type='button' 
                                    variant='contained' 
                                    sx={{width:'100%'}} 
                                    onClick={handleAddIngredient}
                                    ref ={addButtonRef}
                                >
                                    <AddIcon/>
                                </Button>
                            </Stack>
                        </Paper>
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