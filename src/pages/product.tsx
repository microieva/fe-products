import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import { UserContext } from '../contexts/user';
import ProductDetails from '../components/product-details';
import Footer from '../components/footer';
import Header from '../components/header';
import { TypeUserContext } from '../@types/types';
import { Product } from '../@types/product';

const ProductPage: FC = () => {
    const { user } = useContext(UserContext) as TypeUserContext;
    const { productId } = useParams();
    const goBack = useNavigate();
    const { data } = useGetProductByIdQuery(Number(productId));
    const [ product, setProduct ] = useState<Product | undefined>();

    useEffect(()=> {
        setProduct(data);
    }, [data])

    return (
        <>
            {product ? 
                <main>
                    <Header/>
                    <ProductDetails product = {product}/>
                </main>
            :
                goBack('/')
            }
            <Footer />
        </>
    ) 
}

export default ProductPage;