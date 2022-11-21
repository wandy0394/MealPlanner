import { Box, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

const columnHeaders = ['Timestamp', 'Query', 'Search Type']

export default function SearchHistory() {
    const [searchHistory, setSearchHistory] = useState([])
    let tableRows = []
    useEffect(()=> {
        (async()=>{
            const output = await DataService.getSearchHistory()
            const formattedOutput = output.map((item) => {
                return {ID: item.id, Timestamp:item.searchTime, Query:item.searchText, 'Search Type': item.searchType}
            })
            
            setSearchHistory(formattedOutput)
        })();
    },[])
    return (

        <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {
                        columnHeaders.map((item)=> {
                            return <TableCell>{item}</TableCell>
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    searchHistory.map((row) => {
                        return <TableRow key={row.ID}>
                                    {
                                        columnHeaders.map((header) => {
                                            return <TableCell>{row[header]}</TableCell>
                                        })
                                    }
                                </TableRow>
                    })

                }
            </TableBody>
        </Table>
    </TableContainer>
    )
}