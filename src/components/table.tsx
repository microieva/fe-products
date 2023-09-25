import React, { FC } from 'react';
import MuiTable from './mui-table';

type TableProps = {
  query: string,
  page: string
}

const Table: FC<TableProps> = ({query, page}: TableProps) => {// will recieve string 'title' | 'categoryId'
  return (
    <div>
      <p>`Table-Header with dropdown to ${query} options to sort by price up & down`</p>
    {/* // <ReactTable Component passing string 'title' | 'categoryId'for query && passing page = 'products' | 'cart'/> 
    inside react table component, we use hooks from api-reducers either get products or cart
    */}
      <MuiTable page={page}/>
    </div>
  )
}

export default Table;