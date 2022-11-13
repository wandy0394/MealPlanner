import { Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { ContentBox } from "../components/ContentBox";
import SearchIngredients from "../components/SearchIngredients";
import SearchRecipes from "../components/SearchRecipes";
import ResultsSection from "../components/ResultsSection";

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

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function getResults(values) {
        setResults(values)
    }
    return (
        <ContentBox>
            <Stack sx={{height:'100%'}}>
                <Paper elevation={3} sx={{flexGrow:'1'}}>
                    
                    <Box>
                        <Typography variant='h2'>
                            Search for Ingredients and Recipes        
                        </Typography>
                        <Box sx={{width:'100%', borderBottom:1, borderColor:'divider'}}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label='Ingredients' sx={{width:'50%'}}/>
                                <Tab label='Recipes' sx={{width:'50%'}}/>                            
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <SearchIngredients getResults={getResults}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SearchRecipes/>
                        </TabPanel>
                    </Box>

                    <Box>
                        <Box>
                            <Typography variant='h4' sx={{display:'inline'}}>
                                Results
                            </Typography>
                            {
                                (results !== null) ?
                                    (
                                        <Typography variant='h6' sx={{display:'inline'}}> (Total Results: {results.total_results})</Typography>
                                    ) : ''
                            }
                        </Box>
                        <Box>
                            {
                                (results !== null) ? 
                                    (
                                        <>
                                            <ResultsSection data={results}/>
                                            
                                        </>
                                    ):'No results'
                            }                            
                        </Box>
                    </Box>
                </Paper>
            </Stack>            

            
        </ContentBox>
    )
}