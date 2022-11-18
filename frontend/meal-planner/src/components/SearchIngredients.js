import { TextField, Button, Box, FormGroup, FormLabel } from "@mui/material";
import { useEffect } from "react";
import DataService from "../service/data-service"
import { useState } from "react";

const dummyOutput = {

    food: [
        {food_id: 1, food_name:'Bread 1', food_description: 'bready bready'},
        {food_id: 2, food_name:'Bread 2', food_description: 'bready bready'},
        {food_id: 3, food_name:'Bread 3', food_description: 'bready bready'},
        {food_id: 4, food_name:'Bread 4', food_description: 'bready bready'}
    ],  
    
    total_results: 4

}

export default function SearchIngredients({getResults, page, setPage, searchText, setSearchText}) {

    
    
    async function handleClick(e) {
        e.preventDefault()
        console.log('clicked')
        await search()
    }
    async function search(page=1) {
        console.log(`Page ${page}`)
        setPage(page)
    }
    // useEffect(()=> {
    //     if (page === 0) return
    //     try {
    //         console.log(`useffect ${page}` )
    //         const callSearch = (async() => {
    //             const data = await DataService.searchIngredients(searchText, page)
    //             console.log('GotData')
    //             console.log(data)
    //             getResults(data)
    //         })();
    //     }
    //     catch(e) {
    //         console.error(e)
    //     }
    // }, [page])

    useEffect(()=> {
        console.log("unmounted")
    },[])

    function handleChange(e) {
        setSearchText(e.target.value)
    }

    return (
        <Box>
            <form onSubmit={handleClick}>


            <FormGroup>
                <FormLabel sx={{marginBottom: '1rem', marginTop:'3rem'}}>What ingredients do you want to find?</FormLabel>
                <Box sx={{display:'flex', flexDirection:'column', padding:'0px 0rem'}}>
                    <TextField sx={{marginBottom:'1em'}}label='Search by name..' variant='standard' onChange={handleChange} required={true} value={searchText}></TextField> 
                </Box>
                <Button variant='contained' type='submit'>Search Ingredients</Button>
            </FormGroup>
            </form>

        </Box>
    )
}