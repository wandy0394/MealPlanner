import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ContentBox } from "../components/ContentBox";
export default function Ingredients() {
    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box sx={{flexGrow:'1'}}>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>A List of your Favourite Ingredients</Typography>
                    </Paper>
                </Box>
            
            
            </Stack>
        </ContentBox>
    )
}