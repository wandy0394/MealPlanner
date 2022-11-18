import SearchRecipeResults from "./SearchRecipeResult";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"

export default function RecipeResultsSection({data}) {

    let cleanedData = null
    let tableRows = []
    const columnHeaders = [
        'ID',
        'Title',
        'Description',
        'Calories',
        'Carbs',
        'Protein',
        'Fat'
    ]
    let recipeData = data.recipes
    if (recipeData.total_results > 1) {
        //api returns food array if results are more than 1, otherwise it just returns one item
        cleanedData = recipeData.recipe
    }
    else if (recipeData.total_results == 1) {
        cleanedData = [recipeData.recipe]        
    }

    if (cleanedData !== null) {
        tableRows = cleanedData.map((item) => {
            return (
                {   
                    ID: item.recipe_id, 
                    Title: item.recipe_name,
                    Description: item.recipe_description,
                    Calories: item.recipe_nutrition.calories,
                    Carbs: item.recipe_nutrition.carbohydrate,
                    Fat: item.recipe_nutrition.fat,
                    Protein: item.recipe_nutrition.protein
                }
            )
        })
    }
    //console.log(tableRows)

    return (
        // <Box sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
        //     {
        //         (cleanedData !== null) ? 
        //             (   
        //                 cleanedData.map((item, index)=> {
        //                     return <SearchRecipeResults data={item} key={index}/>
        //                 })                        
        //             ) : ('No Recipes Found.')
        //     }
        // </Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columnHeaders.map((item)=> {
                                return <TableCell>{item}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableRows.map((row) => {
                            return <TableRow key={row.ID}>
                                        {
                                            //  <TableCell>{row.Title}</TableCell>
                                            columnHeaders.map((header) => {
                                                return <TableCell>{row[header]}</TableCell>
                                            })
                                        }
                                    </TableRow>
                        })

                    }
                </TableBody>


            </Table>
        </TableContainer>
    )
}