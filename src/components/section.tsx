import React, { FC, useState } from 'react'
import Table from './table';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

interface SectionProps {
  isProducts: boolean
}

const Section: FC<SectionProps> = ({isProducts}: SectionProps) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, error } = useGetProductsQuery({});
  const cart = useAppSelector(state => state.cart);
  console.log('data from section: ', data);

  return (
    <section>
      <div>
        component with button for see all {isProducts ? 'products':'cart'} && search bar
      </div>
      <div className='tables-wrapper'>
        <Table/>
      </div>  
    </section>
  )
}

export default Section;