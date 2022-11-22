import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"


export default function AddIngredientModel({open, handleClose}) {
    


    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add your own ingredient</DialogTitle>
                <DialogContent sx={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                    <TextField variant='standard' label='Name'></TextField>
                    <TextField variant='standard' label='Calories' type='number' InputProps ={{ inputProps:{min:0}, endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Carbs' type='number' InputProps ={{inputProps:{min:0}, endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Protein' type='number' InputProps ={{inputProps:{min:0}, endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>
                    <TextField variant='standard' label='Fats' type='number' InputProps ={{inputProps:{min:0}, endAdornment: <InputAdornment position='end'>per 100g</InputAdornment>}}></TextField>

                </DialogContent>
            </Dialog>
        </Box>
    )
}