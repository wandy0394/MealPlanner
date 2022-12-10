import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from '@mui/icons-material/Refresh'
import { Paper, Stack, Box, Typography, IconButton, Tabs, Tab, Button } from "@mui/material";
import { ContentBox } from "../components/utility/ContentBox";
import { useEffect, useState } from "react";
import CreateRecipeForm from "../components/recipe/CreateRecipeForm";
import DataService from "../service/data-service";
import RecipeContent from "../components/recipe/RecipeContent";
import RecipePostCard from "../components/recipe/RecipePostCard";

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
    const [staticRecipes, setStaticRecipes] = useState({})
    const [recipe, setRecipe] = useState('')
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
            console.log('Refreshing Recipes again')
            const result = await DataService.getRecipes()
            console.log(result)
            setRecipes(result)
        }
        catch (e) {
            console.error(e)
        }

    }
    async function getStaticRecipes() {
        try {
            console.log('Refreshing Static Recipes again')
            const result = await DataService.getStaticRecipes()
            console.log(result)
            setStaticRecipes(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    async function handleRecipeTabClick(e, recipeId) {
        try {
            const data = await DataService.getRecipe(recipeId)
            console.log(data.recipe)  
            setRecipe(data.recipe)
            //setOpen(true)
        }
        catch (e) {
            console.error('error')
            console.log(e)
        }
    }
    useEffect(()=> {
        refresh()
        getStaticRecipes()
    }, [])
    

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box>
                    <Typography variant='h3' sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>
                        What would you like to make?
                        <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                    </Typography>
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
                        {
                            Object.entries(staticRecipes).map(([key, data])=> {
                                return <Tab key={key} label={data.recipe_name} onClick={e=>handleRecipeTabClick(e, data.recipe_id)}></Tab>
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
                                        recipe={data}
                                        recipeId={key}
                                    />
                                </TabPanel>
                            )
                        })

                    }
                    {
                        Object.entries(staticRecipes).map(([key, data], index)=> {
                            return (
                                <TabPanel key={key} value={tabValue} index={Object.keys(recipes).length+index}>
                                    {
                                        (recipe !== '') &&<RecipePostCard
                                                            recipe={recipe}
                                                            readOnly={true}
                                                            />
                                    }
                                </TabPanel>
                            )
                        })
                    }
                    <TabPanel value={tabValue} index={Object.keys(recipes).length + Object.keys(staticRecipes).length}>
                        <CreateRecipeForm/>
                    </TabPanel>
                </Box>
            </Stack>
        </ContentBox>
    )
}