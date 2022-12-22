import { Box, Button, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import EditMealForm from "./EditMealForm"
import MealCard, { StaticMealcard } from "./MealCard"
import {DateObject} from "react-multi-date-picker"


function getRecipe(id, mealItems) {
    let retval = null
    retval = Object.values(mealItems).filter((data)=>{
        return (data.type === 'custom' && data.recipe_id === id) 
    })

    return(retval.length === 1)?retval[0]:null
}
function getStaticRecipe(id, mealItems) {
    let retval = null
    retval = Object.values(mealItems).filter((data)=>{
        return (data.type === 'static' && data.recipe_id === id)
    })
    return (retval.length === 1)?retval[0]:null
}

function getAllRecipes(recipeIdObj, mealItems) {
    const customRecipes = Object.keys(recipeIdObj.recipes).reduce((result, data)=>{
        const newData = getRecipe(parseInt(data), mealItems)
        return [...result, {...newData, qty:recipeIdObj.recipes[data].qty}] 
    }, [])

    const staticRecipes = Object.keys(recipeIdObj.staticRecipes).reduce((result, data)=>{
        const newData = getStaticRecipe(parseInt(data), mealItems)
        return [...result, {...newData, qty:recipeIdObj.staticRecipes[data].qty}]
    },[])
    return {custom:customRecipes, static:staticRecipes}
}

function Header({date, totalCalories}) {
    return (
        <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Box>
                <Typography variant='h4'>{date}</Typography>
            
            </Box>
            <Box>
                <Typography variant='h4'>{totalCalories}</Typography>
            </Box>
        </Box>
    )
}

function MacroSummary({totalCarbs, totalFat, totalProtein}) {
    return (
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            {totalCarbs}
            {totalFat}
            {totalProtein}
        </Box>
    )
}
function RecipeBox({recipes}) {
    return null
}
export default function MealSet(props) {
    const {mealSet, mealItems, dateValue} = props

    const [selectedMeal, setSelectedMeal] = useState({})
    const [recipes, setRecipes] = useState({custom:[], static:[]})
    const [open, setOpen] = useState(false)
    
    function handleClose() {
        setOpen(false)
    }
    
    let called = false
    useEffect(()=>{
        if (!called) {
            setSelectedMeal(mealSet)
            const newRecipes = getAllRecipes(mealSet, mealItems)
            //console.log(newRecipes)
            setRecipes(newRecipes)
        }
        return ()=>{
            called = true
        }
    }, [mealSet, mealItems])

    function handleEditClick() {
        console.log(mealItems)
        setOpen(true)
    }

    return (
        <Box sx={{border:'solid', width:'100%', height:'25%'}}>
            <Header date={dateValue} totalCalories={mealSet.totalCalories} />
            <Box sx={{width:'100%', display:'grid', gridTemplateColumns:'3fr 1fr'}}>
                <Box sx={{width:'100%', border:'solid', height:'100%', overflowX:'scroll', overflowY:'hidden', whiteSpace:'nowrap'}}>
                    {
                        (recipes.custom.length !== 0) && 
                            (recipes.custom.map((item, index)=>{
                                if (item === undefined || item === null) return
                                return (
                                    <MealCard key={index} meal={item}/>
                                )        
                            }))
                    }
                    {
                        (recipes.static.length !== 0) && 
                            (recipes.static.map((item, index)=>{
                                if (item === undefined || item === null) return
                                return (
                                    <StaticMealcard key={index} meal={item}/>
                                )        
                            }))
                    }
                </Box>
                <MacroSummary 
                    totalCarbs={mealSet.totalCarbs} 
                    totalProtein={mealSet.totalProtein} 
                    totalFat={mealSet.totalFat}
                />
            </Box>
            <Button variant='contained' onClick={handleEditClick}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
            >
                <EditMealForm selectedMeal={mealSet} dateValue={new DateObject(dateValue)} mealItems={mealItems}/>
            </Modal>
        </Box>
    )
}