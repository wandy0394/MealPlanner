import {Box, Card, CardContent, Stack, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import DataService from "../../service/data-service"
import DatePicker from "react-multi-date-picker"
import MacroCounter from "./MacroCounter"

function MealCard(props) {
    const {meal, ...other} = props
    function handleClick() {
        console.log('clicked')
        //console.log()
        //dispatch({type:ACTION_TYPES.ADD_MEAL, payload:{id:id, name:name, recipe_id:selectOptions.recipe_id, type:selectOptions.type}})
    }
    
    return (
        <Card key={meal.id} onClick={handleClick} sx={{margin:'1rem', display:'inline-block', border:'solid', aspectRatio:'1/1', height:'15vh', color:'black'}}>
            <CardContent sx={{border:'solid'}}>
                <Typography variant='h6'>{meal.name}</Typography>
                <Typography variant='h6'>{meal.recipe_id}</Typography>
            </CardContent> 
        </Card>
    )
}

export default function MealViewer(props) {
    const {meals, mealLineItems} = props
    const [dateValue, setDateValue] = useState(new Date())
    const [selectedMeal, setSelectedMeal] = useState({})
    const [recipes, setRecipes] = useState([])
    
    // const [meals, setMeals] = useGetMeals()
    
    //api call to get meals belonging to this user
    useEffect(()=>{
        let called = false
        if (!called) {
            const today = new Date()
            const dateNow = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
            if (dateNow in meals) {
                setSelectedMeal(meals[dateNow])
                getAllRecipes(meals[dateNow])
            }
        }
        return ()=>{
            called = true
        }
    }, [meals, mealLineItems])

    function getRecipe(id) {
        let retval = null
        Object.values(mealLineItems).forEach((data)=>{
            if (data.type === 'custom' && data.recipe_id === id) {
                retval = data
            }
        })
        return retval
    }
    function getStaticRecipe(id) {
        let retval = null
        Object.values(mealLineItems).forEach((data)=>{
            if (data.type === 'static' && data.recipe_id === id) {
                retval = data
            }
        })
        return retval
    }

    function getAllRecipes(recipeIdObj) {
        //console.log(recipeIdObj)
        const customRecipes = Object.values(recipeIdObj.recipes).reduce((result, data)=>{
            const newData = getRecipe(data)
            return [...result, newData] 
        }, [])

        const staticRecipes = Object.values(recipeIdObj.staticRecipes).reduce((result, data)=>{
            const newData = getStaticRecipe(data)
            return [...result, newData]
        },[])
        const newRecipes = [...customRecipes, ...staticRecipes]
        console.log(newRecipes)
        setRecipes(newRecipes) 
    }

    function handleDateChange(e) {
        setDateValue(e)
        const dateNow = e.format('YYYY-MM-DD')
        // console.log(dateNow.toString() in meals)

        console.log(meals[dateNow])
        if (dateNow in meals) {
            setSelectedMeal(meals[dateNow])
            getAllRecipes(meals[dateNow])
        }
        else {
            setSelectedMeal({})
        }
    }
    
    return (
        <Box sx={{width:'100%', height:'100%', border:'solid'}}>
            <Stack sx={{width:'100%'}}>
                <DatePicker 
                    style={{margin:'0', padding:'0', width:'100%', fontSize:'28px', height:'5vh', textAlign:'center', border:'none'}} 
                    onChange={handleDateChange}
                    value={dateValue}
                    format='DD MMM YY'
                />
                <Box sx={{display:'flex', gap:'1rem'}}>
                    <MacroCounter 
                        //dispatch={dispatch} 
                        //macroTarget={meals.targetCalories} 
                        macroValue={selectedMeal.totalCalories} 
                        labelText='Calories' 
                        //handleChange={e=>dispatch({type:ACTION_TYPES.SET_CALORIES, payload:e.target.value})}
                    />
                    <MacroCounter 
                        //dispatch={dispatch} 
                        //macroTarget={meals.targetCalories} 
                        macroValue={selectedMeal.totalCarbs} 
                        labelText='Carbs' 
                        //handleChange={e=>dispatch({type:ACTION_TYPES.SET_CALORIES, payload:e.target.value})}
                    />
                    <MacroCounter 
                        //dispatch={dispatch} 
                        //macroTarget={meals.targetCalories} 
                        macroValue={selectedMeal.totalFat} 
                        labelText='Fat' 
                        //handleChange={e=>dispatch({type:ACTION_TYPES.SET_CALORIES, payload:e.target.value})}
                    />
                    <MacroCounter 
                        //dispatch={dispatch} 
                        //macroTarget={meals.targetCalories} 
                        macroValue={selectedMeal.totalProtein} 
                        labelText='Protein' 
                        //handleChange={e=>dispatch({type:ACTION_TYPES.SET_CALORIES, payload:e.target.value})}
                    />
                    
                </Box>
                <Box sx={{width:'100%', display:'flex', gap:'1rem'}}>
                    {
                        (recipes.length !== 0) && 
                            (recipes.map((item, index)=>{
                                if (item === null) return
                                return (
                                    <Box key={index}>
                                        {item.name}
                                        {item.recipe_id}
                                    </Box>
                                )        
                            }))
                    }
                </Box>
            </Stack>
            {/* view meals for each day of the week */}
            {/* each meal describes the recipes/ingredients and macros and targert macros */}
            
        </Box>
    )
}