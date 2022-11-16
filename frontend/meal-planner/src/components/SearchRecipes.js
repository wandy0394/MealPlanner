import { TextField, Button, Box, FormControl, Input, FormGroup, FormLabel, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useEffect } from "react";
import DataService from "../service/data-service"
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const INITIAL_CRITERIA = {
    maxCal:"",
    minCal:"",
    maxCarb: "",
    minCarb:"",
    maxProtein: "",
    minProtein: "",
    maxFat: "",
    minFat: "",
}

const CRITERIA_LABELS = {
    maxCal:"Maximum Calories",
    maxCarb: "Maximum Carbs",
    maxProtein: "Maximum Protein",
    maxFat: "Maximum Fat",
    minCal:"Minimum Calories",
    minCarb:"Minimum Carbs",
    minProtein: "Minimum Protein",
    minFat: "Minuimum Fat",
}

const CRITERIA_SUFFIX = {
    maxCal:"kcal",
    maxCarb: "%",
    maxProtein: "%",
    maxFat: "%",
    minCal:"kcal",
    minCarb:"%",
    minProtein: "%",
    minFat: "%",
}



export default function SearchRecipes({getResults}) {
    const [searchCriteria, setSearchCriteria] = useState(INITIAL_CRITERIA)
    const [searchText, setSearchText] = useState('')

    function validateInputs() {
        return true
    }

    function handleCriteriaChange(e) {
        if (!validateInputs) return
        const {value, name} = e.target
        setSearchCriteria({...searchCriteria, [name]:value})
    }

    function handleSearchChange(e) {
        setSearchText(e.target.value)
    }
    useEffect(()=> {
        console.log(searchCriteria)
    }, [searchCriteria])


    async function handleClick(e) {
        //console.log(e)
        e.preventDefault();
        e.reportValidity();
        if (!validateInputs) return
        try {
            //const output = await DataService.searchRecipes(searchText)
            //console.log(output)
            //getResults(output)
        }
        catch (e) {
            console.error(e)
        }
        
    }
    return (
        <Box>
            <form onSubmit={handleClick}>
                {/* <TextField label='Search by name..' variant='standard' onChange={handleChange} required></TextField>  */}
                <FormGroup>
                
                    <FormLabel sx={{marginBottom: '1rem', marginTop:'3rem'}}>Search recipes names and ingredients</FormLabel>
                    <Box sx={{display:'flex', flexDirection:'column', padding:'0px 3rem'}}>
                        <TextField name='searchText' label='Search by name..' variant='standard' onChange={handleSearchChange} required={true}></TextField> 
                    </Box>
                
                    <FormLabel sx={{}}>Additional Filters</FormLabel>

                    
                    <Box sx={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', margin:'0 auto', width:'100%'}}>
                        {
                            Object.entries(searchCriteria).map((item, index, array) => {
                                if (index % 2 != 0) return
                                return (
                                    <Box key={index} sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100%'}}>
                                        <TextField label={CRITERIA_LABELS[array[index][0]]} variant='standard' type='number' 
                                            InputProps={{endAdornment:<InputAdornment position='end'>{CRITERIA_SUFFIX[array[index][0]]}</InputAdornment>}} 
                                            inputProps={{min:0, type:'number'}}  margin="normal"
                                            name={array[index][0]}
                                            onChange={handleCriteriaChange}
                                            key={array[index][0]}
                                            >
                                        </TextField>
                                        <TextField label={CRITERIA_LABELS[array[index+1][0]]} variant='standard' type='number' 
                                            InputProps={{endAdornment:<InputAdornment position='end'>{CRITERIA_SUFFIX[array[index+1][0]]}</InputAdornment>}} 
                                            inputProps={{min:0, type:'number'}}  margin="normal"
                                            name={array[index+1][0]}
                                            onChange={handleCriteriaChange}
                                            key={array[index+1][0]}
                                            >
                                        </TextField>  
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Button type='submit' variant='contained' sx={{margin:'1rem'}}>Search Recipes</Button>
                </FormGroup>
            </form>

        </Box>
    )
}