import { TextField, Button, Box, FormGroup, FormLabel, Typography, Pagination } from "@mui/material";
import DataService from "../../service/data-service";
import SearchIngredientResults from "./SearchIngredientsResults";
import {ACTION_TYPES} from './ActionTypes'
const dummyOutput = {

    food: [
        {food_id: 1, food_name:'Bread 1', food_description: 'bready bready'},
        {food_id: 2, food_name:'Bread 2', food_description: 'bready bready'},
        {food_id: 3, food_name:'Bread 3', food_description: 'bready bready'},
        {food_id: 4, food_name:'Bread 4', food_description: 'bready bready'}
    ],  
    
    total_results: 4

}

export default function SearchIngredients({state, dispatch}) {

    
    async function callSearchIngredients(query, page, doStoreSearch) {
        try {
            console.log(`useffect ${page}` )
            const callSearch = (async() => {
                const data = await DataService.searchIngredients(query, (page-1), doStoreSearch)
                console.log('Got Data')
                console.log(data)
                dispatch({type:ACTION_TYPES.SET_PREV_QUERY, payload:state.query})
                dispatch({type:ACTION_TYPES.SET_QUERY, payload:query})
                dispatch({type:ACTION_TYPES.SET_RESULTS, payload:data})
                dispatch({type:ACTION_TYPES.SET_PAGE, payload:page})
                console.log(state)
            })();
        }
        catch(e) {
            console.error(e)
        }        
    }

    async function handleClick(e) {
        e.preventDefault()
        console.log('clicked')
        await callSearchIngredients(state.query, 1, true)
    }

    async function handleIngredientPageChange(e, page) {
        console.log(`page change ${page}`)
        dispatch({type:ACTION_TYPES.SET_PAGE, payload:page})
        await callSearchIngredients(state.prevQuery, page, false)
    }

    function handleChange(e) {
        dispatch({type:ACTION_TYPES.SET_QUERY, payload:e.target.value})
    }

    return (
        <Box>
            <Box>
                <form onSubmit={handleClick}>

            
                <FormGroup>
                    <FormLabel sx={{marginBottom: '1rem', marginTop:'3rem'}}>What ingredients do you want to find?</FormLabel>
                    <Box sx={{display:'flex', flexDirection:'column', padding:'0px 0rem'}}>
                        <TextField sx={{marginBottom:'1em'}}label='Search by name..' variant='standard' onChange={handleChange} required={true} value={state.query}></TextField> 
                    </Box>
                    <Button variant='contained' type='submit'>Search Ingredients</Button>
                </FormGroup>
                </form>

            </Box>
            <Box>
                    <Typography variant='h4' sx={{display:'inline'}}>
                                Results
                    </Typography>
                {
                    (state.results !== null) && (
                        (<Typography variant='h6' sx={{display:'inline'}}> (Total Results: {state.results.total_results})</Typography>)
                    )
                }
            </Box>
            <Box>
                {
                    ((state.results !== null) && <><SearchIngredientResults data={state.results}/></>)
                }
            </Box>
            <Box>
                {
                    ((state.results !== null) && 
                    <Pagination count={10} shape='rounded' sx={{margin: '1rem 0'}} page={state.page}
                        onChange={handleIngredientPageChange}
                    />)
                }
            </Box>
        </Box>
    )
}