import { Stack, Paper, Typography,  Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import IngredientsPaneEdit from "./IngredientsPaneEdit";
import IngredientsPaneRead from "./IngredientsPaneRead";
import DataService from "../../service/data-service";
import { useEffect, useState } from "react";
import { ACTION_TYPES } from "./ActionTypes";


const INITIAL = {
    qty:0, 
    name:"", 
    unit:"g",
    fat:0,
    calories:0,
    protein:0,
    carbs:0,
    food_id:''
}
export default function IngredientsPane({recipeIngredients, dispatch, isDisabled, readOnly=false}) {

    const [ingredients, setIngredients] = useState([])

    useEffect(()=>{
        getIngredients()
    },[])

    function handleAddIngredient() {
        dispatch({type:ACTION_TYPES.ADD_INGREDIENT, payload:{...INITIAL}})
    }
    async function getIngredients() {
        try {
            console.log('Refreshing Ingredients')
            const result = await DataService.getIngredients()
            console.log(result)
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    return (
        <Paper elevation={3} sx={{overflow:'scroll', maxHeight:'45vh'}}>
            <Typography variant='h6'>Add Ingredients2</Typography>
            <Stack gap={2}>
                {
                   readOnly ? (Object.entries(recipeIngredients).map(([keyID, ingrObj], index)=> {
                        return (
                            <IngredientsPaneRead 
                                keyID={keyID}
                                ingredient={ingrObj}
                            />
                        )
                    })) : (
                        Object.entries(recipeIngredients).map(([keyID, ingrObj], index)=> {
                            return (
                                <IngredientsPaneEdit
                                    keyID={keyID}
                                    recipeIngredients={recipeIngredients}
                                    dispatch={dispatch}
                                    ingredients={ingredients}
                                    isDisabled={isDisabled}
                                />
                            )
                        })
                    )
                }
                <Button 
                    type='button' 
                    variant='contained' 
                    sx={{width:'100%'}} 
                    onClick={handleAddIngredient}
                    disabled={isDisabled}
                >
                    <AddIcon/>
                </Button>
            </Stack>
        </Paper>
    )   
}