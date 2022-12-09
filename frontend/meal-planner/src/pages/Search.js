import { Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useReducer } from "react";
import { ContentBox } from "../components/utility/ContentBox";
import SearchIngredients from "../components/search/SearchIngredients";
import SearchRecipes from "../components/search/SearchRecipes";
import SearchHistory from "../components/search/SearchHistory";
import {ACTION_TYPES} from "../components/search/ActionTypes"
import SidePane from "../layouts/SidePane";
import IngredientInfo from "../components/search/IngredientInfo";
import RecipeInfo from "../components/search/ReipceInfo";
import DataService from "../service/data-service";
import RecipePostCard from "../components/recipe/RecipePostCard";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <>
            {(value === index) ? (
                <Box hidden={value !== index} sx={{marginTop:'2rem', border:'solid'}}>
                    {children}
                </Box>
            ) : ('')}
        </>
    )
}

function SidePanelContent(props) {
    const {children, value, index, ...other} = props;
    return (
            <>
                {(value === index) ? (
                    <Box hidden={value !== index} sx={{ flexGrow:'1'}}>
                        {children}
                    </Box>
                ) : ('')}    
            </>
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
            const data = await DataService.getRecipe(recipeId)
            console.log(data.recipe)  
            setRecipe(data.recipe)
            setOpen(true)
        }
        catch (e) {
            console.error('error')
            console.log(e)
        }
    }
    

    return (
        <Box sx={{height:'100%'}}>
            <Stack direction='row' sx={{height:'100%'}}>
                <ContentBox>
                    <Box sx={{height:'15vh', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                        <Box>
                            <Typography variant='h3' sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>
                                Find Something to Eat       
                            </Typography>
                        </Box>
                        <Tabs value={tabNum} onChange={handleTabChange} sx={{borderBottom:1, borderColor:'divider'}}>
                            
                            <Tab label='Ingredients' sx={{width:'100%'}}/>
                            <Tab label='Recipes' sx={{width:'100%'}}/>  
                        </Tabs>                        
                    </Box>
                    <Stack sx={{height:'100%'}}>
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
                </ContentBox>
                <SidePane>
                    <SidePanelContent value={tabNum} index={0}>
                        <SearchHistory type='ingred'/>
                    </SidePanelContent>
                    <SidePanelContent value={tabNum} index={1}>
                        <SearchHistory type='recipe'/>                    
                    </SidePanelContent>
                </SidePane>
                
                        
            </Stack> 
            {
                (recipe !== '') && (<RecipePostCard recipe={recipe} open={open} handleClose={handleClose}/>)
            }  
        </Box>
    )
}