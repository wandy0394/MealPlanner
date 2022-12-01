import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from '@mui/icons-material/Refresh'
import { Paper, Stack, Box, Typography, IconButton, Tabs, Tab, Button } from "@mui/material";
import { ContentBox } from "../components/utility/ContentBox";
import { useEffect, useState } from "react";
import CreateRecipeForm from "../components/recipe/CreateRecipeForm";
import DataService from "../service/data-service";
import RecipeContent from "../components/recipe/RecipeContent";

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

export default function Recipes() {
    const [open, setOpen] = useState(false)
    const [recipes, setRecipes] = useState({})
    const [tabValue, setTabValue] = useState(0)


    function handleClickOpen() {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    function handleTabChange(e, newValue) {
        setTabValue(newValue)
    }

    async function refresh() {
        try {
            console.log('Refreshing Recipes')
            const result = await DataService.getRecipes()
            console.log(result)
            setRecipes(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        refresh()
    }, [])
    

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>
                            What would you like to make?
                            <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                        </Typography>
                    </Paper>
                </Box>
                <Box sx={{width:'100%'}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        
                        {
                            Object.entries(recipes).map(([key, data])=> {
                                return <Tab key={key} label={data.title}></Tab>
                            })
                        }
                        <Tab icon={<AddIcon/>} iconPosition='start' label='Create'></Tab>
                        
                    </Tabs>
                </Box>
                <Box sx={{flexGrow:1}}>
                    {
                        Object.entries(recipes).map(([key, data], index)=> {
                            return (
                                <TabPanel key={key} value={tabValue} index={index}>
                                    <RecipeContent
                                        storedInstructions={data.instructions}
                                        storedTitle={data.title}
                                        storedRecipeIngredients={data.ingredients}
                                        storedMacros={data.macros}
                                    />

                                </TabPanel>
                            )
                        })
                    }
                    <TabPanel value={tabValue} index={Object.keys(recipes).length}>
                        <CreateRecipeForm/>
                    </TabPanel>
                </Box>
            </Stack>
        </ContentBox>
    )
}