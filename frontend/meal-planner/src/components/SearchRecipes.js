import { TextField, Button, Box } from "@mui/material";
import DataService from "../service/data-service.js";

export default function SearchRecipes() {


    return (
        <Box>
            <TextField label='Search by name..' variant='standard'></TextField> 
            <Button variant='contained'>Search Recipes</Button>
        </Box>
    )
}