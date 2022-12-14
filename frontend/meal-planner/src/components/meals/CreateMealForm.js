import {Box, Button, Stack, TextField} from "@mui/material"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ACTION_TYPES } from "./ActionTypes";
import { useEffect, useReducer, useState } from "react"
import DataService from "../../service/data-service"
import MealSelection from "./MealSelection";
import MealPane from "./MealPane";

const useGetStaticRecipes = () => {
    const [recipes, setRecipes] = useState({})
    let called = false
    useEffect(()=> {        
        if (!called) getStaticRecipes()
        return () => {
            called = true
        }
    }, [])
    async function getStaticRecipes() {
        try {
            console.log('Refreshing static recipe')
            const result = await DataService.getStaticRecipes()
            // dispatch({type:ACTION_TYPES.SET_RECIPE, payload:result[id]})
            // originalRecipe = result[id]
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    function reducer (state, action) {
        const {type, payload} = action
        return {payload}
    }
    return recipes
}

const useGetCustomRecipes = () => {
    const [recipes, setRecipes] = useState({})
    

    let called = false
    useEffect(()=> {        
        if (!called) getRecipes()
        return () => {
            called = true
        }
    }, [])
    async function getRecipes() {
        try {
            console.log('Refreshing custom recipe')
            const result = await DataService.getRecipes()
            // dispatch({type:ACTION_TYPES.SET_RECIPE, payload:result[id]})
            // originalRecipe = result[id]
            console.log(result)
            setRecipes(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    return recipes
}
const useGetIngredients = () => {

    const [ingredients, setIngredients] = useState({})

    let called = false
    useEffect(()=> {        
        if (!called) getIngredients()
        return () => {
            called = true
        }
    }, [])
    async function getIngredients() {
        try {
            console.log('Refreshing ingredients')
            const result = await DataService.getIngredients()
            // dispatch({type:ACTION_TYPES.SET_RECIPE, payload:result[id]})
            // originalRecipe = result[id]
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    return ingredients
}
const useGetAllFood = () => {
    const [mealLineItems, setMealLineItems] = useState({})
    let counter=0
    let called = false
    useEffect(()=> {        
        if (!called) {
            async function fetchData() {
                try {
                    const ingredientResult = await DataService.getIngredients()
                    const recipeResult = await DataService.getRecipes()
                    const staticResult = await DataService.getStaticRecipes()
                    let lineItems = {}
                    ingredientResult.forEach(element => {
                        lineItems = {...lineItems,
                            [counter]: {
                                name:element.name, 
                                calories:element.calories,
                                fat:element.fat,
                                protein:element.protein,            
                                carbs:element.carbs, 
                                id:element.id
                            }
                        }
                        counter++
                    });
                    Object.entries(recipeResult).forEach(([key, data])=> {
                        lineItems = {...lineItems, 
                                    [counter] : {
                                        name:data.title, 
                                        calories:data.macros.calories,
                                        fat:data.macros.fat,
                                        protein:data.macros.protein,            
                                        carbs:data.macros.carbs, 
                                        id:key
                                    }
                        }
                        counter++
                    })
                    staticResult.forEach((item) => {
                        lineItems = {...lineItems, 
                            [counter] : {
                                name:item.recipe_name, 
                                calories:0,
                                fat:0,
                                protein:0,            
                                carbs:0, 
                                id:item.recipe_id
                            }
                        }
                        counter++                        
                    })
                    console.log(lineItems)
                    setMealLineItems(lineItems)
                    
                }
                catch (e) {

                }

            }
            fetchData();
        }
        return () => {
            called = true
        }
    }, [])

    function reducer (state, action) {
        const {type, payload} = action
        return {payload}
    }
    return [mealLineItems, setMealLineItems]
}
const INITIAL_MEALS = {
    //object of objects, each child object 
    meals:{},
    targetCarbs:0,
    targetCalories:0,
    targetProtein:0,
    targetFat:0,
    counter:0
}



function CustomRecipeAutoComplete({customRecipes, dispatch}) {

    const filter = createFilterOptions();
    const [value, setValue] = useState('');
    const recipes = Object.entries(customRecipes).map(([key, data])=>{
        return {...data, id:key}
    })

    function handleSelect(id, title) {
        console.log(id)
        console.log(title)
        dispatch({type:ACTION_TYPES.ADD_MEAL, payload: {id:id, name:title}})
    }
    return <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        setValue({
                            name: newValue,
                        });
                    } else {
                        // console.log(event.target.id)
                        // console.log(newValue)
                        setValue(newValue);
                        handleSelect(event.target.id, newValue.title)
                        //setFoodId(event.target.id)
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="custom-recipe-autocomplete"
                options={recipes}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                }}
                renderOption={(props, option) => <li {...props} id={option.id}>{option.title}</li>}
                //sx={{ width: 300 }}
                renderInput={(params) => (
                    <TextField {...params} variant='standard' label="Recipe name" required/>
                )}
            />
}
export default function CreateMealForm() {
    //const ingredients = useGetIngredients()
    //const customRecipes = useGetCustomRecipes()
    //const staticRecipes = useGetStaticRecipes()
    const [mealLineItems, setMealLineItems] = useGetAllFood()
    const [meals, dispatch] = useReducer(reducer, INITIAL_MEALS)

    function reducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.ADD_MEAL:
                if (payload.id in state.meals) {
                    console.log('in')
                    return {...state, meals: {...state.meals, [payload.id]:{name:payload.name, qty:state.meals[payload.id].qty + 1}}}
                }
                return {...state, meals: {...state.meals, [payload.id]:{name:payload.name, qty:1}}}
            case ACTION_TYPES.SET_CALORIES:
                return {...state, targetCalories:payload}
            case ACTION_TYPES.SET_FAT:
                return {...state, targetFat:payload}
            case ACTION_TYPES.SET_PROTEIN:
                return {...state, targetProtein:payload}
            case ACTION_TYPES.SET_CARBS:
                return {...state, targetCarbs:payload}
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(meals)
    }
    //api call to get static recipes, custom recipes and ingredients

    return (
        <Box>
            {/* create meals */}
            <form onSubmit={handleSubmit}>
                <TextField variant='standard' label='Calories' value={meals.targetCalories} onChange={e=>dispatch({type:ACTION_TYPES.SET_CALORIES, payload:e.target.value})}/>
                <TextField variant='standard' label='Carbs' value={meals.targetCarbs} onChange={e=>dispatch({type:ACTION_TYPES.SET_CARBS, payload:e.target.value})}/>
                <TextField variant='standard' label='Fat' value={meals.targetFat} onChange={e=>dispatch({type:ACTION_TYPES.SET_FAT, payload:e.target.value})}/>
                <TextField variant='standard' label='Protein' value={meals.targetProtein} onChange={e=>dispatch({type:ACTION_TYPES.SET_PROTEIN, payload:e.target.value})}/>
                
                <Stack gap={3}>

                    {/* <CustomRecipeAutoComplete customRecipes={customRecipes} dispatch={dispatch}/> */}
                    <MealPane mealLineItems={meals.meals}/>
                    <MealSelection selectOptions={mealLineItems} dispatch={dispatch} />

                </Stack>
                {/* Create a grid of cards. Top Row is scrolling ingredients, middle row is custom recipes, bottom row is static recipes */}
                {/* Each card has a Add or remove button. Add can be clicked multiple times to add multiple of that meal, Each card tracks the number of times its been clicked */}
                <Button type='submit'>Add</Button>

            </form>
        
        
        </Box>
    )
}