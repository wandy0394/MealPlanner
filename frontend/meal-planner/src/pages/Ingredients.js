import { Badge, Button, Card, IconButton, Paper, requirePropFactory, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ContentBox } from "../components/utility/ContentBox";
import AddIcon from '@mui/icons-material/Add'
import RefreshIcon from '@mui/icons-material/Refresh'
import CreateIngredientForm from "../components/CreateIngredientForm";
import { useEffect, useState } from "react";
import DataService from "../service/data-service";

export default function Ingredients() {
    const [open, setOpen] = useState(false)
    const [ingredients, setIngredients] = useState([])

    function handleClickOpen() {
        setOpen(true)
    }
    const handleClose = () => {
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
            <Stack sx={{height:'100%'}}>
                <Box>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>
                            A List of your Favourite Ingredients
                            <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                        </Typography>
                    </Paper>
                </Box>
                <Box sx={{width:'100%'}}>
                    <Button variant='contained' sx={{width:'100%'}} onClick={handleClickOpen}><AddIcon />Add an Ingredient</Button>
                </Box>
                <CreateIngredientForm open={open} handleClose={handleClose} refresh={refresh}/>
                <Box sx={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(400px, 1fr))', 
                            gridAutoRows:'auto', gap:'2rem', width:'100%', justifyItems:'center',
                            padding:'2rem 2rem'}} >
                    {
                        ingredients.map((item)=> {
                            return (
                                    <Card key={item.id} sx={{width:'400px', minWidth:'300px', height:'30vh'}}>
                                        {item.id}
                                        {item.name}
                                        {item.calories}
                                        {item.carbs}
                                        {item.fat}
                                        {item.protein}
                                    </Card>
                            )
                        })
                    }
                </Box>
            </Stack>
        </ContentBox>
    )
}