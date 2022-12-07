import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"

export default function IngredientInfo(props) {
    const {ingredientInfo, setIngredientInfo} = props
    const [info, setInfo] = useState('')
    
    useEffect(()=> {
        
        setInfo(ingredientInfo)
    }, [ingredientInfo])

    return (
        <Stack>
            {info}
        </Stack>
    )
}