import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'
import { ACTION_TYPES } from "./ActionTypes";

export default function RecipeNameInput({title, cookTime, prepTime, servings, dispatch}) {

    function handleTitleChange(e) {
        dispatch({type:ACTION_TYPES.SET_TITLE, payload:e.target.value})
    }
    function handleCookTimeChange(e) {
        dispatch({type:ACTION_TYPES.SET_COOK_TIME, payload:e.target.value})
    }
    function handlePrepTimeChange(e) {
        dispatch({type:ACTION_TYPES.SET_PREP_TIME, payload:e.target.value})
    }
    function handleServingsChange(e) {
        dispatch({type:ACTION_TYPES.SET_SERVINGS, payload:e.target.value})
    }

    return (
        <Paper sx={{padding:'1rem'}}>
            <Typography variant='h6'>Summary</Typography>
            <Box sx={{display:'flex', gap:'1rem', padding:'1rem', alignItems:'flex-end'}}>
                <TextField 
                    variant='standard' 
                    label='Recipe Name' 
                    required 
                    sx={{padding:'1rem', width:'70%'}} 
                    onChange={handleTitleChange} 
                    value={title}
                    inputProps={{style:{fontSize:40}}}
                />
                <TextField 
                    variant='standard' 
                    label='Servings'  
                    sx={{padding:'1rem'}} 
                    inputProps={{min:0, type:'number'}}
                    onChange={handleServingsChange} 
                    value={servings}
                />
                <TextField 
                    variant='standard' 
                    label='Prep Time (min)'  
                    sx={{padding:'1rem'}} 
                    inputProps={{min:0, type:'number'}}
                    onChange={handlePrepTimeChange} 
                    value={prepTime}
                />
                <TextField 
                    variant='standard' 
                    label='Cook Time (min)'  
                    sx={{padding:'1rem'}} 
                    inputProps={{min:0, type:'number'}}
                    onChange={handleCookTimeChange} 
                    value={cookTime}
                />
                
            </Box>    
        </Paper>
    )
}