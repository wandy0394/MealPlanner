
import { useEffect, useState } from "react"
import DataService from "../../service/data-service";
import EnhancedTable from "../utility/EnhancedTable";

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


export default function SearchHistory() {

    const [searchHistory, setSearchHistory] = useState([])

    async function refresh() {
        try {
            const output = await DataService.getSearchHistory()
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

    async function handleDelete(id) {
        await DataService.removeSearchQuery(id)
        refresh()
    }

    return (
        <EnhancedTable
            headCells={headCells}
            rows={searchHistory}
            title="Past Queries"
            requestDelete={handleDelete}
        />
    )
}