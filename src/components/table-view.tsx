import { FC, useEffect, useState } from 'react';
import MuiTable from './mui-table';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';
import { Product } from '../@types/product';

interface TableProps {
    filteredData: Product[]
}
const Table: FC<TableProps> = ({ filteredData }: TableProps) => {
    const [ products, setProducts] = useState<Product[]>([])
    const { data, error } = useGetProductsQuery(undefined);

    useEffect(()=>{
        if (filteredData.length !== 0) {
            setProducts(filteredData);
        } else {
            data && setProducts(data)
        }
    }, [filteredData, data])

    return (
            <div className='table-view'>
                <p>`Table-Header with dropdown to options to sort by price up & down and sort by categories up & down?`</p>
            {/* // <ReactTable Component passing string 'title' | 'categoryId'for query && passing page = 'products' | 'cart'/> 
            inside react table component, we use hooks from api-reducers either get products or cart
            */}
                <MuiTable data={products} />
            </div>
        )
}

export default Table;