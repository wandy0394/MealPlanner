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
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const ORDER_TYPE = {
    ASC:'asc',
    DESC:'desc'
}
const ROW_COUNTS = [5, 10, 20]
const INITIAL_SELECTED = {
    count:0,
    content:{}
}
const ROW_HEIGHT = 50
export default function EnhancedTable(props) {
    const {rows, headCells, title, requestDelete} = props
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
            const newSelected = rows.reduce((result, item)=>{
                return {...result, [item.id]: item.timestamp}
            }, {})
            setSelected({count:rows.length, content:newSelected})
            return
        }
        setSelected(INITIAL_SELECTED)
    }

    function isSelected(id) {
        return (id in selected.content) 
    }

    function handleDelete() {
        Object.keys(selected.content).forEach(element => {
            requestDelete(element)
        }) 
    }

    function handleClick(e, id) {
        let newSelected = {...selected.content}
        let newCount = selected.count
        if (id in newSelected) {
            delete newSelected[id]
            newCount -= 1
        }
        else {
            newSelected[id] = 1
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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width:'100%'}}>
            <Paper sx={{width:'100%'}}>
                <EnhancedTableToolbar 
                    numSelected={selected.count} 
                    title={title}
                    createDeleteHandler={handleDelete}
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
                        rowCount = {rows.length}
                    />
                    <TableBody>
                        {rows.sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, (page+1) * rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
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
                                    {
                                        headCells.map((item)=> {
                                            const id = item.id
                                            return (
                                                <TableCell
                                                    align={item.alignment}
                                                >
                                                    {row[item.id]}
                                                    
                                                    
                                                </TableCell>
                                            )
                                        })
                                    }
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </Paper>
        </Box>
    )
}