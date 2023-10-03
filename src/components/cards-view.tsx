import { useEffect, useState } from 'react';

import ProductCard from './product-card';
import Pagination from './pagination';
import { Product } from '../@types/product';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';


interface ViewProps {
  filteredData: Product[]
}

const CardsView = ({ filteredData }: ViewProps) => {
	const [ products, setProducts] = useState<Product[]>([]);
    const { data, error } = useGetProductsQuery(undefined);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);

    useEffect(()=>{
        if (filteredData.length !== 0) {
            setProducts(filteredData);
        } else {
            data && setProducts(data)
        }
    }, [filteredData, data]);

	useEffect(()=> {

	});

	const handlePageChange = (newPage: number, newItemsPerPage: number) => {
    	setCurrentPage(newPage);
		setItemsPerPage(newItemsPerPage);
  	};

	const startIndex = (currentPage - 1) * itemsPerPage;
  	const endIndex = startIndex + itemsPerPage;
  	const currentProducts = products.slice(startIndex, endIndex);

	return (
		<>
			<div className="cards-view-wrapper">
				{currentProducts.map(product => {
					return (
						<ProductCard key={product.id} product={product}/>
					);
				})}
			</div>
			<Pagination
				itemsPerPage={[10, 20]}
				totalItems={products.length}
				onPageChange={handlePageChange}
				startIndex={startIndex}
				endIndex={currentProducts.length < itemsPerPage ? currentProducts.length : endIndex}
      		/>
		</>
	);
};

export default CardsView;