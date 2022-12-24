import AddBox from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import { Paper, Stack, Box, Typography, Modal, Button, IconButton, Dialog } from "@mui/material";
import { useState } from "react";
import CreateMealForm from "../components/meals/CreateMealForm";
import MealList from "../components/meals/MealList";
import { useGetAllFood, useGetMeals } from "../components/meals/utility/MealItemUtil";
import MainPane from "../layouts/MainPane";

export default function MealPlans() {
    const [open, setOpen] = useState(false)
    const [mealItems, setMealItems] = useGetAllFood()
    const [mealSets, setMealSets] = useGetMeals()

    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function removeMeal(key) {
        const newMealSets = {...mealSets}
        delete newMealSets[key]
        console.log('removed')
        console.log(newMealSets)
        setMealSets(newMealSets)
    }
    return (
        <MainPane
            title='What do you plan to eat?'
            buttons={
                <>
                    <IconButton onClick={handleClickOpen}><AddIcon/></IconButton>
                </>
            }
            mainContent={
                <>
                    <MealList mealSets={mealSets} mealItems={mealItems} removeMeal={removeMeal}/>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
                    >
                        <CreateMealForm mealItems={mealItems}/>
                    </Dialog>
                </>
            }
        >
        </MainPane>
    )
}