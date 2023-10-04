import { ChangeEvent, useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

import { Product } from '../@types/product';
import { Column } from '../@types/table';
import CartActions from './cart-actions';
import CustomTableHead from './custom-table-head';

interface TableProps {
    data: Product[],
}

const MuiTable = ({ data }: TableProps) => {
    const columns: readonly Column[] = [
        { id: 'title', label: 'Title', minWidth: 170 },
        {
            id: 'price',
            label: 'Price',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'category',
            label: 'Category',
            minWidth: 170,
            align: 'right',
            render: (row: Product) => row.category.name,
        },
    ];

    const rows: Product[] = data;

    // const createSortHandler =
    // (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
    //   onRequestSort(event, property);
    // };

    const StickyHeadTable = () => { 
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);
    
        const handleChangePage = (event: unknown, newPage: number) => {
            setPage(newPage);
        };
    
        const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };

        const addToCart = () =>{

        }
        const removeFromCart = () =>{

        }
    
        return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <CustomTableHead sx={{ "&thead": {top: "0", position: "sticky"} }}>
                            <TableRow>
                                {columns.map((column: Column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }} 
                                    >   
                                        {column.label}
                                        {/* <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={createSortHandler(column.id)}
                                        >
                                            {column.label}
                                            {orderBy === column.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                            ) : null
                                        }
                                        </TableSortLabel> */}
                                    </TableCell>
                                ))}
                                 <TableCell colSpan={1} style={{ minWidth: 50 }}></TableCell>
                            </TableRow>
                        </CustomTableHead>
                        <TableBody sx={{ "& tbody": {height: "50rem"}}}>
                        { rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: Product) => {
                                return (   
                                    <TableRow 
                                        hover 
                                        role="checkbox" 
                                        tabIndex={-1} 
                                        key={row.id} 
                                        onClick={()=> console.log("ROW: ",row)}
                                        sx={{
                                            "& td:hover": {
                                                cursor: "pointer"
                                            }
                                        }}
                                    >    
                                    {columns.map((column: Column) => {
                                        const value = column.render ? column.render(row) : row[column.id].toString();
                                       
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                                {/* <Link style={{textDecoration: "none", color: "black"}} to={`/brewery/${row.id}`}>
                                                    {value}
                                                </Link> */}
                                            </TableCell>    
                                            );
                                        })}
                                        <TableCell>
                                            <CartActions product={row}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            {/* <Outlet /> */}
            </Paper>
        );
    }

    return rows.length> 0 
        ? <StickyHeadTable /> 
        : 
        // <Error height="30rem" text="No products found with current search term.." />   
        <h1>NO RESULTS</h1>
}

export default MuiTable;