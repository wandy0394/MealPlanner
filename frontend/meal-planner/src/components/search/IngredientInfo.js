import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import DataService from "../../service/data-service"

export default function IngredientInfo(props) {
    const {ingredientId} = props
    const [instructions, setInstructions] = useState('')
    const [macros, setMacros] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')

    useEffect(()=> {
        

        getIngredient()
        
    }, [ingredientId])

  
    async function getIngredient() {
        if (ingredientId === '') return
        try {
            const data = await DataService.getIngredient(ingredientId)
            console.log(data)  
            //parseData(data.recipe)
        }
        catch (e) {
            console.error('error')
            console.log(e)
        }
    }

    function parseData(data) {

    }


    return (
        
        <Box sx={{height:'100%', border:'solid'}}>
            <Box>
                <Typography variant='h3' sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>
                    Nutrition Information
                </Typography>
            </Box>
            <Box>

            </Box>

        </Box>
        
    )
}