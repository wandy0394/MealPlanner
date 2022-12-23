import { Box, Button, IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tabs, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import IngredientsPane from "./IngredientsPane";
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import TabPanel, { postcardHeight } from "./utility/RecipePostCardUtil";
import {InfoCard, ImageBlank, tabStyle, buttonStyle, postcardStyle, summaryStyle, sectionStyle, MAX_CHARS} from "./utility/RecipePostCardUtil";
import {UnitConverter} from "../utility/Units"
import { ACTION_TYPES } from "./utility/ActionTypes";
import useGetRecipe from "./utility/useGetRecipe";
import RecipeService from "../../service/recipe-service";
import IngredientsPaneRead from "./IngredientsPaneRead";
import EditRecipePostCard from "./EditRecipePostCard";
import ReadCustomRecipePostCard from "./ReadCustomRecipePostCard";


const calculator = new UnitConverter()

export default function CustomRecipePostCard(props) {
    const {recipeId} = props

    const [readOnly, setReadOnly] = useState(true)
    const [recipe, dispatch] = useGetRecipe(recipeId)

    return (
        <>
            {
                (readOnly) && (<ReadCustomRecipePostCard recipe={recipe} readOnly={readOnly} setReadOnly={setReadOnly}/>)
            }
            {
                (!readOnly) && (<EditRecipePostCard recipeId={recipeId} recipe={recipe} dispatch={dispatch} readOnly={readOnly} setReadOnly={setReadOnly}/>)
            }
        </>
        
    )
}