import SearchIngredientResults from "./SearchIngredientResult";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, PaginationItem } from "@mui/material";

export default function IngredientResultsSection({data}) {

    let cleanedData = null
    const columnHeaders = [
        'ID',
        'Name',
        'Description',
        'Calories',
        'Carbs',
        'Protein',
        'Fat'
    ]
    let tableRows = []
    //console.log(data)
    if (data.total_results > 1) {
        //api returns food array if results are more than 1, otherwise it just returns one item
        cleanedData = data.food
    }
    else if (data.total_results == 1) {
        cleanedData = [data.food]
        
    }
    if (cleanedData !== null) {
        tableRows = cleanedData.map((item) => {
            return (
                {   
                    ID: item.food_id, 
                    Name: item.food_name,
                    Description: item.food_description,
                    Calories: 'calories',
                    Carbs: 'carbs',
                    Fat: 'fat',
                    Protein: 'protein'
                }
            )
        })
    }
    console.log(cleanedData)



    return (
        <Box sx = {{display:'flex', flexDirection: 'column', alignItems:'center'}}>
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
                                                columnHeaders.map((header, index) => {
                                                    let cellId = index.toString() + row.ID.toString() 
                                                    return <TableCell key={cellId}>{row[header]}</TableCell>
                                                })
                                            }
                                        </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}