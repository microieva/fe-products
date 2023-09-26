import React, { FC } from 'react';
import MuiTable from './mui-table';
import { Product } from '../@types/product';
import { CartItem } from '../@types/cart';

const Table: FC = () => {// will recieve string 'title' | 'categoryId'
  let arr: Product[] = []
  return (
    <div>
      <p>`Table-Header with dropdown to options to sort by price up & down`</p>
    {/* // <ReactTable Component passing string 'title' | 'categoryId'for query && passing page = 'products' | 'cart'/> 
    inside react table component, we use hooks from api-reducers either get products or cart
    */}
      <MuiTable arr={arr}/>
    </div>
  )
}

export default Table;