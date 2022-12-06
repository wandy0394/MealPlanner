import { Stack, Paper, Typography,  Button, Box } from "@mui/material"
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
    food_id:'',
    operation:'insert',
}

function useGetIngredients() {
    const [ingredients, setIngredients] = useState([])
    let called = false
    useEffect(()=> {        
        if (!called) getIngredients()
        return () => {
            called = true
        }
    }, [])
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
    return [ingredients, setIngredients]
}


export default function IngredientsPane({recipeIngredients, dispatch, readOnly=false}) {

    function handleAddIngredient() {
        dispatch({type:ACTION_TYPES.ADD_INGREDIENT, payload:{...INITIAL}})
    }
    const [ingredients, setIngredients] = useGetIngredients()//useState([])


    return (
        <Paper elevation={3} sx={{overflow:'auto', height:'100%', padding:'1rem'}}>
            <Stack gap={2}>
                <Box sx={{display:'flex', alignItems:'center', gap:'1rem'}}>
                    <Button 
                        type='button' 
                        variant='contained' 
                        
                        onClick={handleAddIngredient}
                        disabled={readOnly}
                    >
                        <AddIcon/>
                    </Button>
                    <Typography variant='h6'>Ingredients List</Typography>
                </Box>
                
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
                                    isDisabled={readOnly}
                                />
                            )
                        })
                    )
                }

            </Stack>
        </Paper>
    )   
}