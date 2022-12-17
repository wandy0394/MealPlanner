import AddBox from "@mui/icons-material/AddBox";
import { Paper, Stack, Box, Typography, Modal, Button } from "@mui/material";
import { useState } from "react";
import CreateMealForm from "../components/meals/CreateMealForm";
import MealViewer from "../components/meals/MealViewer";
import { useGetAllFood, useGetMeals } from "../components/meals/MealLineItem";
import { ContentBox } from "../components/utility/ContentBox";

export default function MealPlans() {
    const [open, setOpen] = useState(false)
    const [mealLineItems, setMealLineItems] = useGetAllFood()
    const [meals, setMeals] = useGetMeals()

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box sx={{flexGrow:'1'}}>
                    <Typography variant='h3' sx={{margin:'1rem auto', textAlign:'left', border:'none'}}>What do you plan to eat?</Typography>
                    <Button onClick={handleClickOpen}>Add</Button>
                    <MealViewer meals={meals} mealLineItems={mealLineItems}/>
                </Box>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
            >
                <CreateMealForm mealLineItems={mealLineItems}/>
            </Modal>
        </ContentBox>
    )
}