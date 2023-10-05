import { FC, useState } from 'react';

import { ThemeProvider } from '@mui/material';
import { Backdrop } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useAppSelector } from '../hooks/useAppSelector';
import FormProvider from '../contexts/form';
import { theme } from '../shared/theme';
import Button from './button';
import Form from './form';
import { TypeForm } from '../@types/types';


const Header: FC = () => {
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);
    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr+item.quantity, 0);

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
            <ThemeProvider theme={theme}>
                <FormProvider form={form} onClose={handleClose}>
                    <Dialog fullWidth open={open} onClose={handleClose} >
                        <Form />
                    </Dialog>
                <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                </FormProvider>
            </ThemeProvider>
        </header>
    )
}

export default Header;