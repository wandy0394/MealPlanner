import {Box, Button, Stack, TextField, Typography} from "@mui/material"
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ACTION_TYPES } from "./ActionTypes";
import { useEffect, useReducer, useState } from "react"
import DataService from "../../service/data-service"
import MealSelection from "./MealSelection";
import MealPane from "./MealPane";
import {Calendar, DateObject} from "react-multi-date-picker"
import DatePicker from "react-multi-date-picker"
import MacroCounter from "./MacroCounter";


function initMeal(selectedMeal, mealLineItems) {
    let meals={}

    Object.values(selectedMeal.recipes).forEach((item)=>{
        const key = Object.keys(mealLineItems).filter((key)=>{
            return (mealLineItems[key].recipe_id === item.recipe_id && mealLineItems[key].type === 'custom')
        })
        meals[key] = {
                name:mealLineItems[key].name, 
                recipe_id:mealLineItems[key].recipe_id,
                type:mealLineItems[key].type, 
                qty:item.qty,
                operation:'update'
        }
    })
    Object.values(selectedMeal.staticRecipes).forEach((item)=>{
        const key = Object.keys(mealLineItems).filter((key)=>{
            return (mealLineItems[key].recipe_id === item.recipe_id && mealLineItems[key].type === 'static')
        })
        meals[key] = {
                name:mealLineItems[key].name, 
                recipe_id:mealLineItems[key].recipe_id,
                type:mealLineItems[key].type, 
                qty:item.qty,
                operation:'update',
                isNew:false
        }
    })

    return meals
}


export default function EditMealForm(props) {
    const {selectedMeal, dateValue, mealLineItems} = props
    // const [mealLineItems, setMealLineItems] = useGetAllFood()
    const INITIAL_MEALS = {
        meal_id:selectedMeal.meal_id,
        meals:initMeal(selectedMeal, mealLineItems),
        targetCarbs:selectedMeal.targetCarbs,
        targetCalories:selectedMeal.targetCalories,
        targetProtein:selectedMeal.targetProtein,
        targetFat:selectedMeal.targetFat,
        totalCarbs:selectedMeal.totalCarbs,
        totalCalories:selectedMeal.totalCalories,
        totalFat:selectedMeal.totalFat,
        totalProtein:selectedMeal.totalProtein,
        days:[dateValue.format('YYYY-MM-DD')],
        dateObjects:[dateValue]
    }
    const [meals, dispatch] = useReducer(reducer, INITIAL_MEALS)
    function reducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.ADD_MEAL:
                if (payload.id in state.meals) {
                    return {...state, 
                                meals: {...state.meals, 
                                        [payload.id]:
                                            {   
                                                ...state.meals[payload.id],
                                                // name:payload.name, 
                                                // recipe_id:payload.recipe_id,
                                                // type:payload.type, 
                                                qty:state.meals[payload.id].qty + 1,
                                                operation: (state.meals[payload.id].isNew) ? 'insert' : 'update'
                                            },
                                },
                                totalCarbs: state.totalCarbs + mealLineItems[payload.id].carbs,
                                totalCalories: state.totalCalories + mealLineItems[payload.id].calories,
                                totalFat: state.totalFat + mealLineItems[payload.id].fat,
                                totalProtein: state.totalProtein + mealLineItems[payload.id].protein,
                    }
                }
                return {...state, 
                            meals: {...state.meals, 
                                    [payload.id]:{name:payload.name, recipe_id:payload.recipe_id, type:payload.type, qty:1, operation:'insert', isNew:true}
                            },
                            totalCarbs: state.totalCarbs + mealLineItems[payload.id].carbs,
                            totalCalories: state.totalCalories + mealLineItems[payload.id].calories,
                            totalFat: state.totalFat + mealLineItems[payload.id].fat,
                            totalProtein: state.totalProtein + mealLineItems[payload.id].protein,
                }
            case ACTION_TYPES.REMOVE_MEAL:
                if (payload.id in state.meals) {
                    const currQty = state.meals[payload.id].qty
                    if (currQty === 0) {
                        return state
                    }
                    if (currQty === 1) {
                        return {...state, 
                                meals: {...state.meals, 
                                    [payload.id]:{...state.meals[payload.id], qty:state.meals[payload.id].qty - 1, operation:'delete'}
                                },
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
        DataService.updateMeal(meals)
    }

    //api call to get static recipes, custom recipes and ingredients

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{height:'70vh', width:'70vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
            {/* create meals */}
                <Box>
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
                            //multiple 
                            //onChange={e=>dispatch({type:ACTION_TYPES.SET_DAYS, payload:e})}
                            value={dateValue}
                            format='DD MMM YY'
                            disabled
                        />
                        {/* <Calendar/> */}
                        <Button type='submit'>Save</Button>
                    </Stack>

                </Box>
            </Box>
        </form>
    )
}