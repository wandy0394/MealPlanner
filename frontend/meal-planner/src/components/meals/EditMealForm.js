import {Box, Button, Stack} from "@mui/material"
import { ACTION_TYPES } from "./ActionTypes";
import { useReducer} from "react"
import {DateObject} from "react-multi-date-picker"
import DatePicker from "react-multi-date-picker"
import MacroCounter from "./MacroCounter";
import MealService from "../../service/meal-service";
import MealPicker from "./MealPicker";
import SaveIcon from '@mui/icons-material/Save'
import { strawTheme } from "../utility/StrawTheme";
import { SEVERITY } from "../utility/StatusSnackbar";


function initMeal(selectedMeal, mealItems) {
    let meals={}
    if (selectedMeal?.recipes !== undefined && mealItems.length !== 0) {
        Object.values(selectedMeal.recipes).forEach((item)=>{
            const key = Object.keys(mealItems).filter((key)=>{
                return (mealItems[key].recipe_id === item.recipe_id && mealItems[key].type === 'custom')
            })
            if (mealItems[key] !== undefined) {
                meals[key] = {
                    name:mealItems[key].name, 
                    recipe_id:mealItems[key].recipe_id,
                    type:mealItems[key].type, 
                    qty:item.qty,
                    operation:'update'
                }
            }
        })
        Object.values(selectedMeal.staticRecipes).forEach((item)=>{
            const key = Object.keys(mealItems).filter((key)=>{
                return (mealItems[key].recipe_id === item.recipe_id && mealItems[key].type === 'static')
            })
            if (mealItems[key] !== undefined) {
                meals[key] = {
                    name:mealItems[key].name, 
                    recipe_id:mealItems[key].recipe_id,
                    type:mealItems[key].type, 
                    qty:item.qty,
                    operation:'update',
                    isNew:false
                }
            }
        })

    }

    return meals
}


export default function EditMealForm(props) {
    const {selectedMeal, dateValue, mealItems, handleClose, setStatusMessageState, addMeal, ref} = props
    const INITIAL_MEALS = {
        meal_id:(selectedMeal.meal_id ? selectedMeal.meal_id : null),
        meals:initMeal(selectedMeal, mealItems),
        targetCarbs:(selectedMeal.targetCarbs ? selectedMeal.targetCarbs : 0),
        targetCalories:(selectedMeal.targetCalories ? selectedMeal.targetCalories : 0),
        targetProtein:(selectedMeal.targetProtein ? selectedMeal.targetProtein : 0),
        targetFat:(selectedMeal.targetFat ? selectedMeal.targetFat : 0),
        totalCarbs:(selectedMeal.totalCarbs ? selectedMeal.totalCarbs : 0),
        totalCalories:(selectedMeal.totalCalories ? selectedMeal.totalCalories : 0),
        totalFat:(selectedMeal.totalFat ? selectedMeal.totalFat : 0),
        totalProtein:(selectedMeal.totalProtein ? selectedMeal.totalProtein : 0),
        days:[dateValue.format('YYYY-M-D')],
        dateObjects:[dateValue]
    }
    const [meals, dispatch] = useReducer(reducer, INITIAL_MEALS)
    function reducer(state, action) {
        const {type, payload} = action
        switch (type) {
            case ACTION_TYPES.ADD_MEAL:
                if (payload.id in state.meals) {
                    return {...state, 
                                meals: {
                                    ...state.meals, 
                                    [payload.id]: {   
                                            ...state.meals[payload.id],
                                            name:payload.name, 
                                            recipe_id:payload.recipe_id,
                                            type:payload.type, 
                                            qty:state.meals[payload.id].qty + 1,
                                            operation: (state.meals[payload.id].isNew) ? 'insert' : 'update'
                                        },
                                },
                                totalCarbs: state.totalCarbs + mealItems[payload.id].carbs,
                                totalCalories: state.totalCalories + mealItems[payload.id].calories,
                                totalFat: state.totalFat + mealItems[payload.id].fat,
                                totalProtein: state.totalProtein + mealItems[payload.id].protein,
                    }
                }
                return {...state, 
                            meals: {
                                ...state.meals, 
                                [payload.id]:{name:payload.name, recipe_id:payload.recipe_id, type:payload.type, qty:1, operation:'insert', isNew:true}
                            },
                            totalCarbs: state.totalCarbs + mealItems[payload.id].carbs,
                            totalCalories: state.totalCalories + mealItems[payload.id].calories,
                            totalFat: state.totalFat + mealItems[payload.id].fat,
                            totalProtein: state.totalProtein + mealItems[payload.id].protein,
                }
            case ACTION_TYPES.REMOVE_MEAL:
                if (payload.id in state.meals) {
                    const currQty = state.meals[payload.id].qty
                    if (currQty === 0) {
                        return state
                    }
                    if (currQty === 1) {
                        return {...state, 
                                meals: {
                                    ...state.meals, 
                                    [payload.id]:{...state.meals[payload.id], qty:state.meals[payload.id].qty - 1, operation:'delete'}
                                },
                                totalCarbs: state.totalCarbs - mealItems[payload.id].carbs,
                                totalCalories: state.totalCalories - mealItems[payload.id].calories,
                                totalFat: state.totalFat - mealItems[payload.id].fat,
                                totalProtein: state.totalProtein - mealItems[payload.id].protein,
                        }
                    }
                    return {...state, 
                                meals: {
                                    ...state.meals, 
                                    [payload.id]:{
                                        ...state.meals[payload.id], 
                                        qty:state.meals[payload.id].qty - 1
                                    }
                                },
                                totalCarbs: state.totalCarbs - mealItems[payload.id].carbs,
                                totalCalories: state.totalCalories - mealItems[payload.id].calories,
                                totalFat: state.totalFat - mealItems[payload.id].fat,
                                totalProtein: state.totalProtein - mealItems[payload.id].protein,
                    }
                }
                return state    
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
                    if (item instanceof DateObject) return item.format('YYYY-M-D')
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
        if (meals.meal_id !== null) {
            MealService.updateMeal(meals)
            setStatusMessageState({message:'Meal updated.', severity:SEVERITY.SUCCESS, isMessageVisible:true})
            addMeal(dateValue, meals)
        }
        else {
            MealService.addMeal(meals)
            setStatusMessageState({message:'Meal added.', severity:SEVERITY.SUCCESS, isMessageVisible:true})
            addMeal(dateValue, meals)
        }
        handleClose()
    }
    function handleAddMeal(id, item) {
        dispatch({type:ACTION_TYPES.ADD_MEAL, payload:{id:id, name:item.name, recipe_id:item.recipe_id, type:item.type}})
    }
    function handleRemoveMeal(id, item) {
        dispatch({type:ACTION_TYPES.REMOVE_MEAL, payload:{id:id, item:item}}) 
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
                    display:'flex', 
                    flexDirection:'column', 
                    alignItems:'center', 
                    justifyContent:'center', 
                    background:strawTheme.palette.common.grey, 
                    padding:'2rem'
                }}
            >

            {/* create meals */}
            
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
                <Stack gap={2} sx={{width:'100%'}}>
                    <MealPicker
                        mealItems={mealItems} 
                        meals={meals.meals}
                        handleIncrement={handleAddMeal} 
                        handleDecrement={handleRemoveMeal}
                        sx={{ 
                            display:'flex', 
                            flexDirection:'column', 
                            gap:'2rem', 
                            width:'100%', 
                            border:'solid', 
                            height:'50vh', 
                            overflowY:'scroll', 
                            padding:'2rem', 
                            background:strawTheme.palette.common.white
                        }}
                    />

                    <DatePicker 
                        style={{width:'100%', fontSize:'28px', height:'5vh', textAlign:'center', border:'none'}} 
                        value={dateValue}
                        format='DD MMM YY'
                        disabled
                    />
                    <Button variant='contained' type='submit' sx={{width:'100%'}}><SaveIcon/></Button>

                </Stack>
            </Box>
        </form>
    )
}