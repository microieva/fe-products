import { FC, useEffect, useState } from 'react';
import MuiProductsTable from './mui-products-table';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';
import { Product } from '../@types/product';

interface TableProps {
    filteredData: Product[]
}
const Table: FC<TableProps> = ({ filteredData }: TableProps) => {
    const { data } = useGetProductsQuery(undefined);
    const [ products, setProducts] = useState<Product[]>([])

    useEffect(()=>{
        if (filteredData.length !== 0) {
            setProducts(filteredData);
        } else {
            data && setProducts(data)
        }
    }, [filteredData, data])

    return (
            <div className='table-view'>
                {products && <MuiProductsTable data={products} />}
            </div>
        )
}

export default Table;