import { FC, useState, useContext } from 'react';

import Dialog from '@mui/material/Dialog';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

import Button from './button';
import { useAppSelector } from '../hooks/useAppSelector';
import Form from './form';
import { TypeForm } from '../@types/types';
import FormProvider, { FormContext } from '../contexts/form';

const Header: FC = () => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);
    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr+item.quantity, 0)

    const handleOpen = (form: TypeForm) => {
        setOpen(true);
        setForm(form);
    }

    const handleClose = () => {
        setOpen(false);
        return true;
    }
    const openCart = () => {
        //setCart(true)
        console.log('click')
    }
  
    return (
        <header>
            <h2>products</h2>
            <div className='header-group'>
                <div className='btn-group'>
                    <Button text="sign up" width="8rem" height="2rem" onClick={()=> handleOpen('signup')} />
                    <Button text="log in" width="8rem" height="2rem" onClick={()=>handleOpen('login')} />
                </div>
                <div className="shopping-cart-icon">
                    <Badge 
                        overlap="circular" 
                        badgeContent={amount}
                        sx={{
                            "&.css-z5pebr-MuiBadge-badge": {backgroundColor: "orange"}
                        }}
                    >
                        <ShoppingCartOutlinedIcon onClick={openCart}/>
                    </Badge>
                </div>
            </div>
            <FormProvider form={form}>
                <Dialog open={open} onClose={handleClose}>
                    <Form />
                </Dialog>
            </FormProvider>
        </header>
    )
}

export default Header;
