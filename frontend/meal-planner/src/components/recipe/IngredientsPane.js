import { Stack,  Typography,  Button, Box } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import IngredientsPaneEdit from "./IngredientsPaneEdit";
import { useEffect, useState } from "react";
import { ACTION_TYPES } from "./utility/ActionTypes";
import IngredientService from "../../service/ingredient-service";


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
            const result = await IngredientService.getIngredients()
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
        <Box sx={{overflow:'auto', height:'100%', padding:''}}>
            <Stack gap={2}>
                <Box sx={{display:'flex', alignItems:'center', gap:'0rem', width:'100%'}}>
                    <Button 
                        type='button' 
                        variant='contained' 
                        sx={{width:'100%'}}
                        onClick={handleAddIngredient}
                        disabled={readOnly}
                        
                    >
                        <AddIcon/>
                    </Button>
                </Box>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-around', alignItems:'flex-end'}}>
                    <Typography variant='body2' sx={{width:'10%'}}>Qty</Typography>
                    <Typography variant='body2' sx={{width:'10%'}}>Unit</Typography>
                    <Typography variant='body2' sx={{width:'60%'}}>Ingredient</Typography>
                </Box>
                {
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
                }
            </Stack>
        </Box>
    )   
}