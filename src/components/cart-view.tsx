import { FC } from 'react';
import { CartItem } from '../@types/cart';
import MuiCartTable from './mui-cart-table';

interface Props {
  cart: CartItem[]
}

const CartView: FC<Props> = ({ cart }) => {
    return (
        <div className="table-view">
            <div>CartView</div>
            <MuiCartTable data={cart} />
        </div>
        
    )
}

export default CartView;