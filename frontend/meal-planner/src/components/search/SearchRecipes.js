import { TextField, Button, Box, FormGroup, FormLabel, InputAdornment, Collapse, Typography, Pagination, IconButton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { ACTION_TYPES } from "./ActionTypes";
import SearchRecipeResults from "./SearchRecipeResults"
import SearchIcon from '@mui/icons-material/Search'
import SearchService from "../../service/search-service";

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



export default function SearchRecipes({state, dispatch, getRecipe}) {
    const [visible, setVisible] = useState(false)
    const matches = useMediaQuery('(max-width:600px)')

    function validateInputs() {
        
        const isValid = state.query.match(/^[\w\-\s]+$/) //alphanumeric, hyphen and whitespace
        return isValid
    }

    function handleCriteriaChange(e) {
        let {value, name} = e.target
        const newCriteria = {...state.criteria, [name]:value}
        dispatch({type:ACTION_TYPES.SET_CRITERIA, payload:newCriteria})

    }

    function handleSearchChange(e) {
        dispatch({type:ACTION_TYPES.SET_QUERY, payload:e.target.value})
    }

    const toggleVisibility = () => {
        const val = visible
        setVisible(!val)
    }
    async function handleClick(e) {
        e.preventDefault();
        
        if (!validateInputs()) {
            //let user know
            return
        }
        await callSearchRecipes(state.query, state.criteria, 1, true)
    }

    async function callSearchRecipes(query, searchCriteria, page, doStoreSearch) {
        try {
            const searchData = {
                searchText:query, 
                ...searchCriteria,
                page:(page-1)
            }
            if (doStoreSearch) {
                searchData['doStoreSearch'] = 'true'
            }
            const data = await SearchService.searchRecipes(searchData)
            dispatch({type:ACTION_TYPES.SET_RESULTS, payload:data})
            dispatch({type:ACTION_TYPES.SET_PAGE, payload:page})
            dispatch({type:ACTION_TYPES.SET_PREV_QUERY, payload:state.query})
            dispatch({type:ACTION_TYPES.SET_QUERY, payload:query})
            dispatch({type:ACTION_TYPES.SET_PREV_CRITERIA, payload:state.criteria})
        }
        catch(e) {
            console.error(e)
        }
    }   
    async function handleRecipePageChange(e, page) {
        await callSearchRecipes(state.prevQuery, state.prevCriteria, page)
    }

    function calculatePages() {
        if (state?.results?.recipes?.total) {
            return Math.ceil(parseInt(state.results.recipes.total_results, 10) / 10)
        }
        return 0
    }
    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <Box>
                <form onSubmit={handleClick}>
                    <FormGroup sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                        <Box sx={{display:'flex', flexDirection:'row', alignItems:'flex-end', gap:'2rem', padding:'0px 0rem'}}>
                            <TextField 
                                label='Search by name or ingredient..' 
                                variant='standard' 
                                onChange={handleSearchChange} 
                                required={true} 
                                value={state.query}
                                sx={{flexGrow:1}}
                            >
                            </TextField> 
                            <Button startIcon={<SearchIcon/>} type='submit' variant='contained'>
                                {
                                    matches?null:'Search Recipes'
                                }
                            </Button>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'flex-start', alignContent:'center'}}>
                            <FormLabel sx={{display:'flex', alignItems:'center'}}>Search Options:</FormLabel>
                            <IconButton onClick={toggleVisibility}>{visible ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</IconButton>
                        </Box>
                        <Collapse in={visible} sx={{width:'100%'}}>
                            <Box sx={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', margin:'0 auto', width:'100%'}}>
                                {
                                    Object.entries(state.criteria).map((item, index, array) => {
                                        if (index % 2 !== 0) return null
                                        return (
                                            <Box key={index} sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', width:'100%'}}>
                                                <TextField label={CRITERIA_LABELS[array[index][0]]} variant='standard' type='number' 
                                                    InputProps={{endAdornment:<InputAdornment position='end'>{CRITERIA_SUFFIX[array[index][0]]}</InputAdornment>}} 
                                                    inputProps={{min:0, type:'number'}}  margin="normal"
                                                    name={array[index][0]}
                                                    onChange={handleCriteriaChange}
                                                    key={array[index][0]}
                                                    value={state.criteria[array[index][0]]}
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
                        </Collapse>
                    </FormGroup>
                </form>

            </Box>
            <Box sx={{display:'flex', flexDirection:'row', gap:'1rem', alignItems:'center'}}>
                <Typography variant='h4' sx={{display:'inline'}}>
                    Results
                </Typography>
                {
                    (state.results !== null && state.results.recipes !== undefined) && (
                        <Typography variant='h6' sx={{display:'inline'}}> (Total Results: {state.results.recipes.total_results})</Typography>
                    )
                }
            </Box>
            <Box>
                {
                    ((state.results !== null && state.results.recipes !== undefined) ? 
                        (<><SearchRecipeResults data={state.results} getRecipe={getRecipe}/></>):
                        (<Typography variant='body1' sx={{display:'inline'}}>No Results</Typography>)
                    )
                }
            </Box>
            <Box>
                {
                    (state.results !== null && state.results.recipes !== undefined) && 
                            <Pagination count={calculatePages()} shape='rounded' sx={{}} page={state.page}
                                onChange={handleRecipePageChange}
                            />
                }
            </Box>
        </Box>
    )
}