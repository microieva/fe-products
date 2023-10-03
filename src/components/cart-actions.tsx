import { FC } from 'react';

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { addItem, removeItem } from '../redux/app-reducers/cart';
import { Product } from '../@types/product';

interface CartActionsProps {
    product: Product
}

const CartActions: FC<CartActionsProps> = ({product}: CartActionsProps) => {
    const dispatch = useAppDispatch();

    const addToCart = () => {
        dispatch(addItem(product));
    }
    const removeFromCart = () => {
        dispatch(removeItem(product.id));
    }
    return (
        <div className='btn-group'>
            <IconButton aria-label="add" size="large" onClick={addToCart}>
                <AddCircleOutlineIcon/>
            </IconButton>
            <IconButton aria-label="delete" size="large" onClick={removeFromCart}>
                <DeleteOutlineIcon/>
            </IconButton>
        </div>
  )
}

export default CartActions;