import { Paper, Stack, Tab, Tabs, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useReducer } from "react";
import { ContentBox } from "../components/utility/ContentBox";
import SearchIngredients from "../components/search/SearchIngredients";
import SearchIngredients2 from "../components/search/SearchIngredients2";
import SearchRecipes from "../components/search/SearchRecipes";
import SearchIngredientResults from "../components/search/SearchIngredientsResults";
import SearchRecipeResults from "../components/search/SearchRecipeResults";
import DataService from "../service/data-service";
import SearchHistory from "../components/search/SearchHistory";

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

const ACTION_TYPES = {
    SET_RESULTS:'setResults',
    SET_PAGE: 'setPage',
    SET_QUERY: 'setQuery',
    SET_PREV_QUERY: 'setPrevQuery'
}
export default function Search() {
    const [tabNum, setTabNum] = useState(0)
    // const [results, setResults] = useState(null)
    const [recipeResults, setRecipeResults] = useState(null)
    // const [ingredientPage, setIngredientPage] = useState(INITIAL_PAGE)
    const [recipePage, setRecipePage] = useState(INITIAL_PAGE)
    // const [searchText, setSearchText] = useState('')
    // const [prevSearchText, setPrevSearchText] = useState('')
    const [searchCriteria, setSearchCriteria] = useState(INITIAL_CRITERIA)
    const [recipeSearchText, setRecipeSearchText] = useState('')
    const [prevRecipeSearchText, setPrevRecipeSearchText] = useState('')
    const [prevSearchCriteria, setPrevSearchCriteria] = useState(INITIAL_CRITERIA)
    
    const [ingredientsState, ingredientsDispatch] = useReducer(ingredientsReducer, INITIAL_INGREDIENTS_STATE)

    function ingredientsReducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.SET_RESULTS:
                return {...state, results:payload}
            case ACTION_TYPES.SET_QUERY:
                const temp = state.query
                return {...state, query:payload}
            case ACTION_TYPES.SET_PREV_QUERY:
                return {...state, prevQuery:payload}
            case ACTION_TYPES.SET_PAGE:
                return {...state, page:payload}
            default:
                return state
        }
    }

    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    // function getResults(values) {
    //     setResults(values)
    // }

    function getRecipeResults(values) {
        setRecipeResults(values)
    }
    // function handleIngredientPageChange(e, page) {
    //     console.log(`page change ${page}`)
    //     setIngredientPage(
    //         { ingredientPage: page }, 
    //         (async function() {
    //             console.log(`looking for page ${page}`)
    //             await callSearchIngredients(prevSearchText, page, false)
    //         })()
    //     )
    // }

    function handleRecipePageChange(e, page) {
        setRecipePage(
            {recipePage: page},
            (async function() {
                console.log(`looking for page ${page}`)
                await callSearchRecipes(prevRecipeSearchText, prevSearchCriteria, page)
            })()    
        )
    }



    // async function callSearchIngredients(searchText, page, doStoreSearch) {
    //     try {
    //         console.log(`useffect ${page}` )
    //         const callSearch = (async() => {
    //             const data = await DataService.searchIngredients(searchText, (page-1), doStoreSearch)
    //             console.log('GotData')
    //             console.log(data)
    //             getResults(data)
    //             setIngredientPage(page)
    //             setPrevSearchText(searchText)
    //         })();
    //     }
    //     catch(e) {
    //         console.error(e)
    //     }
    // }

    async function callSearchRecipes(searchText, searchCriteria, page, doStoreSearch) {
        try {
            console.log(`recipe useffect ${page}` )
            const searchData = {
                searchText:searchText, 
                ...searchCriteria,
                page:(page-1)
            }
            if (doStoreSearch) {
                searchData['doStoreSearch'] = 'true'
            }
            console.log(searchData)
            const callSearch = (async() => {
                const data = await DataService.searchRecipes(searchData)
                console.log('GotData')
                console.log(data)
                getRecipeResults(data)
                setRecipePage(page)
                setPrevRecipeSearchText(searchText)
                setPrevSearchCriteria(searchCriteria)
            })();
        }
        catch(e) {
            console.error(e)
        }
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
                            <SearchIngredients2
                                state={ingredientsState}
                                dispatch={ingredientsDispatch}
                            />
                        </TabPanel>
                        <TabPanel value={tabNum} index={1}>
                            <SearchRecipes 
                                searchCriteria={searchCriteria}
                                setSearchCriteria={setSearchCriteria}
                                searchText={recipeSearchText} 
                                setSearchText={setRecipeSearchText}
                                handleClickSearch={callSearchRecipes}
                            />
                        </TabPanel>

                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='h4' sx={{display:'inline'}}>
                                Results
                            </Typography>
                            {
                                (tabNum === 1) && (recipeResults !== null) && (
                                    <Typography variant='h6' sx={{display:'inline'}}> (Total Results: {recipeResults.recipes.total_results})</Typography>
                                )
                            }
                        </Box>
                        <Box>
                            {
                                // (tabNum === 0) && ((results !== null) && <><SearchIngredientResults data={results}/></>)
                                // (tabNum === 0) && ((ingredientsState.results !== null) && <><SearchIngredientResults data={ingredientsState.results}/></>)

                            }
                            {
                                (tabNum === 1) && ((recipeResults !== null) && <><SearchRecipeResults data={recipeResults}/></>)
                            }                              
                        </Box>
                        <Box>
                            {
                                // (tabNum === 0) && ((results !== null) && 
                                //                 <Pagination count={10} shape='rounded' sx={{margin: '1rem 0'}} page={ingredientPage}
                                //                     onChange={handleIngredientPageChange}
                                //                 />)
                            }
                            {
                                (tabNum === 1) && ((recipeResults !== null) && 
                                        <Pagination count={10} shape='rounded' sx={{margin: '1rem 0'}} page={recipePage}
                                            onChange={handleRecipePageChange}
                                        />)
                            }
                            <TabPanel value={tabNum} index={2}>
                                <SearchHistory/>
                            </TabPanel>
                        </Box>
                    </Box>
                </Box>
            </Stack>            
        </ContentBox>
    )
}