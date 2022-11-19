import { Box, Card, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import DataService from "../service/data-service";

const userEmail = 'dev@email.com'
const dummyData = [
    {id:'1', searchText:'apple'},
    {id:'2', searchText:'apple'},
    {id:'3', searchText:'apple'},
    {id:'4', searchText:'apple'},
    {id:'5', searchText:'apple'},
    {id:'6', searchText:'apple'}
]

export default function SearchHistory() {
    const [searchHistory, setSearchHistory] = useState([])

    useEffect(()=> {
        (async()=>{
            const output = await DataService.getSearchHistory()
            setSearchHistory(output)
        })();
    },[])

    console.log(searchHistory)
    
    return (
        <Box sx={{display:'flex', flexDirection: 'column', width:'100%'}}>
            {
                (searchHistory !== null) && (
                    searchHistory.map((item) => {
                        return (
                            <Paper key={item.id}>
                                {item.id}{item.searchText}{item.searchType}
                            </Paper>
                        )
                    })
                )
            }

        </Box>
    )
}