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
    return (
        <Box key={keyID} sx={{display:'flex', gap:'1rem', alignItems:'center'}}>
            <Typography variant='body'>{ingredient.qty} {ingredient.unit} {ingredient.name}</Typography>
        </Box>
    )
}