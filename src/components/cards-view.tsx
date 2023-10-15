import { useContext, useEffect, useState } from 'react';

import { Link, Outlet } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api-queries/product-queries';
import ProductCard from './product-card';
import Pagination from './pagination';
import { UserContext } from '../contexts/user';
import { Product } from '../@types/product';
import { TypeUserContext } from '../@types/types';
import Loading from './loading';

interface ViewProps {
  filteredData: Product[]
}

const CardsView = ({ filteredData }: ViewProps) => {
	const [ products, setProducts] = useState<Product[]>([]);
  const { data, isLoading } = useGetProductsQuery(undefined);
	const { user } = useContext(UserContext) as TypeUserContext;
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(20);

    useEffect(()=>{
        if (filteredData.length !== 0) {
            setProducts(filteredData);
        } else {
            data && setProducts(data)
        }
    }, [filteredData, data, user]);

	const handlePageChange = (newPage: number, newItemsPerPage: number) => {
    	setCurrentPage(newPage);
		setItemsPerPage(newItemsPerPage);
  	};

	const startIndex = (currentPage - 1) * itemsPerPage;
  	const endIndex = startIndex + itemsPerPage;
  	const currentProducts = products.slice(startIndex, endIndex);

	return (
		<>
			{isLoading ? <Loading /> :
			<div className="cards-container">
			<div className="cards-view-wrapper">
				{currentProducts.map((product: Product, i) => {
					return (
						<Link key={i} style={{textDecoration: "none", color: "black"}} to={`/products/${product.id}`}>
							<ProductCard key={product.id} product={product}/>
						</Link>
					);
				})}
			</div> 
			<div className="pagination-container">
				<Pagination
					itemsPerPage={[10, 20]}
					totalItems={products.length}
					onPageChange={handlePageChange}
					startIndex={startIndex}
					endIndex={currentProducts.length < itemsPerPage ? currentProducts.length : endIndex}
				/>
			</div>
			<Outlet />
		</div>
			}
		</>
	)
};

export default CardsView;