import { FC, useEffect, useState } from 'react'
import { Product } from '../@types/product';
import { addProduct, fetchProductsAsync, sortByPrice } from '../redux/app-reducers/products';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
//import { useDeleteProductMutation, useFetchAllProductsQuery } from '../redux/api-queries/product-queries';
import { addItem, removeItem } from '../redux/app-reducers/cart';
import { getFiltered } from '../redux/selectors/getFiltered';


const Products: FC = () => {

    const dispatch = useAppDispatch();
    const products: Product[] = useAppSelector(state => state.products.products);
    const error: string | undefined = useAppSelector(state => state.products.error);
    const loading: boolean = useAppSelector(state => state.products.loading);
    const cart = useAppSelector(state => state.cart);
    const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)
    const filteredProducts = useAppSelector(state => getFiltered(state, searchTerm));
    //const [deleteProduct] =useDeleteProductMutation()

    //const {data, error, isLoading, isError} = useFetchAllProductsQuery({limit: 20, offset: 0}) this replaces extraReducers and initialState
    useEffect(() => {
        dispatch(fetchProductsAsync({offset: 0, limit: 20})); // this way fetching only 20 products per time
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
    const onAddToCart = (item: Product) => {
        dispatch(addItem(item))
    }
    const onDeleteFromCart = (id: number) =>{
        dispatch(removeItem(id));
    }
    const onSortAsc = () => {
        dispatch(sortByPrice('asc'));
    }
    const onSortDesc = () => {
        dispatch(sortByPrice('desc'));
    }
    console.log('PRODUCTS: ', products);
    console.log('CART ', cart);
    return (
        <>
            <div>Products</div>
            <button onClick={onAddProduct}>Add New Product</button>
            <button onClick={onSortAsc}>Sort By Price Asc</button>
            <button onClick={onSortDesc}>Sort By Price Desc</button>
            <input type='text' placeholder='Search By Title' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            { filteredProducts.map((p, i)=> {
                return (
                    <div style={{border: '2px orange solid'}}>
                        <div key={i}>
                            <p>{p.title}</p>
                            <p>{p.price} $</p>
                            <p>{p.description}</p>
                        </div>
                        <button onClick={()=>onAddToCart(p)}>Add To Cart</button>
                        <button onClick={()=>onDeleteFromCart(p.id)}>Delete From Cart</button>
                    </div>
                )
            })}
           <p>Number of Items In Cart: {cart.length}</p>
           <div style={{border: '2px green solid'}}>THIS IS CART
                <ul>
                    {cart && cart.map((c, i) => {
                        return (<li key={i}>{c.title} - {c.quantity}</li>)
                    })}
                </ul>    
           </div>
        </>
    )
}

export default Products;

