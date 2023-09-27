import React, { useEffect, useState } from 'react';

import ProductCard from './product-card';
import Pagination from './pagination';
import { Product } from '../@types/product';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';


interface ViewProps {
  arr: Product[],
  length: number
}

const CardsView = ({arr, length}: ViewProps) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);
	
	//setProducts(arr);
	
	
	useEffect(()=> {
		setProducts(arr);
		if (products.length>0) {
			setProducts(products);

		}
		console.log('products from useeffect: ', products);	
	}, [products])

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
				totalItems={length}
				itemsPerPageOptions={[10, 20]}
				defaultItemsPerPage={20}
				onPageChange={handlePageChange}
			/>
		</>
	);
};

export default CardsView;