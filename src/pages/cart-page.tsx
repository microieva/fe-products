import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { useGetProductByIdQuery } from '../redux/api-queries/product-queries';
import Footer from '../components/footer';
import Header from '../components/header';
import { Product } from '../@types/product';
import ProductView from '../components/product-view';
import ProductFormView from '../components/product-form-view';
import { useAppSelector } from '../hooks/useAppSelector';
import CartView from '../components/cart-view';

const CartPage: FC = () => { 
  const cart = useAppSelector(state => state.cart);

    return (
        <>
            <main>
                <Header/>
                {cart && <CartView cart={cart}/>}
            </main>
            <Footer />
        </>
    ) 
}

export default CartPage;