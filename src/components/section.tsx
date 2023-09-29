import React, { FC, useState } from 'react'
import Table from './table';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';


const Section: FC = () => {
  //this component should return options to: searchbar, reset all products, switch view from cards to table

  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, error } = useGetProductsQuery(undefined);
  const cart = useAppSelector(state => state.cart);
  console.log('Section hook data: ', data);

  return (
    <section>
      <div>
        search bar ..etc; View switch to table click sets boolean for table is true
      </div>
      <div className='tables-wrapper'>
        <Table/>
      </div>  
    </section>
  )
}

export default Section;