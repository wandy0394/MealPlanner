import { Badge, Button, Card, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ContentBox } from "../components/utility/ContentBox";
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import CreateIngredientForm from "../components/ingredient/CreateIngredientForm";
import { useEffect, useState } from "react";
import IngredientsList from "../components/ingredient/IngredientsList";
import EditIcon from "@mui/icons-material/Edit"
import IngredientService from "../service/ingredient-service";
import MainPane from "../layouts/MainPane";

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
            const result = await IngredientService.getIngredients()
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    let called = false
    useEffect(()=> {
        if (!called) {
            refresh()
        }
        return () => {
            called = true
        }
    }, [])
    async function handleDelete(id) {
        await IngredientService.removeIngredient(id) 
        refresh() 
    }

    return (
        <MainPane
            title='A List of your Favourite Ingredients'
            mainContent={
                <>
                    <Stack gap={1}>
                        <Box sx={{width:'100%'}}>
                            <Button variant='contained' sx={{width:'100%'}} onClick={handleClickOpen} startIcon={<EditIcon/>}>Edit List</Button>
                        </Box>
                        <CreateIngredientForm 
                            open={open} 
                            handleClose={handleClose} 
                            refresh={refresh}
                            ingredients={ingredients}
                            />

                        <IngredientsList 
                            ingredients={ingredients}
                            handleDelete={handleDelete}
                            />
                    </Stack>
                </>
            }
        >
        </MainPane>
    )
}