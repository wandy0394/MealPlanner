import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import {strawTheme} from '../utility/StrawTheme'
import IngredientService from "../../service/ingredient-service";
import { SEVERITY } from "../utility/StatusSnackbar";
import SaveIngredientForm from "./SaveIngredientForm";
import { useState } from "react";

const DUMMY_DATA = [
    {food_id:11, food_name:'Food1', food_description:'Food'},
    {food_id:22, food_name:'Food2', food_description:'Food'},
    {food_id:33, food_name:'Food3', food_description:'Food'},
    {food_id:44, food_name:'Food4', food_description:'Food'},
    {food_id:55, food_name:'Food5', food_description:'Food'},
    {food_id:66, food_name:'Food6', food_description:'Food'},

]

export default function SearchIngredientResults({data, setIngredientId, setStatusMessageState=null}) {
    const [open, setOpen] = useState(false)
    const [ingredient, setIngredient] = useState({})


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
    if (data.total_results > 1) {
        //api returns food array if results are more than 1, otherwise it just returns one item
        cleanedData = data.food
    }
    else if (data.total_results === 1) {
        cleanedData = [data.food]
        
    }
    if (cleanedData !== null) {
        tableRows = cleanedData.map((item) => {
            const macros = parseDescription(item.food_description)
            return (
                {   
                    ID: item.food_id, 
                    Name: item.food_name,
                    Description: item.food_description,
                    Calories: macros.calories,
                    Carbs: macros.carbs,
                    Fat: macros.fat,
                    Protein: macros.protein
                }
            )
        })
    }
    

    function normaliseMacros(value, factor, servingSize) {
        //scales macronutrient values to 'Per 100g' if applicable
        return parseFloat(value/servingSize * factor).toFixed(2)
    }
    function parseDescription(text) {
        //description is in the format Serving Size - Calories: X | Fat: X | Carbs: X | Protein: X 
        const splitText = text.split('-')
        const serving = splitText[0].trim()
        const macros = splitText[1].split('|')
        let servingSize = 1
        let factor = 1
        const regex = /[0-9]*\.?[0-9]+g/i
        let normalised = false
        if (serving.match(regex)) {
            //console.log(serving)
            servingSize = parseFloat(serving.match(regex)[0].split('g')[0])
            factor = 100
            normalised = true
        }
        

        const output = {
            unit:serving,
            calories: normaliseMacros((macros[0].split(':')[1]).replace('kcal', '').trim(), factor, servingSize),
            fat: normaliseMacros((macros[1].split(':')[1]).replace('g', '').trim(), factor, servingSize),
            carbs:normaliseMacros((macros[2].split(':')[1]).replace('g', '').trim(), factor, servingSize),
            protein: normaliseMacros((macros[3].split(':')[1]).replace('g', '').trim(), factor, servingSize),
            normalised: normalised
        }
        return output
    }
    function parseServing(servingString) {
        
    }
    function handleAddClick(e, input) {
        const food = cleanedData.filter((item)=> {
            return (item.food_id === input)
        })
        const macros = parseDescription(food[0].food_description)
        
        const params = {
            name:food[0].food_name,
            calories:macros.calories,
            carbs:macros.carbs,
            fat:macros.fat,
            protein:macros.protein,
            food_id:food[0].food_id,
            unit: macros.unit,
            normalised:macros.normalised
        }
        // IngredientService.addIngredient(params)
        // if (setStatusMessageState !== null) {
        //     setStatusMessageState({message:`Ingredient (${food[0].food_name}) added.`, severity:SEVERITY.SUCCESS, isMessageVisible:true})
        // }
        setIngredient(params)
        setOpen(true)
    }

    function handleIngredientClick(e, id) {
        setIngredientId(id)
    }
    function handleClose() {
        setOpen(false)
    }

    return (
        <Box sx = {{display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow  sx={{backgroundColor:strawTheme.palette.primary.main}}>
                            <TableCell>Add</TableCell>
                            {
                                columnHeaders.map((item, index)=> {
                                    return <TableCell key={index}>{item}</TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tableRows.map((row) => {
                                return <TableRow key={row.ID} onClick={(e)=>handleIngredientClick(e, row.ID)} hover>
                                            <TableCell key={row.ID*2}>
                                                <Button key={row.ID} onClick={(e, input) => handleAddClick(e, row.ID)}>
                                                    <AddBoxIcon/>
                                                </Button>
                                            </TableCell>
                                            
                                            {
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
            <SaveIngredientForm
                open={open}
                handleClose={handleClose}
                ingredient={ingredient}
                setStatusMessageState={setStatusMessageState}
            />
        </Box>
    )
}