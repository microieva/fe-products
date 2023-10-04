import { FC, useEffect, useState } from 'react';

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { addItem, removeItem } from '../redux/app-reducers/cart';
import { Product } from '../@types/product';
import { useAppSelector } from '../hooks/useAppSelector';
import { CartItem } from '../@types/cart';

interface CartActionsProps {
    product: Product
}

const CartActions: FC<CartActionsProps> = ({product}: CartActionsProps) => {
    const cart = useAppSelector(state => state.cart); 
    const [isInCart, setIsInCart] = useState<boolean>(cart.some((item: CartItem) => item.id == product.id))
    const dispatch = useAppDispatch();

    const addToCart = () => {
        dispatch(addItem(product));
        setIsInCart(true);
    }
    const removeFromCart = () => {
        dispatch(removeItem(product.id))
    }
    useEffect(()=>{
        const inCart = cart.some((item: CartItem) => item.id == product.id);
        if (!inCart) {
            setIsInCart(false)
        }
    }, [isInCart, removeFromCart]);

    return (
        <div className='btn-group' style={{float: "right"}}>
            <IconButton 
                aria-label="add" 
                size="large" 
                onClick={addToCart}
            >
                <AddCircleOutlineIcon/>
            </IconButton>
            <IconButton 
                aria-label="delete" 
                size="large" 
                onClick={removeFromCart} 
                disabled={!isInCart} 
                className={!isInCart ? 'disabled' : ''}
                sx={{ "&:disabled": {cursor: "default"}}} // doesnt work !!!
            >
                <DeleteOutlineIcon />
            </IconButton>
        </div>
  )
}

export default CartActions;