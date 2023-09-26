import React from 'react';
import { Product } from '../@types/product';

interface TableProps {
    arr: Product[]
}

const MuiTable = ({arr}: TableProps) => {
    console.log('arr for table: ', arr);
  return (
    <div>TABLE</div>
  )
}

export default MuiTable;