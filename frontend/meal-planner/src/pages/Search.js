import { Grid, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ContentBox } from "../components/ContentBox";
import SearchIngredients from "../components/SearchIngredients";
import SearchRecipes from "../components/SearchRecipes";
import IngredientResultsSection from "../components/IngredientResultsSection";
import RecipeResultsSection from "../components/RecipeResultsSection";

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

export default function Search() {
    const [value, setValue] = useState(0)
    const [results, setResults] = useState(null)
    const [recipeResults, setRecipeResults] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function getResults(values) {
        setResults(values)
    }

    function getRecipeResults(values) {
        setRecipeResults(values)
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
                            <Tabs value={value} onChange={handleChange} sx={{borderBottom:1, borderColor:'divider'}}>
                                <Tab label='Ingredients' sx={{width:'33%'}}/>
                                <Tab label='Recipes' sx={{width:'33%'}}/>
                                <Tab label='History' sx={{width:'33%'}}/>     
                            </Tabs>                        
                        <TabPanel value={value} index={0}>
                            <SearchIngredients getResults={getResults}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SearchRecipes getResults={getRecipeResults}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            TODO
                        </TabPanel>
                    </Box>
                    <Box>
                        <Box>
                            <Typography variant='h4' sx={{display:'inline'}}>
                                Results
                            </Typography>
                            {
                                (value === 0) && (results !== null) && (
                                    (<Typography variant='h6' sx={{display:'inline'}}> (Total Results: {results.total_results})</Typography>)
                                )
                            }
                            {
                                (value === 1) && (recipeResults !== null) && (
                                    <Typography variant='h6' sx={{display:'inline'}}> (Total Results: {recipeResults.recipes.total_results})</Typography>
                                )
                            }
                        </Box>
                        <Box>
                            {
                                (value === 0) && ((results !== null) && <><IngredientResultsSection data={results}/></>)
                            }
                            {
                                (value === 1) && ((recipeResults !== null) && <><RecipeResultsSection data={recipeResults}/></>)
                            }                              
                        </Box>
                    </Box>
                </Box>
            </Stack>            
        </ContentBox>
    )
}