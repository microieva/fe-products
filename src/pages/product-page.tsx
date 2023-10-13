import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import Footer from '../components/footer';
import Header from '../components/header';
import { Product } from '../@types/product';
import ProductView from '../components/product-view';
import ProductFormView from '../components/product-form-view';

const ProductPage: FC = () => { 
    const { productId } = useParams();
    const { data } = useGetProductByIdQuery(Number(productId));
    const [ product, setProduct ] = useState<Product | undefined>();

    useEffect(()=> {
        data && setProduct(data);
    }, [data])

    return (
        <>
            <main>
                <Header/>
                {data ? <ProductView product={data}/> : <ProductFormView />}
            </main>
            <Footer />
        </>
    ) 
}

export default ProductPage;