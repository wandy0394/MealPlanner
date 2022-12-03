import { Box } from "@mui/system"
import EnhancedTableHead from "../utility/EnhancedTableHead"
import EnhancedTableToolbar from "../utility/EnhancedTableToolbar"
import { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DataService from "../../service/data-service";
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const COLUMN_HEADERS = {
    TIME_STAMP:'TIME_STAMP',
    QUERY: 'QUERY',
    SEARCH_TYPE:'SEARCH_TYPE',
    OPTIONS:'OPTIONS'
}

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
      alignment: 'center',
      disablePadding: false,
      label: 'Query',
      allowSort: true

    },
    {
      id: 'type',
      alignment: 'center',
      disablePadding: false,
      label: 'Search Type',
      allowSort: true

    },
    {
      id: 'options',
      alignment: 'left',
      disablePadding: false,
      label: 'Options',
      allowSort: false

    },
];

const ORDER_TYPE = {
    ASC:'asc',
    DESC:'desc'
}
const ROW_COUNTS = [5, 10, 20, 50]
const INITIAL_SELECTED = {
    count:0,
    content:{}
}
const ROW_HEIGHT = 50
export default function SearchHistory() {

    const [searchHistory, setSearchHistory] = useState([])
    const [order, setOrder] = useState(ORDER_TYPE.ASC)
    const [orderBy, setOrderBy] = useState(headCells[0].id)
    const [selected, setSelected] = useState(INITIAL_SELECTED)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(ROW_COUNTS[0])

    function handleRequestSort(e, prop) {
        if (!prop?.allowSort) return
        const isAsc = orderBy === prop.id && order === ORDER_TYPE.ASC
        setOrder(isAsc ? ORDER_TYPE.DESC : ORDER_TYPE.ASC)
        setOrderBy(prop.id)
    }
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
      }
      
    function getComparator(order, orderBy) {
        return order === ORDER_TYPE.DESC
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
      
    function handleSelectAllClick(e) {
        if (e.target.checked) {
            const newSelected = searchHistory.reduce((result, item)=>{
                return {...result, [item.id]: item.timestamp}
            }, {})
            setSelected({count:searchHistory.length, content:newSelected})
            return
        }
        setSelected(INITIAL_SELECTED)
    }

    function isSelected(id) {
        return (id in selected.content) 
    }

    function handleClick(e, id, timestamp) {
        let newSelected = {...selected.content}
        let newCount = selected.count
        if (id in newSelected) {
            delete newSelected[id]
            newCount -= 1
        }
        else {
            newSelected[id] = timestamp
            newCount += 1
        }
        setSelected({count:newCount, content:newSelected})
    }
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchHistory.length) : 0;

    return (
        <Box sx={{width:'100%'}}>
            <Paper sx={{width:'100%'}}>
                <EnhancedTableToolbar 
                    numSelected={selected.count} 
                    title="Past Queries"
                />
                <TableContainer>
                    <Table>
                    <EnhancedTableHead
                        headCells = {headCells}
                        numSelected = {selected.count}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount = {searchHistory.length}
                    />
                    <TableBody>
                        {searchHistory.sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, (page+1) * rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id, row.timestamp)}
                                role="checkbox"
                                key={row.id}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.timeStamp}
                                </TableCell>
                                <TableCell align="center">{row.query}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{null}</TableCell>
                                {/* <TableCell align="center">{row.type}</TableCell> */}
                                {/* <TableCell align="right">{row.fat}</TableCell> */}
                                </TableRow>
                            );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                style={{
                                    height: ROW_HEIGHT * emptyRows,
                                }}
                            >
                                <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={ROW_COUNTS}
                    component="div"
                    count={searchHistory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </Paper>
        </Box>
    )
}