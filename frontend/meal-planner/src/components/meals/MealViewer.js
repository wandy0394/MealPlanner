import {Box} from "@mui/material"
import { useEffect, useState } from "react"
import DataService from "../../service/data-service"

const useGetMeals = () => {
    const [meals, setMeals] = useState({})
    let counter=0
    let called = false
    useEffect(()=> {        
        if (!called) {
            async function fetchData() {
                try {
                    const result = await DataService.getMeals()
                    console.log(result)
                    // setMeals(result)
                }
                catch (e) {

                }
            }
            fetchData();
        }
        return () =>{
            called = true
        }
    })



    return [meals, setMeals]
}

export default function MealViewer() {
    const [meals, setMeals] = useGetMeals()
    
    //api call to get meals belonging to this user

    
    return (
        <Box>
            
            {/* view meals for each day of the week */}
            {/* each meal describes the recipes/ingredients and macros and targert macros */}
            
        </Box>
    )
}