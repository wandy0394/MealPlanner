import { Box, Dialog,  SpeedDial, SpeedDialAction, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import EditMealForm from "./EditMealForm"
import MealCard from "./MealCard"
import {DateObject} from "react-multi-date-picker"
import EditIcon from '@mui/icons-material/Edit'
import MealInfo from "./MealInfo"
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MealService from "../../service/meal-service"
import {strawTheme} from "../utility/StrawTheme"
import { SEVERITY } from "../utility/StatusSnackbar"

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
        <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0rem 0rem'}}>
            <Box>
                {left}
            
            </Box>
            <Box sx={{}}>
                {right}
            </Box>
        </Box>
    )
}

function OptionDial(props) {
    const {handleEditClick, handleDeleteClick, editable, deletable} = props
    return (
        <SpeedDial
            ariaLabel='Speed Dial More Icon'
            FabProps={{size:'small'}}
            icon={<MoreVertIcon/>}
            direction='left'
        >
            <SpeedDialAction
                sx={{visibility:editable ? 'visible':'hidden'}}
                key='Edit'
                icon={<EditIcon/>}
                onClick={handleEditClick}
            />
            <SpeedDialAction
                sx={{visibility:deletable ? 'visible':'hidden'}}
                key='Delete'
                icon={<DeleteIcon/>}
                onClick={handleDeleteClick}
            />
        </SpeedDial>
    )
}

export default function MealSet(props) {
    const {mealSet, mealItems, dateValue, removeMeal, addMeal, setStatusMessageState} = props

    const [recipes, setRecipes] = useState({custom:[], static:[]})
    const [open, setOpen] = useState(false)
    
    function handleClose() {
        setOpen(false)
    }
    
    let called = false
    useEffect(()=>{
        if (!called && Object.keys(mealSet).length > 0 && Object.keys(mealItems).length > 0) {
            const newRecipes = getAllRecipes(mealSet, mealItems)
            setRecipes(newRecipes)
        }
        return ()=>{
            called = true
        }
    }, [mealSet, mealItems])

    function handleEditClick() {
        setOpen(true)
    }

    function handleDeleteClick() {
        if (mealSet.meal_id === null) {
            return
        }
        MealService.removeMeal(mealSet.meal_id)
        removeMeal(dateValue)
        setStatusMessageState({message:'Meals removed.', severity:SEVERITY.SUCCESS, isMessageVisible:true})
    }
    return (
        <Box sx={{
                border:`2px solid ${strawTheme.palette.common.grey}`, 
                background:strawTheme.palette.common.white, 
                width:'100%', 
                height:'100%', 
                padding:'1rem 2rem',
                display:'flex',
                flexDirection:'column'
            }}
        >
            <Header 
                left={<Typography variant='h4' sx={{color:strawTheme.palette.common.black}}>{dateValue}</Typography>} 
                right={<OptionDial handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} editable={(addMeal !== null)} deletable={(removeMeal!==null)}/>}
            />
            <Box sx={{
                    width:'100%', 
                    height:'100%', 
                    display:'grid', 
                    gridTemplateColumns:'3fr 1fr', 
                    padding:'0', 
                    margin:'0', 
                    gap:'2rem',
                }}
            >

                <Box sx={{
                        display:'grid', 
                        gridAutoFlow:'column',
                        gridAutoRows:'1fr',
                        padding:'2rem 0rem', 
                        alignItems:'center', 
                        gap:'2rem', 
                        width:'100%', 
                        height:'100%', 
                        overflowX:'auto', 
                        overflowY:'hidden', 
                        //scrollbarWidth:'thin',
                    }}
                >
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
                                    <MealCard key={index} meal={item} image={item.image}/>
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
                fullWidth={true}
                maxWidth='false'
                // PaperProps={{sx:{width:'100%', height:'100%'}}}
                PaperProps={{sx:{display:'flex', alignItems:'center', justifyContent:'center', width:'35vw', border:'solid', margin:'0 auto'}}}
            >
                <EditMealForm 
                    selectedMeal={mealSet} 
                    dateValue={new DateObject(dateValue)} 
                    mealItems={mealItems} 
                    handleClose={handleClose}
                    setStatusMessageState={setStatusMessageState}
                    addMeal={addMeal}
                />
            </Dialog>
        </Box>
    )
}