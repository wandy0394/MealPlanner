import { Box, Button, Dialog, IconButton, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import EditMealForm from "./EditMealForm"
import MealCard, { StaticMealcard } from "./MealCard"
import {DateObject} from "react-multi-date-picker"
import EditIcon from '@mui/icons-material/Edit'
import MacroCard, {MacroSummary} from "./MacroCard"
import MealInfo from "./MealInfo"


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

function Header({left, right}) {
    return (
        <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 0rem'}}>
            <Box>
                {left}
            
            </Box>
            <Box>
                {right}
            </Box>
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
        <Box sx={{border:'1px solid #CCCCCC', background:'dimgrey', width:'100%', height:'20%', padding:'2rem 2rem'}}>
            <Header 
                left={<Typography variant='h4' sx={{color:'white'}}>{dateValue}</Typography>} 
                right={<IconButton sx={{background:'goldenrod'}} onClick={handleEditClick}>{<EditIcon/>}</IconButton>}
            />
            <Box sx={{width:'100%', display:'grid', gridTemplateColumns:'3fr 1fr', padding:'0', margin:'0', gap:'2rem'}}>
                <Box sx={{padding:'2rem 0rem', display:'flex', alignItems:'center', gap:'2rem', width:'100%', height:'100%', overflowX:'auto', overflowY:'hidden', whiteSpace:'nowrap'}}>
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
                <MealInfo
                    totalCalories={mealSet.totalCalories}
                    totalCarbs={mealSet.totalCarbs}
                    totalFat={mealSet.totalFat}
                    totalProtein={mealSet.totalProtein}
                    targetCalories={mealSet.targetCalories}
                    targetCarbs={mealSet.targetCarbs}
                    targetFat={mealSet.targetFat}
                    targetProtein={mealSet.targetProtein}
                />
            </Box>
            
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{display:'flex', alignItems:'center', justifyContent:'center'}}
            >
                <EditMealForm selectedMeal={mealSet} dateValue={new DateObject(dateValue)} mealItems={mealItems}/>
            </Dialog>
        </Box>
    )
}