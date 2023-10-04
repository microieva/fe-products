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
                <MuiTable data={products} />
            </div>
        )
}

export default Table;