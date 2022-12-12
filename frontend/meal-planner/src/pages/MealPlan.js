import AddBox from "@mui/icons-material/AddBox";
import { Paper, Stack, Box, Typography } from "@mui/material";
import CreateMealForm from "../components/meals/CreateMealForm";

import { ContentBox } from "../components/utility/ContentBox";
export default function MealPlans() {
    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box sx={{flexGrow:'1'}}>
                    <Typography variant='h3' sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>What do you plan to eat?</Typography>
                    <CreateMealForm/>

                    
                </Box>
            </Stack>
        </ContentBox>
    )
}