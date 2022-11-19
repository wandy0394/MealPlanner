import { Box, Card, Paper } from "@mui/material";
import { useState } from "react";

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
    const [searchHistory, setSearchHistory] = useState(dummyData)

    function getSearchHistory(userEmail) {
        setSearchHistory(dummyData)
    }
    
    return (
        <Box sx={{display:'flex', flexDirection: 'column', width:'100%'}}>
            {
                (searchHistory !== null) && (
                    searchHistory.map((item) => {
                        return (
                            <Paper key={item.id}>
                                {item.searchText}
                            </Paper>
                        )
                    })
                )
            }

        </Box>
    )
}