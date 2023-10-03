import { FC } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import Button from './button';
import { useAppSelector } from '../hooks/useAppSelector';

const Header: FC = () => {

    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr+item.quantity, 0)

    const handleClick = () => {
        console.log('sign in click')
    }
    const openCart = () => {
        //setCart(true)
        console.log('click')
    }
  
    return (
        <header>
            <h2>PRODUCTS</h2>
            <div className='header-group'>
                <Button text="sign in" width="8rem" height="2rem" onClick={handleClick} />
                <div className="shopping-cart-icon">
                    <Badge 
                        //color="secondary" 
                        overlap="circular" 
                        badgeContent={amount}
                        sx={{
                            "&.css-z5pebr-MuiBadge-badge": {backgroundColor: "orange"}
                        }}
                    >
                        <ShoppingCartIcon onClick={openCart}/>
                    </Badge>
                </div>
            </div>
        </header>
    )
}

export default Header;
