import { FC, useState } from 'react';

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { addItem, removeItem } from '../redux/app-reducers/cart';
import { Product } from '../@types/product';
import { useAppSelector } from '../hooks/useAppSelector';

interface CartActionsProps {
    product: Product
}

const CartActions: FC<CartActionsProps> = ({product}: CartActionsProps) => {
    const cart = useAppSelector(state => state.cart); // check if item NOT in cart to make delete disabled
    const [isInCart, setIsInCart] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    const addToCart = () => {
        dispatch(addItem(product));
        setIsInCart(true);
    }
    const removeFromCart = () => {
        dispatch(removeItem(product.id));
        if (!cart.find((item: Product) => item.id !== product.id)) {
            setIsInCart(false);
        }
    }
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
                sx={{ "&button.Mui-disabled": {cursor: "default"}}} // doesnt work !!!
            >
                <DeleteOutlineIcon />
            </IconButton>
        </div>
  )
}

export default CartActions;