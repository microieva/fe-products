import React, { FC } from 'react';
import MuiTable from './mui-table';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';


const Table: FC = () => {

const { data, error } = useGetProductsQuery({limit: 1000, offset: 0});

return (
        <div>
            <p>`Table-Header with dropdown to options to sort by price up & down and sort by categories up & down?`</p>
        {/* // <ReactTable Component passing string 'title' | 'categoryId'for query && passing page = 'products' | 'cart'/> 
        inside react table component, we use hooks from api-reducers either get products or cart
        */}
            {data && <MuiTable arr={data} length={data.length}/>}
        </div>
    )
}

export default Table;