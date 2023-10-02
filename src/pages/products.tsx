import { FC, useState } from 'react'
import { Product } from '../@types/product';
import { useAppSelector } from '../hooks/useAppSelector';
import { 
    useDeleteProductMutation, 
    useAddProductMutation, 
    useUpdateProductMutation,
    useFilterProductsByTitleQuery, 
} from '../redux/api-queries/product-queries';
import { addItem, removeItem } from '../redux/app-reducers/cart';
import { useAppDispatch } from '../hooks/useAppDispatch';


const Products: FC = () => {

    const dispatch = useAppDispatch(); // needed for cart
    const cart = useAppSelector(state => state.cart);
    const [searchTerm, setSearchTerm] = useState<string>('');
    //const { data, error } = useGetProductsQuery();
    //const {data} = useFilterProductsByTitleQuery(searchTerm);


    const test: Partial<Product> = {
            title: "XXX New Product",
            price: 10,
            description: "A description",
            categoryId: 1,
            category: {
                id: 1,
                name: 'category name',
                image: ''
            },
            images: ["https://placeimg.com/640/480/any"]
    }
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] =useDeleteProductMutation();

    const testID = 203;

    const onAddNewProduct = () => {
        console.log('passing: ', test);
        addProduct(test); //tested works with Test type
    }
    const onDeleteProduct =()=> {
        deleteProduct(testID); //tested works
    }
    
    const onAddToCart = (item: Product) => {
        dispatch(addItem(item))
    }
    const onDeleteFromCart = (id: number) =>{
        dispatch(removeItem(id));
    }
    const onSortAsc = () => {
        //dispatch(sortByPrice('asc'));
    }
    const onSortDesc = () => {
        //dispatch(sortByPrice('desc'));
    }
    const onUpdateProduct = () => { // tested works
        console.log('updating ID: ', testID);
        updateProduct({ id: testID, title: 'updated-title', description: 'LOREM IPSUM LOREM IPSUM'})
    }
    // console.log('PRODUCTS: ', data);
    // console.log('CART ', cart);
    return (
        <>
            <div>Products</div>
            <button onClick={()=>onAddNewProduct()}>Add New Product</button>
            <button onClick={()=>onDeleteProduct()}>DELETE Product id {testID}</button>
            <button onClick={()=>onUpdateProduct()}>UPDATE Product id {testID}</button>
            <button onClick={onSortAsc}>Sort By Price Asc</button>
            <button onClick={onSortDesc}>Sort By Price Desc</button>
            <input type='text' placeholder='Search By Title' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            {/* { data && data.map((p: Product)=> {
                return (
                    <div style={{border: '2px orange solid'}}>
                        <div key={p.id}>
                            <p>{p.title}</p>
                            <p>{p.price} $</p>
                            <p>{p.description}</p>
                        </div>
                        <button onClick={()=>onAddToCart(p)}>Add To Cart</button>
                        <button onClick={()=>onDeleteFromCart(p.id)}>Delete From Cart</button>
                    </div>
                )
            })} */}
           <p>Number of Items In Cart: {cart.length}</p>
           <div style={{border: '2px green solid'}}>THIS IS CART
                <ul>
                    {cart && cart.map((item) => {
                        return (<li key={item.id}>{item.title} - {item.quantity}</li>)
                    })}
                </ul>    
           </div>
        </>
    )
}

export default Products;

