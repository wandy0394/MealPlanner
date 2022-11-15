import { TextField, Button, Box, FormControl, Input, FormGroup, FormLabel, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useEffect } from "react";
import DataService from "../service/data-service"
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function SearchRecipes({getResults}) {
    const [searchText, setSearchText] = useState('')
    const [minCal, setMinCal] = useState(null)
    const [maxCal, setMaxCal] = useState(null)
    const [minCarb, setMinCarb] = useState(null)
    const [maxCarb, setMaxCarb] = useState(null)
    const [minProtein, setMinProtein] = useState(null)
    const [maxProtein, setMaxProtein] = useState(null)
    const [minFat, setMinFat] = useState(null)
    const [maxFat, setMaxFat] = useState(null)

    function validateInputs() {
        
    }


    async function handleClick(e) {
        //console.log(e)
        e.preventDefault();
        //e.reportValidity();
        if (searchText === '') return
        try {
            //const output = await DataService.searchRecipes(searchText)
            //console.log(output)
            //getResults(output)
            
        }
        catch (e) {
            console.error(e)
        }
        
    }

    function handleSearchTextChange(e) {
        setSearchText(e.target.value)
    }

    function handleMinCalChange(e) {
        setMinCal(e.target.value)
    }
    function handleMaxCalChange(e) {
        setMaxCal(e.target.value)
    }
    function handleMinCarbChange(e) {
        setMinCarb(e.target.value)
    }
    function handleMaxCarbChange(e) {
        setMaxCarb(e.target.value)
    }
    function handleMinProteinChange(e) {
        setMinProtein(e.target.value)
    }
    function handleMaxProteinChange(e) {
        setMaxProtein(e.target.value)
    }
    function handleMinFatChange(e) {
        setMinFat(e.target.value)
    }
    function handleMaxFatChange(e) {
        setMaxFat(e.target.value)
    }



    return (
        <Box>
            <form onSubmit={handleClick}>
                {/* <TextField label='Search by name..' variant='standard' onChange={handleChange} required></TextField>  */}
                <FormGroup>
                    
                        <FormLabel sx={{marginBottom: '1rem', marginTop:'3rem'}}>Search recipes names and ingredients</FormLabel>
                        <Box sx={{display:'flex', flexDirection:'column', padding:'0px 3rem'}}>
                            <TextField sx = {{}}label='Search by name..' variant='standard' onChange={handleSearchTextChange} required={true}></TextField> 
                        </Box>
                   
                    <Accordion sx={{paddingTop:'0rem', border:'none'}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}> 
                            <FormLabel sx={{}}>Additional Filters</FormLabel>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                                
                                <Box sx={{display:'flex', flexDirection:'column', padding: '0px 3rem'}}>
                                    <TextField label='Minimum calories' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>kcal</InputAdornment>}} inputProps={{min:0, type:'number'}}  margin="normal"></TextField> 
                                    <TextField label='Minimum Protein' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>%</InputAdornment>}} inputProps={{min:0, max:100}} margin="normal"></TextField> 
                                    <TextField label='Minimum Carbs' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>%</InputAdornment>}} inputProps={{min:0, max:100}} margin="normal"></TextField>  
                                    <TextField label='Minimum Fat' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>%</InputAdornment>}} inputProps={{min:0, max:100}} margin="normal"></TextField>                             
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'column', padding: '0px 3rem'}}>
                                    <TextField label='Maximum calories' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>kcal</InputAdornment>}} inputProps={{min:0}} margin="normal"></TextField>
                                    <TextField label='Maximum Protein' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>%</InputAdornment>}} inputProps={{min:0, max:100}} margin="normal"></TextField> 
                                    <TextField label='Maximum Fat' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>%</InputAdornment>}} inputProps={{min:0, max:100}} margin="normal"></TextField> 
                                    <TextField label='Maximum Carbs' variant='standard' type='number' 
                                        InputProps={{endAdornment:<InputAdornment position='end'>%</InputAdornment>}} inputProps={{min:0, max:100}} margin="normal"></TextField> 
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Button type='submit' variant='contained' sx={{margin:'1rem'}}>Search Recipes</Button>
                </FormGroup>
            </form>

        </Box>
    )
}