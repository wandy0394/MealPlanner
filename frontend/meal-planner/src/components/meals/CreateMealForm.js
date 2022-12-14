import {Box, Button, Stack, TextField, Typography} from "@mui/material"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ACTION_TYPES } from "./ActionTypes";
import { useEffect, useReducer, useState } from "react"
import DataService from "../../service/data-service"
import MealSelection from "./MealSelection";
import MealPane from "./MealPane";
import {Calendar, DateObject} from "react-multi-date-picker"
import DatePicker from "react-multi-date-picker"

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
                    // ingredientResult.forEach(element => {
                    //     lineItems = {...lineItems,
                    //         [counter]: {
                    //             name:element.name, 
                    //             calories:element.calories,
                    //             fat:element.fat,
                    //             protein:element.protein,            
                    //             carbs:element.carbs, 
                    //             id:element.id
                    //         }
                    //     }
                    //     counter++
                    // });
                    Object.entries(recipeResult).forEach(([key, data])=> {
                        lineItems = {...lineItems, 
                                    [counter] : {
                                        name:data.title, 
                                        calories:data.macros.calories,
                                        fat:data.macros.fat,
                                        protein:data.macros.protein,            
                                        carbs:data.macros.carbs, 
                                        recipe_id:key
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
                                recipe_id:item.recipe_id
                            }
                        }
                        counter++                        
                    })
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
    return [mealLineItems, setMealLineItems]
}
const INITIAL_MEALS = {
    //object of objects, each child object 
    meals:{},
    targetCarbs:0,
    targetCalories:0,
    targetProtein:0,
    targetFat:0,
    totalCarbs:0,
    totalCalories:0,
    totalFat:0,
    totalProtein:0,
    counter:0,
    days:[(new DateObject()).format('YYYY-MM-DD')],
    dateObjects:[new DateObject()]
}

function MacroCounter(props) {
    const {labelText,  macroValue, macroTarget, dispatch, handleChange, ...other} = props
    return (
        <Box>
            <TextField 
                variant='standard' 
                label={'Target ' + labelText} 
                value={macroTarget} 
                onChange={handleChange} 
                inputProps={{style:{textAlign:'center'}}}
            />
            <Typography sx={{textAlign:'center', color:(macroValue >= macroTarget)?'red':'black'}} variant='h3'>{macroValue}</Typography>
        </Box>

    )
}


// function CustomRecipeAutoComplete({customRecipes, dispatch}) {

//     const filter = createFilterOptions();
//     const [value, setValue] = useState('');
//     const recipes = Object.entries(customRecipes).map(([key, data])=>{
//         return {...data, id:key}
//     })

//     function handleSelect(id, title) {
//         console.log(id)
//         console.log(title)
//         dispatch({type:ACTION_TYPES.ADD_MEAL, payload: {id:id, name:title}})
//     }
//     return <Autocomplete
//                 value={value}
//                 onChange={(event, newValue) => {
//                     if (typeof newValue === 'string') {
//                         setValue({
//                             name: newValue,
//                         });
//                     } else {
//                         // console.log(event.target.id)
//                         // console.log(newValue)
//                         setValue(newValue);
//                         handleSelect(event.target.id, newValue.title)
//                         //setFoodId(event.target.id)
//                     }
//                 }}
//                 filterOptions={(options, params) => {
//                     const filtered = filter(options, params);

//                     const { inputValue } = params;
//                     // Suggest the creation of a new value
//                     const isExisting = options.some((option) => inputValue === option.title);
//                     return filtered;
//                 }}
//                 selectOnFocus
//                 clearOnBlur
//                 handleHomeEndKeys
//                 id="custom-recipe-autocomplete"
//                 options={recipes}
//                 getOptionLabel={(option) => {
//                     // Value selected with enter, right from the input
//                     if (typeof option === 'string') {
//                         return option;
//                     }
//                     // Add "xxx" option created dynamically
//                     if (option.inputValue) {
//                         return option.inputValue;
//                     }
//                     // Regular option
//                     return option.title;
//                 }}
//                 renderOption={(props, option) => <li {...props} id={option.id}>{option.title}</li>}
//                 //sx={{ width: 300 }}
//                 renderInput={(params) => (
//                     <TextField {...params} variant='standard' label="Recipe name" required/>
//                 )}
//             />
// }
export default function CreateMealForm() {
    const [mealLineItems, setMealLineItems] = useGetAllFood()
    const [meals, dispatch] = useReducer(reducer, INITIAL_MEALS)

    function reducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.ADD_MEAL:
                if (payload.id in state.meals) {
                    return {...state, 
                                meals: {...state.meals, 
                                        [payload.id]:{name:payload.name, recipe_id:payload.recipe_id, qty:state.meals[payload.id].qty + 1},
                                },
                                totalCarbs: state.totalCarbs + mealLineItems[payload.id].carbs,
                                totalCalories: state.totalCalories + mealLineItems[payload.id].calories,
                                totalFat: state.totalFat + mealLineItems[payload.id].fat,
                                totalProtein: state.totalProtein + mealLineItems[payload.id].protein,
                    }
                }
                return {...state, 
                            meals: {...state.meals, 
                                    [payload.id]:{name:payload.name, recipe_id:payload.recipe_id, qty:1}
                            },
                            totalCarbs: state.totalCarbs + mealLineItems[payload.id].carbs,
                            totalCalories: state.totalCalories + mealLineItems[payload.id].calories,
                            totalFat: state.totalFat + mealLineItems[payload.id].fat,
                            totalProtein: state.totalProtein + mealLineItems[payload.id].protein,
                }
            case ACTION_TYPES.REMOVE_MEAL:
                if (payload.id in state.meals) {
                    const currQty = state.meals[payload.id].qty
                    if (currQty === 1) {
                        const newMeals = {...state.meals}
                        delete newMeals[payload.id]
                        return {...state, 
                                meals:{...newMeals},
                                totalCarbs: state.totalCarbs - mealLineItems[payload.id].carbs,
                                totalCalories: state.totalCalories - mealLineItems[payload.id].calories,
                                totalFat: state.totalFat - mealLineItems[payload.id].fat,
                                totalProtein: state.totalProtein - mealLineItems[payload.id].protein,
                        }
                    }
                    return {...state, 
                                meals: {...state.meals, 
                                    [payload.id]:{...state.meals[payload.id], qty:state.meals[payload.id].qty - 1}
                                },
                                totalCarbs: state.totalCarbs - mealLineItems[payload.id].carbs,
                                totalCalories: state.totalCalories - mealLineItems[payload.id].calories,
                                totalFat: state.totalFat - mealLineItems[payload.id].fat,
                                totalProtein: state.totalProtein - mealLineItems[payload.id].protein,
                    }
                }    
            case ACTION_TYPES.SET_CALORIES:
                return {...state, targetCalories:payload}
            case ACTION_TYPES.SET_FAT:
                return {...state, targetFat:payload}
            case ACTION_TYPES.SET_PROTEIN:
                return {...state, targetProtein:payload}
            case ACTION_TYPES.SET_CARBS:
                return {...state, targetCarbs:payload}
            case ACTION_TYPES.SET_DAYS:
                const newDays = payload.map((item)=>{
                    if (item instanceof DateObject) return item.format('YYYY-MM-DD')
                    return item
                })    
                return {...state, days:newDays, dateObjects:payload}
            case ACTION_TYPES.FORMAT_DAYS:
                return state
            default:
                return state
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(meals)
        DataService.addMeal(meals)
    }

    //api call to get static recipes, custom recipes and ingredients

    return (
        <Box>
            {/* create meals */}
            <form onSubmit={handleSubmit}>
                <Box sx={{display:'flex', gap:'2rem'}}>
                    <MacroCounter 
                        dispatch={dispatch} 
                        macroTarget={meals.targetCalories} 
                        macroValue={meals.totalCalories} 
                        labelText='Calories' 
                        handleChange={e=>dispatch({type:ACTION_TYPES.SET_CALORIES, payload:e.target.value})}/>
                    <MacroCounter 
                        dispatch={dispatch} 
                        macroTarget={meals.targetCarbs} 
                        macroValue={meals.totalCarbs} 
                        labelText='Carbs' 
                        handleChange={e=>dispatch({type:ACTION_TYPES.SET_CARBS, payload:e.target.value})}/>
                        
                    <MacroCounter 
                        dispatch={dispatch} 
                        macroTarget={meals.targetFat} 
                        macroValue={meals.totalFat} 
                        labelText='Fat' 
                        handleChange={e=>dispatch({type:ACTION_TYPES.SET_FAT, payload:e.target.value})}/>
                        
                    <MacroCounter 
                        dispatch={dispatch} 
                        macroTarget={meals.targetProtein} 
                        macroValue={meals.totalProtein} 
                        labelText='Protein' 
                        handleChange={e=>dispatch({type:ACTION_TYPES.SET_PROTEIN, payload:e.target.value})}/>
                        
                </Box>
                
                <Stack gap={3}>

                    {/* <CustomRecipeAutoComplete customRecipes={customRecipes} dispatch={dispatch}/> */}
                    <MealPane mealLineItems={meals.meals} dispatch={dispatch} />
                    <MealSelection selectOptions={mealLineItems} dispatch={dispatch} />
                    <Typography>When?</Typography>
                    <DatePicker 
                        style={{width:'100%', fontSize:'28px', height:'5vh', textAlign:'center', border:'none'}} 
                        multiple 
                        onChange={e=>dispatch({type:ACTION_TYPES.SET_DAYS, payload:e})}
                        value={meals.dateObjects}
                        format='DD MMM YY'
                    />
                    {/* <Calendar/> */}
                </Stack>
                {/* Create a grid of cards. Top Row is scrolling ingredients, middle row is custom recipes, bottom row is static recipes */}
                {/* Each card has a Add or remove button. Add can be clicked multiple times to add multiple of that meal, Each card tracks the number of times its been clicked */}
                <Button type='submit'>Add</Button>

            </form>
        
        
        </Box>
    )
}