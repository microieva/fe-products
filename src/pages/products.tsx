import { FC } from 'react'
import { Product } from '../@types/product';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../shared/store';
import { addProduct } from '../redux/products';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

const Products: FC = () => {

  const products: Product[] = useAppSelector(state => state.products);
  const test = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    //category: {},
    images: [""]
  }
  console.log('products: ', products);

  const dispatch = useAppDispatch();

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