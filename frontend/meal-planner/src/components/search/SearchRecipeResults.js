
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {strawTheme} from '../utility/StrawTheme'

export default function SearchRecipeResults({data, getRecipe}) {
    const navigate = useNavigate()
    let cleanedData = null
    let tableRows = []
    const [detail, setDetail] = useState('')
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
    async function handleRowClick(e, id) {
        // console.log(id)
        // navigate('details/'+id)
        const result = await getRecipe(id)
        setDetail(result)
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow  sx={{backgroundColor:strawTheme.palette.primary.main}}>
                        {
                            columnHeaders.map((item, index)=> {
                                return <TableCell key={index}>{item}</TableCell>
                            })
                        }
                        {/* <TableCell>Details</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableRows.map((row) => {
                            return (
                                        <>
                                            <TableRow key={row.ID} onClick={(e, id) => handleRowClick(e, row.ID)} sx= {{'&:hover':{backgroundColor: '#EEEEEE', cursor:'pointer'}}}>
                                            
                                                {
                                                    columnHeaders.map((header) => {
                                                        return <TableCell>{row[header]}</TableCell>
                                                    })
                                                }

                                            
                                            {/* <TableCell><Link to={'details/'+row.ID}>More</Link></TableCell> */}
                                            </TableRow>
                                        </>
                            )
                        })

                    }
                </TableBody>


            </Table>
        </TableContainer>
    )
}