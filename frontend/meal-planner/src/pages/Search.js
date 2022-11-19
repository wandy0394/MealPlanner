import { Paper, Stack, Tab, Tabs, Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
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
    const [prevSearchText, setPrevSearchText] = useState('')
    const [searchCriteria, setSearchCriteria] = useState(INITIAL_CRITERIA)
    const [recipeSearchText, setRecipeSearchText] = useState('')
    const [prevRecipeSearchText, setPrevRecipeSearchText] = useState('')
    const [prevSearchCriteria, setPrevSearchCriteria] = useState(INITIAL_CRITERIA)


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
                console.log(`looking for page ${page}`)
                await callSearchIngredients(prevSearchText, page)
            })()
        )
    }
    function handleRecipePageChange(e, page) {
        setRecipePage(
            {recipePage: page},
            (async function() {
                console.log(`looking for page ${page}`)
                await callSearchRecipes(prevRecipeSearchText, prevSearchCriteria, page)
            })()    
        )
    }

    async function callSearchIngredients(searchText, page) {
        try {
            console.log(`useffect ${page}` )
            const callSearch = (async() => {
                const data = await DataService.searchIngredients(searchText, page)
                console.log('GotData')
                console.log(data)
                getResults(data)
                setIngredientPage(page)
                setPrevSearchText(searchText)
            })();
        }
        catch(e) {
            console.error(e)
        }
    }

    async function callSearchRecipes(searchText, searchCriteria, page) {
        try {
            console.log(`recipe useffect ${page}` )
            const searchData = {
                searchText:searchText, 
                ...searchCriteria,
                page:page
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
                            <SearchIngredients 
                                searchText={searchText} 
                                setSearchText={setSearchText}
                                handleClickSearch={callSearchIngredients}
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