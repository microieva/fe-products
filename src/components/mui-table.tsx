import { ChangeEvent, FC, useState } from 'react';
//import { Link, Outlet } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';
import { FontStyle } from '@mui/material/styles/createTypography';
import { Product } from '../@types/product';
import { CartItem } from '../@types/cart';


//import Error from './error';

interface MuiTableProps {
  page: string
}
interface ColumnOfProducts {
  bold?: FontStyle | undefined
  id: 'title' | 'price' | 'category',
  label: string,
  minWidth?: number,
  align?: 'right',
}

interface ColumnOfCartItem {
  bold?: FontStyle | undefined
  id: 'title' | 'price' | 'category' | 'quantity',
  label: string,
  minWidth?: number,
  align?: 'right',
}

const MuiTable: FC<MuiTableProps> = ({page}: MuiTableProps) => {
  const [products, setProducts] = useState<boolean>(true);
  if (page !== 'products') {
    setProducts(false);
  }

    const columns: readonly ColumnOfProducts[] | ColumnOfCartItem[] = [
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
        },
        {
          id: 'quantity',
          label: 'Quantity',
          minWidth: 170,
          align: 'right',
      },
        /*{
            id: 'ICONS',
            label: 'ICONs',
            minWidth: 170,
            align: 'right',
        },*/
    ];

    const dispatch = useAppDispatch(); // needed for cart
    const cart = useAppSelector(state => state.cart);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [rows, setRows] = useState<Product[] | CartItem[] | null>(null)
    const { data, error } = useGetProductsQuery({title: searchTerm, limit: 20, offset: 0});

    data && products ? setRows(data) : setRows(cart);
    

    //page === 'products' ? rows = data : rows = cart;


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
    
        return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{ "&thead": {top: "0", position: "sticky"} }}>
                            <TableRow sx={{
                                "& th": {
                                    fontSize: "16px",
                                    backgroundColor: " rgba(0, 0, 0, 0.04)",
                                    borderBottom: "1px solid black",
                                    
                                    }
                                }}
                            >
                                {columns.map((column: ColumnOfProducts | ColumnOfCartItem) => (
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
                        { rows && rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: Product | CartItem) => {
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
                                    {columns.map((column: ColumnOfProducts | ColumnOfCartItem) => {
                                        const value: string = (row[column.id]).toString();
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                              {value}
                                                {/* <Link style={{textDecoration: "none", color: "black"}} to={`/brewery/${row.id}`}>
                                                    {value}
                                                </Link> */}
                                            </TableCell>    
                                            );
                                        })}
                                    
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={20}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            {/* <Outlet /> */}
            </Paper>
        );
    }

    return page === 'products' ? 
      <StickyHeadTable/> 
      : 
      // <Error height="30rem" text="No breweries found with current search term.." />   
      <h1>NO RESULT</h1>
}

export default MuiTable;

