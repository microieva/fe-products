import { FC, useEffect } from 'react'
import { Product } from '../@types/product';
import { addProduct, fetchProductsAsync } from '../redux/products';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Products: FC = () => {

    const dispatch = useAppDispatch();
    const products: Product[] = useAppSelector(state => state.products);
    console.log('products: ', products);

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    const test = {
        id: 0,
        title: "",
        price: 0,
        description: "",
        //category: {},
        images: [""]
    }
    const onAddProduct = () => {
        dispatch(addProduct(test));
    }
    return (
        <>
            <div>Products</div>
            <button onClick={onAddProduct}>Add New Product</button>
        </>
    )
}

export default Products;

