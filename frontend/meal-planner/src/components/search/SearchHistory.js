
import { Box } from "@mui/system";
import { useEffect, useState } from "react"
import SideMenuHeader from "../menu/SideMenuHeader";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import SearchService from "../../service/search-service";
import StatusSnackbar, { INITIAL_STATUS, SEVERITY } from "../utility/StatusSnackbar";

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
    const [statusMessageState, setStatusMessageState] = useState(INITIAL_STATUS)

    async function refresh() {
        try {
            const output = await SearchService.getSearchHistory(type)
            const formattedOutput = output.map((item) => {
                let timeStamp = `${item.searchTime.split('T')[0]} ${item.searchTime.split('T')[1].split('.')[0]}`
                return { id: item.id, 
                        timeStamp:timeStamp, 
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
    let called = false
    useEffect(()=> {
        if (!called) {
            refresh()
        }
        return ()=>{
            called = true
        }
    },[])

    async function handleDelete(e, id) {
        await SearchService.removeSearchQuery(id)
        refresh()
        setStatusMessageState({message:'Query deleted.', severity:SEVERITY.SUCCESS, isMessageVisible:true})
    }

    return (

        <Box sx ={{padding:'0 1rem'}}>
            <SideMenuHeader>
                <Typography variant='h4'>Past Queries</Typography>
            </SideMenuHeader>
                <Stack gap={3}>
                    {
                        searchHistory.map((item, index)=> {
                            return (
                                <Paper key={index} elevation={2} sx={{padding:'1rem 1rem'}}>
                                    <Box sx={{display:'flex', justifyContent: 'space-between'}}>
                                        <Box sx={{display:'flex', flexDirection:'column'}}>
                                            <Typography variant='body1'>{item.query}</Typography> 
                                            <Typography variant='subtitle1'>{item.timeStamp}</Typography>
                                        </Box>
                                        <Box>
                                            <IconButton onClick={e=>handleDelete(e, item.id)}><DeleteIcon/></IconButton>
                                        </Box>
                                    </Box>
                                </Paper>
                            )
                        })
                    }
                </Stack>
                <StatusSnackbar 
                    statusMessageState={statusMessageState}
                    setStatusMessageState={setStatusMessageState}
                />
        </Box>
    )
}