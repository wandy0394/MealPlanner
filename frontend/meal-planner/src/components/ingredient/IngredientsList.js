import { Box } from "@mui/system"
import EnhancedTableHead from "./EnhancedTableHead"
import EnhancedTableToolbar from "./EnhancedTableToolbar"
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

const headCells = [
    {
      id: 'name',
      alignment: 'left',
      disablePadding: true,
      label: 'Food (100g serving)',
    },
    {
      id: 'calories',
      alignment: 'right',
      disablePadding: false,
      label: 'Calories (kcal)',
    },
    {
      id: 'carbs',
      alignment: 'right',
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      alignment: 'right',
      disablePadding: false,
      label: 'Protein (g)',
    },
    {
      id: 'fat',
      alignment: 'right',
      disablePadding: false,
      label: 'Fat (g)',
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
export default function IngredientsList() {

    const [ingredients, setIngredients] = useState([])
    const [order, setOrder] = useState(ORDER_TYPE.ASC)
    const [orderBy, setOrderBy] = useState(headCells[0].id)
    const [selected, setSelected] = useState(INITIAL_SELECTED)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(ROW_COUNTS[0])

    function handleRequestSort(e, prop) {
        const isAsc = orderBy === prop && order === ORDER_TYPE.ASC
        setOrder(isAsc ? ORDER_TYPE.DESC : ORDER_TYPE.ASC)
        setOrderBy(prop)
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
            const newSelected = ingredients.reduce((result, item)=>{
                return {...result, [item.id]: item.name}
            }, {})
            setSelected({count:ingredients.length, content:newSelected})
            return
        }
        setSelected(INITIAL_SELECTED)
    }

    function isSelected(id) {
        return (id in selected.content) 
    }

    function handleClick(e, id, name) {
        let newSelected = {...selected.content}
        let newCount = selected.count
        if (id in newSelected) {
            delete newSelected[id]
            newCount -= 1
        }
        else {
            newSelected[id] = name
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
            console.log('Refreshing')
            const result = await DataService.getIngredients()
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        refresh()
        console.log(ingredients)
    }, [])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ingredients.length) : 0;

    return (
        <Box sx={{width:'100%'}}>
            <Paper sx={{width:'100%'}}>
                <EnhancedTableToolbar numSelected={selected.count} />
                <TableContainer>
                    <Table>
                    <EnhancedTableHead
                        headCells = {headCells}
                        numSelected = {selected.count}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount = {ingredients.length}
                    />
                    <TableBody>
                        {ingredients.sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, (page+1) * rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id, row.name)}
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
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                </TableRow>
                            );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                style={{
                                    height: ROW_HEIGHT * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={ROW_COUNTS}
                    component="div"
                    count={ingredients.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </Paper>
        </Box>
    )
}