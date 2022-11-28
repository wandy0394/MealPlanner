import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContentBox } from "../components/ContentBox";
import DataService from "../service/data-service";

export default function SearchDetails(props) {
    const params = useParams()
    const [recipe, setRecipe] = useState({})

    useEffect(()=> {
        getRecipe()
    }, [])
    async function getRecipe() {
        try {
            const data = await DataService.getRecipe(params.id)
            console.log(data)    
        }
        catch (e) {
            console.error('error')
        }
    }

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box sx={{border:'solid'}}>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>
                            Recipe Details
                        </Typography>
                    </Paper>
                </Box>

            </Stack>
        </ContentBox>
    )
}