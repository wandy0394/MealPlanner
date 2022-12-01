import { Box, Button, TextField, Typography } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'

export default function RecipeNameInput({title, setTitle, isDisabled=false}) {

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    return (
        <Box sx={{display:'flex', gap:'1rem', padding:'1rem', alignItems:'center'}}>
        <TextField variant='standard' label='Recipe Name' required sx={{padding:'1rem'}} 
            onChange={handleTitleChange} value={title}
        />
        <Button disabled={isDisabled} variant='contained' sx={{height:'50%'}} type='submit'>
            <SaveIcon/>
            <Typography variant='body' sx={{padding:'0 1rem'}}>Save Recipe</Typography>
        </Button>
    </Box>    
    )
}