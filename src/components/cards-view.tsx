import { useEffect, useState } from 'react';

import ProductCard from './product-card';
import Pagination from './pagination';
import { Product } from '../@types/product';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';


interface ViewProps {
  filteredData: Product[],
}

const CardsView = ({ filteredData }: ViewProps) => {

	const [ products, setProducts] = useState<Product[]>([])
    const { data, error } = useGetProductsQuery(undefined);

    useEffect(()=>{
        if (filteredData.length !== 0) {
            setProducts(filteredData);
        } else {
            data && setProducts(data)
        }
    }, [filteredData, data])

	const [currentPage, setCurrentPage] = useState<number>(0);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);
	

	const handlePageChange = (newPage: number, newItemsPerPage: number) => {
		
		const startIndex = currentPage * itemsPerPage;
		const endIndex = startIndex + itemsPerPage; // newPage or currentPage ?
		console.log('products: ', products)
		if (products.length > endIndex) {
			const splicedProducts: Product[] = products.slice(endIndex);
			console.log('sliced? ', splicedProducts);
			setProducts(splicedProducts);
		} else {
			const splicedProducts: Product[] = products.slice(startIndex);
			console.log('sliced? ', splicedProducts);
			setProducts(splicedProducts);
		}
		setCurrentPage(newPage);
		setItemsPerPage(newItemsPerPage);

	};

	return (
		<>
			<div className="cards-view-wrapper">
				{products.map(product => {
					return (
						<ProductCard key={product.id} product = {product}/>
					);
				})}
			</div>
			<Pagination
				totalItems={products.length}
				itemsPerPageOptions={[10, 20]}
				defaultItemsPerPage={20}
				onPageChange={()=>handlePageChange}
			/>
		</>
	);
};

export default CardsView;