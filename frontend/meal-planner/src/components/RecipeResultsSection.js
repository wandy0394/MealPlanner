import SearchRecipeResults from "./SearchRecipeResult";
import { Box } from "@mui/material";

export default function RecipeResultsSection({data}) {

    let cleanedData = null
    let recipeData = data.recipes
    if (recipeData.total_results > 1) {
        //api returns food array if results are more than 1, otherwise it just returns one item
        cleanedData = recipeData.recipe
    }
    else if (data.total_results == 1) {
        //cleanedData = [data.food]
        
    }
    console.log(cleanedData)
    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            {
                (cleanedData !== null) ? 
                    (   
                        cleanedData.map((item, index)=> {
                            return <SearchRecipeResults data={item} key={index}/>
                        })                        
                    ) : ('No Results')
            }
        </Box>
    )
}