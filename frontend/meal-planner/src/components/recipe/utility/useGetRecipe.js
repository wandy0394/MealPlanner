import { useEffect, useReducer } from "react";
import { ACTION_TYPES } from "./ActionTypes";
import { INITIAL_RECIPE } from "./RecipePostCardUtil";
import DataService from "../../../service/data-service";

let originalRecipe
export default function useGetRecipe(id) {
    const [recipe, dispatch] = useReducer(reducer, INITIAL_RECIPE)
    let called = false
    useEffect(()=> {        
        if (!called) getRecipe(id)
        return () => {
            called = true
        }
    }, [])
    async function getRecipe(id) {
        try {
            console.log('Refreshing recipe')
            const result = await DataService.getStoredRecipe(id)
            dispatch({type:ACTION_TYPES.SET_RECIPE, payload:result[id]})
            originalRecipe = result[id]
            console.log(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    function reducer (state, action) {
        const {type, payload} = action
        switch(type) {
            case ACTION_TYPES.RESET_RECIPE:
                return {...originalRecipe, counter:originalRecipe.counter+1}
            case ACTION_TYPES.SET_RECIPE:
                return {...payload, counter:payload.counter+1}
            case ACTION_TYPES.SET_TITLE:
                return {...state, title:payload}
            case ACTION_TYPES.SET_MACROS:
                return {...state, macros:payload}
            case ACTION_TYPES.SET_INSTRUCTIONS:
                return {...state, instructions:payload}
            case ACTION_TYPES.SET_COUNTER:
                return {...state, counter:payload}
            case ACTION_TYPES.SET_INGREDIENTS:
                return {...state, ingredients:payload}
            case ACTION_TYPES.UPDATE_INGREDIENTS:
                return {...state, ingredients:{...state.ingredients, [payload.id]:payload.data}}
            case ACTION_TYPES.INCREMENT_COUNTER:
                return{...state, counter: state.counter + 1}
            case ACTION_TYPES.ADD_INGREDIENT:
                return {...state, ingredients:{...state.ingredients, [state.counter]:payload}, counter:state.counter+1} 
            case ACTION_TYPES.DELETE_INGREDIENT:
                let newIngredients = {...state.ingredients}
                newIngredients[payload].operation = 'delete'
                return {...state, ingredients:newIngredients}    
            case ACTION_TYPES.UNDO_DELETE_INGREDIENT: 
                let temp = {...state.ingredients}
                temp[payload].operation = 'update'
                return {...state, ingredients:temp}    
            case ACTION_TYPES.UPDATE_QTY:
                return {...state, 
                    ingredients:{
                        ...state.ingredients, 
                        [payload.id]:{
                            ...state.ingredients[payload.id], 
                            qty:payload.data
                        }
                    }
                }
            case ACTION_TYPES.UPDATE_UNIT:
                return {...state, 
                    ingredients:{
                        ...state.ingredients, 
                        [payload.id]:{
                            ...state.ingredients[payload.id], 
                            unit:payload.data
                        }
                    }
                }
            case ACTION_TYPES.SET_SERVINGS:
                return {...state, servings:payload}
            case ACTION_TYPES.SET_PREP_TIME:
                return {...state, prepTime:payload}
            case ACTION_TYPES.SET_COOK_TIME:
                return {...state, cookTime:payload}
            case ACTION_TYPES.SET_SERVING_SIZE:
                return {...state, serving_size:payload}
            case ACTION_TYPES.SET_RECIPE_DESCRIPTION:
                return {...state, recipe_description:payload}
            default:
                return state
        }
    }

    return [recipe, dispatch]
}
