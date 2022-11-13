import SearchIngredientResults from "./SearchIngredientResult";
import { Box } from "@mui/material";

export default function IngredientResultsSection({data}) {

    let cleanedData = null
    if (data.total_results > 1) {
        //api returns food array if results are more than 1, otherwise it just returns one item
        cleanedData = data.food
    }
    else if (data.total_results == 1) {
        cleanedData = [data.food]
        
    }
    console.log(cleanedData)
    return (
        <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            {
                (cleanedData !== null) ? 
                    (   
                        cleanedData.map((item, index)=> {
                            return <SearchIngredientResults data={item} key={index}/>
                        })                        
                    ) : ('No Results')
            }
        </Box>
    )
}