import AddBox from "@mui/icons-material/AddBox";
import { Paper, Stack, Box, Typography } from "@mui/material";

import { ContentBox } from "../components/ContentBox";
export default function ShoppingList() {
    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box sx={{flexGrow:'1'}}>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>Remember to grab these</Typography>
                    </Paper>
                </Box>
            </Stack>
        </ContentBox>
    )
}