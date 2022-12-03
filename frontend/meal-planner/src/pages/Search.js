import { Paper, Stack, Tab, Tabs, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useReducer } from "react";
import { ContentBox } from "../components/utility/ContentBox";
import SearchIngredients from "../components/search/SearchIngredients";
import SearchRecipes from "../components/search/SearchRecipes";
import SearchHistory from "../components/search/SearchHistory";
import {ACTION_TYPES} from "../components/search/ActionTypes"
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div hidden={value !== index}>
            {(value === index) ? (
                <Box>
                    {children}
                </Box>
            ) : ('')}
        </div>
    )
}

const INITIAL_PAGE = 0
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

const INITIAL_INGREDIENTS_STATE = {
    query:'',
    prevQuery:'',
    page:INITIAL_PAGE,
    results:null
}

const INITIAL_RECIPE_STATE = {
    query:'',
    prevQuery:'',
    criteria: INITIAL_CRITERIA,
    prevCriteria:INITIAL_CRITERIA,
    page:INITIAL_PAGE,
    results:null
}


export default function Search() {
    const [tabNum, setTabNum] = useState(0)
    
    const [ingredientsState, ingredientsDispatch] = useReducer(ingredientsReducer, INITIAL_INGREDIENTS_STATE)
    const [recipeState, recipeDispatch] = useReducer(recipeReducer, INITIAL_RECIPE_STATE)

    function ingredientsReducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.SET_RESULTS:
                return {...state, results:payload}
            case ACTION_TYPES.SET_QUERY:
                return {...state, query:payload}
            case ACTION_TYPES.SET_PREV_QUERY:
                return {...state, prevQuery:payload}
            case ACTION_TYPES.SET_PAGE:
                return {...state, page:payload}
            default:
                return state
        }
    }

    function recipeReducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.SET_RESULTS:
                return {...state, results:payload}
            case ACTION_TYPES.SET_QUERY:
                return {...state, query:payload}
            case ACTION_TYPES.SET_PREV_QUERY:
                return {...state, prevQuery:payload}
            case ACTION_TYPES.SET_PAGE:
                return {...state, page:payload}
            case ACTION_TYPES.SET_CRITERIA:
                return {...state, criteria:payload}
            case ACTION_TYPES.SET_PREV_CRITERIA:
                return {...state, prevCriteria:payload}
            default:
                return state
        }
    }

    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }
    return (
        <ContentBox>
            <Stack sx={{height:'100%'}}>
                <Box sx={{flexGrow:'1'}}>
                    <Box>
                        <Paper elevation={3}>
                            <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>
                                Find Something to Eat       
                            </Typography>
                        </Paper>
                            <Tabs value={tabNum} onChange={handleTabChange} sx={{borderBottom:1, borderColor:'divider'}}>
                                <Tab label='Ingredients' sx={{width:'33%'}}/>
                                <Tab label='Recipes' sx={{width:'33%'}}/>
                                <Tab label='History' sx={{width:'33%'}}/>     
                            </Tabs>                        
                        <TabPanel value={tabNum} index={0}>
                            <SearchIngredients
                                state={ingredientsState}
                                dispatch={ingredientsDispatch}
                            />
                        </TabPanel>
                        <TabPanel value={tabNum} index={1}>
                            <SearchRecipes
                                state={recipeState}
                                dispatch={recipeDispatch}
                            />
                        </TabPanel>
                        <TabPanel value={tabNum} index={2}>
                            <SearchHistory/>
                        </TabPanel>
                    </Box>
                </Box>
            </Stack>            
        </ContentBox>
    )
}