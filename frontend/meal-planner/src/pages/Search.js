import { Modal, Stack, Tab, Tabs } from "@mui/material";
import { useState, useReducer } from "react";
import SearchIngredients from "../components/search/SearchIngredients";
import SearchRecipes from "../components/search/SearchRecipes";
import SearchHistory from "../components/search/SearchHistory";
import {ACTION_TYPES} from "../components/search/ActionTypes"
import RecipePostCard from "../components/recipe/RecipePostCard";
import RecipeService from "../service/recipe-service";
import TabPanel from "../components/utility/TabPanel";
import SidePanelContent from "../components/utility/SidePanelContent";
import MainPane from "../layouts/MainPane";
import { strawTheme } from "../components/utility/StrawTheme";


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

const INITIAL_RECIPE_STATE = {
    query:'',
    prevQuery:'',
    criteria: INITIAL_CRITERIA,
    prevCriteria:INITIAL_CRITERIA,
    page:INITIAL_PAGE,
    results:null
}


export default function Search() {
    const [tabNum, setTabNum] = useState(0)
    
    const [ingredientsState, ingredientsDispatch] = useReducer(ingredientsReducer, INITIAL_INGREDIENTS_STATE)
    const [recipeState, recipeDispatch] = useReducer(recipeReducer, INITIAL_RECIPE_STATE)

    const [ingredientId, setIngredientId] = useState('')
    const [recipe, setRecipe] = useState('')

    const [open, setOpen] = useState(false)
    
    function handleClose() {
        setOpen(false)
    }

    function ingredientsReducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.SET_RESULTS:
                return {...state, results:payload}
            case ACTION_TYPES.SET_QUERY:
                return {...state, query:payload}
            case ACTION_TYPES.SET_PREV_QUERY:
                return {...state, prevQuery:payload}
            case ACTION_TYPES.SET_PAGE:
                return {...state, page:payload}
            default:
                return state
        }
    }

    function recipeReducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.SET_RESULTS:
                return {...state, results:payload}
            case ACTION_TYPES.SET_QUERY:
                return {...state, query:payload}
            case ACTION_TYPES.SET_PREV_QUERY:
                return {...state, prevQuery:payload}
            case ACTION_TYPES.SET_PAGE:
                return {...state, page:payload}
            case ACTION_TYPES.SET_CRITERIA:
                return {...state, criteria:payload}
            case ACTION_TYPES.SET_PREV_CRITERIA:
                return {...state, prevCriteria:payload}
            default:
                return state
        }
    }

    const handleTabChange = (event, newValue) => {
        setTabNum(newValue)
    }

    
    async function getRecipe(recipeId) {
        try {
            const data = await RecipeService.getRecipe(recipeId)
            setRecipe(data.recipe)
            setOpen(true)
        }
        catch (e) {
            console.error('error')
            console.error(e)
        }
    }
    

    return (

        <MainPane title='Find Something to Eat'
            mainContent={
                <Stack>
                    <Tabs value={tabNum} onChange={handleTabChange} sx={{borderBottom:1, borderColor:'divider'}}>
                        
                        <Tab label='Ingredients' sx={{width:'100%', color:strawTheme.palette.common.black}}/>
                        <Tab label='Recipes' sx={{width:'100%', color:strawTheme.palette.common.black}}/>  
                    </Tabs>                        
                    <TabPanel value={tabNum} index={0}>
                        <SearchIngredients
                            state={ingredientsState}
                            dispatch={ingredientsDispatch}
                            setIngredientId={setIngredientId}
                        />
                    </TabPanel>
                    <TabPanel value={tabNum} index={1}>
                        <SearchRecipes
                            state={recipeState}
                            dispatch={recipeDispatch}
                            getRecipe={getRecipe}
                        />
                    </TabPanel>
                </Stack>
            }
            sideContent={
                <>
                    <SidePanelContent value={tabNum} index={0}>
                        <SearchHistory type='ingred'/>
                    </SidePanelContent>
                    <SidePanelContent value={tabNum} index={1}>
                        <SearchHistory type='recipe'/>                    
                    </SidePanelContent>
                </>
            }
        >
            {
                (recipe !== '') && 
                (<Modal
                    open={open}
                    onClose={handleClose}
                    sx={{display:'grid', justifyContent:'center', alignItems:'center'}}
                >
                    <RecipePostCard recipe={recipe} readOnly={false}/>
                </Modal>)
            }  
        </MainPane>
    )
}