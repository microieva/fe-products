import { ChangeEvent, useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Product } from '../@types/product';
import { Column } from '../@types/table';
import CartActions from './cart-actions';

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
        }
    ];

    const rows: Product[] = data;

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
                        <TableHead sx={{ "&thead": {top: "0", position: "sticky"} }}>
                            <TableRow 
                                sx={{
                                   "&.MuiTableRow-root": { // doesnt work
                                       fontSize: "16px",
                                       backgroundColor: " rgba(0, 0, 0, 0.04)",
                                       borderBottom: "1px solid black",
                                    
                                    }
                                }}
                            >
                                {columns.map((column: Column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }} 
                                    
                                >
                                    {column.label}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
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