import { Box, Typography, FormControl, InputLabel, Select, Button, TextField } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
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
export default function IngredientsPaneEntry({keyID, recipeIngredients, setRecipeIngredients, ingredients}) {

    function handleQtyChange(e) {
        console.log(e.target.id)
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[getID(e.target.id)]['qty'] = e.target.value
        setRecipeIngredients(newRecipeIngredients)        
    }
    function handleRemoveIngredient(e) {
        const newRecipeIngredients = {...recipeIngredients}
        delete newRecipeIngredients[getID(e.target.id)]
        setRecipeIngredients(newRecipeIngredients)
    }
    function handleUnitChange(e) {
        const newRecipeIngredients = {...recipeIngredients}
        newRecipeIngredients[getID(e.target.id)]['unit'] = e.target.value
        setRecipeIngredients(newRecipeIngredients)
    }
    function handleIngredientChange(e) {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id = el.id
        const food = getFoodByFoodId(parseInt(id)) 
        
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
}