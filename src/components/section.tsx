import { FC } from 'react';
import TableView from './table-view';
import CardsView from './cards-view';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';


const Section:FC = () => {

    const { data, error } = useGetProductsQuery({limit: 1000, offset: 0});
    const isTable = false;

        return (
            <div>
                <p>`Table-Header with dropdown to options to sort by price up & down and sort by categories up & down?`</p>
                {/* // <ReactTable Component passing string 'title' | 'categoryId'for query && passing page = 'products' | 'cart'/> 
                inside react table component, we use hooks from api-reducers either get products or cart
                */}
                {data && data.length>0 ? 
                    isTable ? <TableView arr={data} length={data.length}/> : <CardsView arr={data} length={data.length}/>
                :
                <h1>error</h1>
                }
            </div>
        )
}

export default Section;