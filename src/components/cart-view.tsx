import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import MuiCartTable from './mui-cart-table';
import { CartItem } from '../@types/cart';

interface Props {
  cart: CartItem[]
}

const CartView: FC<Props> = ({ cart }) => {
    const [ data, setData ] = useState<CartItem[] | undefined>(cart)
    const totalAmount = cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
    }, 0);

    useEffect(()=> {
        setData(cart)
    }, [cart]);

    const goBack = useNavigate();

    const onEmptyCart = () => {
        setData(cart.slice(0, 0));
    }
    const onCheckout = () => {

    }

    return (
        <div className="cart-container" >
            <div className="view-header">
                {cart.length === 0 ? <h2>your cart is empty</h2>:<h2>your cart / {cart.length} {cart.length===1 ? ' product': 'products'}</h2>}
                <div className="btn-group">
                    <IconButton onClick={()=> onCheckout()}>
                        <ShoppingBasketOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={()=> onEmptyCart()} >
                        <RemoveShoppingCartOutlinedIcon />
                    </IconButton>
                    <IconButton  onClick={()=> goBack('/')}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>

            </div>
            <MuiCartTable data={cart} />
            <h2 style={{visibility: cart.length === 0 ? "hidden" : "visible", color: "darkgrey", alignSelf: "flex-end"}}>
                total amount: {totalAmount} $
            </h2>
        </div>
        
    )
}

export default CartView;