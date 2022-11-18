import { Grid, Paper, Stack, Tab, Tabs, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ContentBox } from "../components/ContentBox";
import SearchIngredients from "../components/SearchIngredients";
import SearchRecipes from "../components/SearchRecipes";
import IngredientResultsSection from "../components/IngredientResultsSection";
import RecipeResultsSection from "../components/RecipeResultsSection";
import DataService from "../service/data-service";

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
export default function Search() {
    const [tabNum, setTabNum] = useState(0)
    const [results, setResults] = useState(null)
    const [recipeResults, setRecipeResults] = useState(null)
    const [ingredientPage, setIngredientPage] = useState(INITIAL_PAGE)
    const [recipePage, setRecipePage] = useState(INITIAL_PAGE)
    const [searchText, setSearchText] = useState('')
    const [searchCriteria, setSearchCriteria] = useState(INITIAL_CRITERIA)
    const [recipeSearchText, setRecipeSearchText] = useState('')

    const [hasClickedSearchIngredient, setHasClickSearchIngredient] = useState(false)

    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    function getResults(values) {
        setResults(values)
    }

    function getRecipeResults(values) {
        setRecipeResults(values)
    }
    function handleIngredientPageChange(e, page) {
        console.log(`page change ${page}`)
        setIngredientPage(
            { ingredientPage: page }, 
            (async function() {
                console.log(`lookg for page ${page}`)
                await callSearchIngredients(page)
            })()
        )
    }
    function handleRecipePageChange(e, page) {
        setRecipePage(page)
    }
    // useEffect(()=> {
    //     console.log(`New results`)
    //     console.log(results)
    // }, [results])
    // useEffect(()=> {
    //     console.log('search mount')
    // },[])

    async function callSearchIngredients(page=ingredientPage) {
        try {
            console.log(`useffect ${page}` )
            const callSearch = (async() => {
                const data = await DataService.searchIngredients(searchText, page)
                console.log('GotData')
                console.log(data)
                getResults(data)
                setIngredientPage(page)
            })();
        }
        catch(e) {
            console.error(e)
        }
    }

    useEffect(()=> {
        console.log('recipe effect called')
        if (recipePage === INITIAL_PAGE) return
     
        try {
            console.log(`recipe useffect ${recipePage}` )
            const searchData = {
                searchText:recipeSearchText, 
                ...searchCriteria,
                page:recipePage
            }
            console.log(searchData)
            const callSearch = (async() => {
                const data = await DataService.searchRecipes(searchData)
                console.log('GotData')
                console.log(data)
                getRecipeResults(data)
            })();
        }
        catch(e) {
            console.error(e)
        }
    }, [recipePage])

    console.log(`search page rendered: ${ingredientPage}`)
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
                                getResults={getResults} 
                                page={ingredientPage} 
                                setPage={setIngredientPage} 
                                searchText={searchText} 
                                setSearchText={setSearchText}
                                handleClickSearch={callSearchIngredients}
                            />
                        </TabPanel>
                        <TabPanel value={tabNum} index={1}>
                            <SearchRecipes 
                                getResults={getRecipeResults} 
                                searchCriteria={searchCriteria}
                                setSearchCriteria={setSearchCriteria}
                                searchText={recipeSearchText} 
                                setSearchText={setRecipeSearchText}
                                page={recipePage}
                                setPage={setRecipePage}
                            />
                        </TabPanel>
                        <TabPanel value={tabNum} index={2}>
                            TODO
                        </TabPanel>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='h4' sx={{display:'inline'}}>
                                Results
                            </Typography>
                            {
                                (tabNum === 0) && (results !== null) && (
                                    (<Typography variant='h6' sx={{display:'inline'}}> (Total Results: {results.total_results})</Typography>)
                                )
                            }
                            {
                                (tabNum === 1) && (recipeResults !== null) && (
                                    <Typography variant='h6' sx={{display:'inline'}}> (Total Results: {recipeResults.recipes.total_results})</Typography>
                                )
                            }
                        </Box>
                        <Box>
                            {
                                (tabNum === 0) && ((results !== null) && <><IngredientResultsSection data={results}/></>)
                            }
                            {
                                (tabNum === 1) && ((recipeResults !== null) && <><RecipeResultsSection data={recipeResults}/></>)
                            }                              
                        </Box>
                        <Box>
                            {
                                (tabNum === 0) && ((results !== null) && 
                                                <Pagination count={10} shape='rounded' sx={{margin: '1rem 0'}} page={ingredientPage}
                                                    onChange={handleIngredientPageChange}
                                                />)
                            }
                            {
                                (tabNum === 1) && ((recipeResults !== null) && 
                                        <Pagination count={10} shape='rounded' sx={{margin: '1rem 0'}} page={recipePage}
                                            onChange={handleRecipePageChange}
                                        />)
                            }
                        </Box>
                    </Box>
                </Box>
            </Stack>            
        </ContentBox>
    )
}