import { FC } from 'react';
import { CartItem } from '../@types/cart';
import MuiCartTable from './mui-cart-table';

import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { IconButton } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Props {
  cart: CartItem[]
}

const CartView: FC<Props> = ({ cart }) => {
    const goBack = useNavigate();

    const onEmptyCart = () => {

    }
    const onCheckout = () => {

    }

    return (
        <div className="cart-container" >
            <div className="view-header">
                <h2>your cart</h2>
                <div className="btn-group">
                    <IconButton>
                        <ShoppingBasketOutlinedIcon onClick={()=> onCheckout()} />
                    </IconButton>
                    <IconButton>
                        <RemoveShoppingCartOutlinedIcon onClick={()=> onEmptyCart()} />
                    </IconButton>
                    <IconButton>
                        <DoorBackOutlinedIcon onClick={()=> goBack('/')}/>
                    </IconButton>
                </div>

            </div>
            <MuiCartTable data={cart} />
        </div>
        
    )
}

export default CartView;