import { Stack, Paper, Typography,  Button } from "@mui/material"
import AddIcon from "@mui/icons-material/Add";
import IngredientsPaneEntry from "./IngredientsPaneEntry";
import IngredientsPaneRead from "./IngredientsPaneRead";


const INITIAL = {
    qty:0, 
    name:"", 
    unit:"g",
    fat:0,
    calories:0,
    protein:0,
    carbs:0,
    id:null
}
export default function IngredientsPane({recipeIngredients, setRecipeIngredients, ingredientCounter, setIngredientCounter, ingredients, isDisabled, readOnly=false}) {


    function handleAddIngredient() {
        setRecipeIngredients({...recipeIngredients, [ingredientCounter]:{...INITIAL}})
        setIngredientCounter(ingredientCounter+1)
        console.log(recipeIngredients)
    }

    return (
        <Paper elevation={3} sx={{overflow:'scroll', maxHeight:'45vh'}}>
            <Typography variant='h6'>Add Ingredients</Typography>
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
                                <IngredientsPaneEntry 
                                    keyID={keyID}
                                    recipeIngredients={recipeIngredients}
                                    setRecipeIngredients={setRecipeIngredients}
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