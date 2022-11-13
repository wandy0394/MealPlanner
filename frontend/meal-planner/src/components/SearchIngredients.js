import { TextField, Button, Box } from "@mui/material";


export default function SearchIngredients() {
    return (
        <Box>
            <TextField label='Search by name..' variant='standard'></TextField> 
            <Button variant='contained'>Search Ingredients</Button>
        </Box>
    )
}