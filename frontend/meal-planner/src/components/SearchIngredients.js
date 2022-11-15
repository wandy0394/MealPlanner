import { TextField, Button, Box } from "@mui/material";
import { useEffect } from "react";
import DataService from "../service/data-service"
import { useState } from "react";

export default function SearchIngredients({getResults}) {
    const [searchText, setSearchText] = useState('')
    
    async function handleClick() {
        try {
            const output = await DataService.searchIngredients(searchText)
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
            <form onSubmit={handleClick}>
                <TextField label='Search by name..' variant='standard' onChange={handleChange} required={true}></TextField> 
                <Button variant='contained' type='submit'>Search Ingredients</Button>
            </form>
        </Box>
    )
}