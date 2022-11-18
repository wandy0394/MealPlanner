import { TextField, Button, Box, FormGroup, FormLabel } from "@mui/material";
import { useEffect } from "react";
import DataService from "../service/data-service"
import { useState } from "react";

export default function SearchIngredients({getResults, page, hasSearchedIngredient, setHasSearchedIngredient}) {
    const [searchText, setSearchText] = useState('')
    
    
    async function handleClick(e) {
        e.preventDefault()
        await search()
    }
    async function search(page=1) {
        console.log(`Page ${page}`)
        try {
            const output = await DataService.searchIngredients(searchText, page)
            //console.log(output)
            getResults(output)
            setHasSearchedIngredient(true)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        //if (page === 0) return
        try {
            if (hasSearchedIngredient) {
                console.log(`useffect ${page}` )
                //const output = (async () => {await search(page)})
                //getResults(output)
            }
            
        }
        catch(e) {
            console.error(e)
        }
    }, [page])

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    return (
        <Box>
            <form onSubmit={handleClick}>


            <FormGroup>
                <FormLabel sx={{marginBottom: '1rem', marginTop:'3rem'}}>What ingredients do you want to find?</FormLabel>
                <Box sx={{display:'flex', flexDirection:'column', padding:'0px 0rem'}}>
                    <TextField sx={{marginBottom:'1em'}}label='Search by name..' variant='standard' onChange={handleChange} required={true}></TextField> 
                </Box>
                <Button variant='contained' type='submit'>Search Ingredients</Button>
            </FormGroup>
            </form>

        </Box>
    )
}