import { Box, Typography, FormControl, InputLabel, Select, Button, TextField } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import units from "../utility/Units";


const INITIAL = {
    qty:0, 
    name:"", 
    unit:"g",
    fat:0,
    calories:0,
    protein:0,
    carbs:0,
    id:null
}
export default function IngredientsPaneRead({keyID, recipeIngredients, setRecipeIngredients, ingredient}) {

    // function handleQtyChange(e) {
    //     console.log(e.target.id)
    //     const newRecipeIngredients = {...recipeIngredients}
    //     newRecipeIngredients[getID(e.target.id)]['qty'] = e.target.value
    //     setRecipeIngredients(newRecipeIngredients)        
    // }
    // function handleRemoveIngredient(e) {
    //     const newRecipeIngredients = {...recipeIngredients}
    //     delete newRecipeIngredients[getID(e.target.id)]
    //     setRecipeIngredients(newRecipeIngredients)
    // }
    // function handleUnitChange(e) {
    //     const newRecipeIngredients = {...recipeIngredients}
    //     newRecipeIngredients[getID(e.target.id)]['unit'] = e.target.value
    //     setRecipeIngredients(newRecipeIngredients)
    // }
    // function handleIngredientChange(e) {
    //     const index = e.target.selectedIndex;
    //     const el = e.target.childNodes[index]
    //     const id = el.id
    //     const food = getFoodByFoodId(parseInt(id)) 
        
    //     const newRecipeIngredients = {...recipeIngredients}
    //     newRecipeIngredients[getID(e.target.id)]['name'] = e.target.value
    //     newRecipeIngredients[getID(e.target.id)]['carbs'] = food.carbs
    //     newRecipeIngredients[getID(e.target.id)]['protein'] = food.protein
    //     newRecipeIngredients[getID(e.target.id)]['calories'] = food.calories
    //     newRecipeIngredients[getID(e.target.id)]['fat'] = food.fat
    //     newRecipeIngredients[getID(e.target.id)]['id'] = food.id
    //     setRecipeIngredients(newRecipeIngredients)
    // }
    function getID(input) {
        const split = input.split('-')
        return split[split.length-1]
    }
    // function getFoodByFoodId(id) {
    //     return (ingredients.filter((item)=> {
    //         return item.id === id
    //     }))[0]
    // }
    return (
        <Box key={keyID} sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
            <Typography variant='body' sx={{}}>ID: {keyID}</Typography>
            
            <Typography>{ingredient.qty}</Typography>
            <Typography>{ingredient.unit}</Typography>
            <Typography>{ingredient.name}</Typography>
            
        </Box>
    )
}