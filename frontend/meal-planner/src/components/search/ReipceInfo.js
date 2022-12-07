import { Box, Stack } from "@mui/material"

export default function RecipeInfo(props) {
    const {recipeInfo, setRecipeInfo} = props

    return (
        <Stack>
            {recipeInfo}
        </Stack>
    )
}