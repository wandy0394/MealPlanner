import { Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ContentBox } from "../components/ContentBox";
import SearchIngredients from "../components/SearchIngredients";
import SearchRecipes from "../components/SearchRecipes";

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

    const handleChange = (event, newValue) => {
        setValue(newValue)
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
                            <SearchIngredients/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SearchRecipes/>
                        </TabPanel>


                    </Box>

                    <Box>
                        <Typography variant='h4'>
                            Results
                        </Typography>
                    </Box>
                </Paper>
            </Stack>            

            
        </ContentBox>
    )
}