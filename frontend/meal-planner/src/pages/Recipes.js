import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from '@mui/icons-material/Refresh'
import { Paper, Stack, Box, Typography, IconButton, Tabs, Tab, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import RecipePostCard from "../components/recipe/RecipePostCard";
import CreateRecipePostCard from "../components/recipe/CreateRecipePostCard";
import CustomRecipePostCard from "../components/recipe/CustomRecipePostCard";
import RecipeService from "../service/recipe-service";
import TabPanel from "../components/utility/TabPanel"
import MainPane from "../layouts/MainPane"

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
            const result = await RecipeService.getRecipes()
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
            const result = await RecipeService.getStaticRecipes()
            console.log(result)
            setStaticRecipes(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    async function handleRecipeTabClick(e, recipeId) {
        try {
            const data = await RecipeService.getRecipe(recipeId)
            console.log(data.recipe)  
            setRecipe(data.recipe)
        }
        catch (e) {
            console.error('error')
            console.log(e)
        }
    }

    let called = false
    useEffect(()=> {
        if (!called) {
            refresh()
            getStaticRecipes()
        }

        return () => {
            called = true
        }
    }, [])
    

    return (

        <MainPane
            title='What would you like to make'
            buttons={
                <>
                    <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                    <IconButton onClick={handleClickOpen}><AddIcon/></IconButton>
                </>
            }
            mainContent={
                <>
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
                        </Tabs>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
                        {
                            Object.entries(recipes).map(([key, data], index)=> {
                                return (
                                    <TabPanel key={key} value={tabValue} index={index}>
                                        <CustomRecipePostCard
                                            recipe={data}
                                            readOnly={true}
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
                                            (recipe !== '') &&
                                                <RecipePostCard
                                                    recipe={recipe}
                                                    readOnly={true}
                                                />
                                        }
                                    </TabPanel>
                                )
                            })
                        }
                        <Modal
                            open={open}
                            onClose={handleClose}
                            sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
                        >
                            <CreateRecipePostCard/>
                        </Modal>
                    </Box>                
                </>
            }

        >


        </MainPane>


    )
}