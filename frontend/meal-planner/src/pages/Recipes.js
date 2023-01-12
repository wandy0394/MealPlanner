import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from '@mui/icons-material/Refresh'
import { Paper, Stack, Box, Typography, IconButton, Tabs, Tab, Button, Modal, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import RecipePostCard from "../components/recipe/RecipePostCard";
import CreateRecipePostCard from "../components/recipe/CreateRecipePostCard";
import ReadCustomRecipePostCard from "../components/recipe/ReadCustomRecipePostCard";
import RecipeService from "../service/recipe-service";
import TabPanel from "../components/utility/TabPanel"
import MainPane from "../layouts/MainPane"
import CustomRecipePostCard from "../components/recipe/CustomRecipePostCard";
import { strawTheme } from "../components/utility/StrawTheme";
import StatusSnackbar, { INITIAL_STATUS, SEVERITY } from "../components/utility/StatusSnackbar";

export default function Recipes() {
    const [open, setOpen] = useState(false)
    const [recipes, setRecipes] = useState({})
    const [staticRecipes, setStaticRecipes] = useState({})
    const [recipe, setRecipe] = useState('')
    const [tabValue, setTabValue] = useState(0)

    const [statusMessageState, setStatusMessageState] = useState(INITIAL_STATUS)

    function handleClickOpen() {
        setOpen(true)
    }
    const handleClose = (state=null) => {
        setOpen(false)
        if (state) {
            setStatusMessageState({...state})
            refresh()
        }
    }

    function handleTabChange(e, newValue) {
        setTabValue(newValue)
    }

    async function refresh() {
        try {
            const result = await RecipeService.getRecipes()
            setRecipes(result)
        }
        catch (e) {
            console.error(e)
        }

    }
    async function getStaticRecipes() {
        try {
            const result = await RecipeService.getStaticRecipes()
            setStaticRecipes(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    async function handleRecipeTabClick(e, recipeId, id) {
        try {
            const data = await RecipeService.getRecipe(recipeId)
            setRecipe({...data.recipe, id:id})
        }
        catch (e) {
            console.error('error')
            console.error(e)
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
            title='What would you like to make?'
            buttons={
                <>
                    <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                    <IconButton onClick={handleClickOpen}><AddIcon/></IconButton>
                </>
            }
            mainContent={
                <Box>
                    <Box sx={{width:'100%'}}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant='scrollable'
                            scrollButtons='auto'                       
                        >
                            {
                                Object.entries(recipes).map(([key, data])=> {
                                    return <Tab 
                                                key={key} 
                                                label={data.title} 
                                                sx={{color:strawTheme.palette.common.black}}
                                            />
                                })
                            }
                            {
                                Object.entries(staticRecipes).map(([key, data])=> {
                                    return <Tab 
                                                key={key} 
                                                label={data.recipe_name} 
                                                onClick={e=>handleRecipeTabClick(e, data.recipe_id, data.id)} 
                                                sx={{color:strawTheme.palette.common.black}}
                                            />
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
                                            recipeId={key}
                                            refresh={refresh}
                                            setStatusMessageState={setStatusMessageState}
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
                                                    deleteable={true}
                                                    refresh={getStaticRecipes}
                                                    setStatusMessageState={setStatusMessageState}
                                                />
                                        }
                                    </TabPanel>
                                )
                            })
                        }
                        <Modal
                            open={open}
                            onClose={()=>handleClose({message:'Recipe not saved.', severity:SEVERITY.INFO, isMessageVisible:true})}
                            sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
                        >
                            <CreateRecipePostCard handleClose={handleClose}/>
                        </Modal>
                        <StatusSnackbar 
                            statusMessageState={statusMessageState}
                            setStatusMessageState={setStatusMessageState} 
                        />
                    </Box>                
                </Box>
            }

        >


        </MainPane>


    )
}