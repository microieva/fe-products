import { FC, useContext, useEffect, useState } from 'react';

import { IconButton, ThemeProvider } from '@mui/material';
import { Backdrop } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

import { useAppSelector } from '../hooks/useAppSelector';
import FormProvider from '../contexts/form';
import { theme } from '../shared/theme';
import Button from './button';
import FormSwitcher from './form-switcher';
import { TypeForm, TypeUserContext } from '../@types/types';
import { UserContext } from '../contexts/user';
import { User } from '../@types/user';


const Header: FC = () => {
    const { user, onLogout } = useContext(UserContext) as TypeUserContext;

    const [ loggedInUser, setLoggedInUser ] = useState<User | undefined>(user);
    const [ open, setOpen ] = useState<boolean>(false);
    const [ form, setForm ] = useState<TypeForm>(null);
    const cart = useAppSelector(state => state.cart);
    const amount = cart.reduce((curr, item) => curr+item.quantity, 0);

    console.log('USER from header: ', loggedInUser);

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

    const openProfilePage = () => {
        // router link ?
    }

    useEffect(()=> {
        setLoggedInUser(user);
    }, [loggedInUser]);

    return (
        <header>
            <h2>products</h2>
            <div className='header-group'>
                <div className='btn-group'>
                    { !user ? 
                        <>
                            <Button text="sign up" width="8rem" height="2rem" onClick={()=> handleOpen('signup')} />
                            <Button text="log in" width="8rem" height="2rem" onClick={()=>handleOpen('login')} />
                        </>
                        :
                        <>
                            <Button text="log out" width="8rem" height="2rem" onClick={()=>onLogout()} />
                            <IconButton onClick={openProfilePage} id="profile-icon">
                                <AccountCircleOutlinedIcon /> 
                            </IconButton>
                        </>
                    }
                    <IconButton>
                        <Badge 
                            overlap="circular" 
                            badgeContent={amount}
                            sx={{
                                "&.css-z5pebr-MuiBadge-badge": {backgroundColor: "orange"}
                            }}
                        >
                            <ShoppingCartOutlinedIcon onClick={openCart}/>
                        </Badge>
                    </IconButton>
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <FormProvider form={form} onClose={handleClose}>
                    <Dialog fullWidth open={open} onClose={handleClose} >
                        <FormSwitcher />
                    </Dialog>
                <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}/>
                </FormProvider>
            </ThemeProvider>
        </header>
    )
}

export default Header;