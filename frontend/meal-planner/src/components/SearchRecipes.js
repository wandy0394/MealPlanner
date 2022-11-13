import { TextField, Button, Box } from "@mui/material";
import { useEffect } from "react";
import DataService from "../service/data-service"
import { useState } from "react";

export default function SearchRecipes({getResults}) {
    const [searchText, setSearchText] = useState('')
    
    async function handleClick() {
        try {
            const output = await DataService.searchRecipes(searchText)
            console.log(output)
            getResults(output)
            
        }
        catch (e) {
            console.error(e)
        }
        
    }

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    return (
        <Box>
            <TextField label='Search by name..' variant='standard' onChange={handleChange}></TextField> 
            <Button variant='contained' onClick={handleClick}>Search Recipes</Button>
        </Box>
    )
}