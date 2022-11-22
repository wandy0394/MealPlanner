import { Badge, Button, Card, IconButton, Paper, requirePropFactory, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ContentBox } from "../components/ContentBox";
import AddIcon from '@mui/icons-material/Add'
import AddIngredientModel from "../components/AddIngredientModal";
import { useState } from "react";

export default function Ingredients() {
    const [open, setOpen] = useState(false)

    function handleClickOpen() {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box sx={{border:'solid'}}>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>A List of your Favourite Ingredients</Typography>
                    </Paper>
                </Box>
                <Box sx={{border:'solid', width:'100%'}}>
                    <Button variant='contained' sx={{width:'100%'}} onClick={handleClickOpen}><AddIcon />Add an Ingredient</Button>
                </Box>
                <AddIngredientModel open={open} handleClose={handleClose}/>
                <Box sx={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', 
                            gridAutoRows:'auto', gap:'2rem', width:'100%', border:'solid', justifyItems:'center',
                            padding:'2rem 2rem'}} >
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                    <Card sx={{width:'400px', minWidth:'300px', height:'30vh'}}>Card Content</Card>
                </Box>
            
            
            </Stack>
        </ContentBox>
    )
}