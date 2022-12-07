
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {strawTheme} from '../utility/StrawTheme'

export default function SearchRecipeResults({data, setRecipeId}) {
    const navigate = useNavigate()
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
    else if (recipeData.total_results === 1) {
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
    function handleRowClick(e, id) {
        // console.log(id)
        // navigate('details/'+id)
        setRecipeId(id)
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow  sx={{backgroundColor:strawTheme.palette.primary.main}}>
                        {
                            columnHeaders.map((item)=> {
                                return <TableCell>{item}</TableCell>
                            })
                        }
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableRows.map((row) => {
                            return <TableRow key={row.ID} onClick={(e, id) => handleRowClick(e, row.ID)} sx= {{'&:hover':{backgroundColor: '#EEEEEE', cursor:'pointer'}}}>
                                        
                                        {
                                            columnHeaders.map((header) => {
                                                return <TableCell>{row[header]}</TableCell>
                                            })
                                        }
                                        <TableCell><Link to={'details/'+row.ID}>More</Link></TableCell>
                                    </TableRow>
                        })

                    }
                </TableBody>


            </Table>
        </TableContainer>
    )
}