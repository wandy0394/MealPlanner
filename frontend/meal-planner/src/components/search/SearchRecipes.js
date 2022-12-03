import { TextField, Button, Box, FormGroup, FormLabel, InputAdornment, Collapse, Typography, Pagination } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { ACTION_TYPES } from "./ActionTypes";
import DataService from "../../service/data-service";
import SearchRecipeResults from "./SearchRecipeResults"

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



export default function SearchRecipes({state, dispatch}) {
    const [visible, setVisible] = useState(false)

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
        console.log('Clicked')
    }

    async function callSearchRecipes(query, searchCriteria, page, doStoreSearch) {
        try {
            console.log(`recipe useffect ${page}` )
            const searchData = {
                searchText:query, 
                ...searchCriteria,
                page:(page-1)
            }
            if (doStoreSearch) {
                searchData['doStoreSearch'] = 'true'
            }
            console.log(searchData)
            const data = await DataService.searchRecipes(searchData)
            dispatch({type:ACTION_TYPES.SET_RESULTS, payload:data})
            dispatch({type:ACTION_TYPES.SET_PAGE, payload:page})
            dispatch({type:ACTION_TYPES.SET_PREV_QUERY, payload:state.query})
            dispatch({type:ACTION_TYPES.SET_QUERY, payload:query})
            dispatch({type:ACTION_TYPES.SET_PREV_CRITERIA, payload:state.criteria})
            console.log(state)
        }
        catch(e) {
            console.error(e)
        }
    }   
    async function handleRecipePageChange(e, page) {
        await callSearchRecipes(state.prevQuery, state.prevCriteria, page)
        //dispatch({type:ACTION_TYPES.SET_PAGE, payload:page})
    }
    return (
        <Box>
            <Box>
                <form onSubmit={handleClick}>
                    <FormGroup>
                        {/* <FormLabel sx={{marginBottom: '1rem', marginTop:'3rem'}}>What are you hungry for?</FormLabel> */}
                        <Box sx={{display:'flex', flexDirection:'column', padding:'0px 0rem'}}>
                            <TextField name='searchText' label='Search by name or ingredient..' variant='standard' onChange={handleSearchChange} required={true} value={state.query}></TextField> 
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'flex-start', alignContent:'center'}}>
                            <FormLabel sx={{display:'flex', alignItems:'center'}}>Search Options:</FormLabel>
                            <Button onClick={toggleVisibility}>{visible ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</Button>
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
                        <Button type='submit' variant='contained' sx={{margin:'1rem'}}>Search Recipes</Button>
                    </FormGroup>
                </form>

            </Box>
            <Box>
                <Typography variant='h4' sx={{display:'inline'}}>
                    Results
                </Typography>
                {
                    (state.results !== null) && (
                        <Typography variant='h6' sx={{display:'inline'}}> (Total Results: {state.results.recipes.total_results})</Typography>
                    )
                }
            </Box>
            <Box>
                {
                    ((state.results !== null) && <><SearchRecipeResults data={state.results}/></>)
                }
            </Box>
            <Box>
                {
                    (state.results !== null) && 
                            <Pagination count={10} shape='rounded' sx={{margin: '1rem 0'}} page={state.page}
                                onChange={handleRecipePageChange}
                            />
                }
            </Box>
        </Box>
    )
}