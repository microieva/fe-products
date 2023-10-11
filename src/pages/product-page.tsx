import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import { UserContext } from '../contexts/user';
import Footer from '../components/footer';
import Header from '../components/header';
import { TypeUserContext } from '../@types/types';
import { Product } from '../@types/product';
import ProductView from '../components/product-view';

const ProductPage: FC = () => {
    
    const { productId } = useParams();
    const goBack = useNavigate();
    const { data } = useGetProductByIdQuery(Number(productId));

    return (
        <>
            {data ? 
                <main>
                    <Header/>
                    <ProductView product={data}/>
                </main>
            :
                goBack('/')
            }
            <Footer />
        </>
    ) 
}

export default ProductPage;