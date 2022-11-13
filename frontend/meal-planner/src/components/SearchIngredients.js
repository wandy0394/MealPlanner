import { TextField, Button, Box } from "@mui/material";
import DataService from "../service/data-service"

export default function SearchIngredients() {
    
    const handleClick= (async () => {
        console.log('Clicked')
        try {
            const output = await DataService.searchIngredients('apple')
            console.log(output)
        }
        catch (e) {
            console.error(e)
        }
        
    })
    return (
        <Box>
            <TextField label='Search by name..' variant='standard'></TextField> 
            <Button variant='contained' onClick={handleClick}>Search Ingredients</Button>
        </Box>
    )
}