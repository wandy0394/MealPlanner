
import { Box } from "@mui/system";
import { useEffect, useState } from "react"
import DataService from "../../service/data-service";
import EnhancedTable from "../utility/EnhancedTable";
import SideMenuHeader from "../menu/SideMenuHeader";
import { IconButton, Paper, Stack, Table, TableContainer, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'

const headCells = [
    {
      id: 'timeStamp',
      alignment: 'left',
      disablePadding: true,
      label: 'Time Stamp',
      allowSort: true
    },
    {
      id: 'query',
      alignment: 'right',
      disablePadding: false,
      label: 'Query',
      allowSort: true

    },
    {
      id: 'type',
      alignment: 'right',
      disablePadding: false,
      label: 'Search Type',
      allowSort: true

    },
    {
      id: 'options',
      alignment: 'right',
      disablePadding: false,
      label: 'Options',
      allowSort: false

    },
];


export default function SearchHistory({type='all'}) {

    const [searchHistory, setSearchHistory] = useState([])

    async function refresh() {
        try {
            const output = await DataService.getSearchHistory(type)
            const formattedOutput = output.map((item) => {
                return { id: item.id, 
                        timeStamp:item.searchTime, 
                        query:item.searchText, 
                        type: item.searchType
                }
            })
            setSearchHistory(formattedOutput)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        refresh()
    },[])

    async function handleDelete(e, id) {
        console.log(id)
        await DataService.removeSearchQuery(id)
        refresh()
    }

    return (
        // <EnhancedTable
        //     headCells={headCells}
        //     rows={searchHistory}
        //     title="Past Queries"
        //     requestDelete={handleDelete}
        // />
        <Box sx ={{padding:'0 1rem'}}>
            <SideMenuHeader>
                <Typography variant='h4'>Past Queries</Typography>
            </SideMenuHeader>
            
                <TableContainer sx={{padding:'2rem 0'}}>
                    <Table>
                        <Stack gap={1}>
                        {
                            searchHistory.map((item, index)=> {
                                return (
                                        <TableRow key={index}>
                                            <Paper elevation={2} sx={{padding:'1rem 1rem'}}>
                                                <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                                                    <Box sx={{display:'flex', flexDirection:'column'}}>
                                                        <Typography variant='body'>{item.query}</Typography> 
                                                        <Typography variant='subtitle2'>{item.timeStamp}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <IconButton onClick={e=>handleDelete(e, item.id)}><DeleteIcon/></IconButton>
                                                    </Box>

                                                </Box>
                                                
                                            </Paper>

                                        </TableRow>
                                )
                            })
                            
                        }
                        </Stack>
                    </Table>
                </TableContainer>

            
        </Box>
    )
}