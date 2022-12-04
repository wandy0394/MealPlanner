import { Badge, Button, Card, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ContentBox } from "../components/utility/ContentBox";
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import CreateIngredientForm from "../components/ingredient/CreateIngredientForm";
import { useEffect, useState } from "react";
import DataService from "../service/data-service";
import IngredientsList from "../components/ingredient/IngredientsList";
import EditIcon from "@mui/icons-material/Edit"

export default function Ingredients() {
    const [open, setOpen] = useState(false)
    const [ingredients, setIngredients] = useState([])

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }

    async function refresh() {
        try {
            console.log('Refreshing')
            const result = await DataService.getIngredients()
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        refresh()
    }, [])
    

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}} gap={1}>
                <Box>
                    <Typography variant={'h3'} sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>
                        A List of your Favourite Ingredients
                        <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                    </Typography>
                </Box>
                <Box sx={{width:'100%'}}>
                    <Button variant='contained' sx={{width:'100%'}} onClick={handleClickOpen} startIcon={<EditIcon/>}>Edit List</Button>
                </Box>
                <CreateIngredientForm 
                    open={open} 
                    handleClose={handleClose} 
                    refresh={refresh}
                    ingredients={ingredients}
                />

                <IngredientsList ingredients={ingredients}/>
            </Stack>
        </ContentBox>
    )
}