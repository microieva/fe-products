import { FC, useContext, useEffect, useState } from 'react';
import { Product } from '../@types/product';
import { IconButton, ThemeProvider } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';
import ProductForm from './product-form';
import CartActions from './cart-actions';
import { orangeTheme } from '../shared/theme';
import { TypeUserContext } from '../@types/types';
import { UserContext } from '../contexts/user';

interface Props {
    product: Product
}

const ProductView: FC<Props> = ({ product }) => {
    const { user } = useContext(UserContext) as TypeUserContext;
    const [ admin, setAdmin ] = useState<boolean>(false);
    const goBack = useNavigate();

    useEffect(()=> {
        user && user.role === 'admin' && setAdmin(true);
    }, [user])

    return (
        <div className="view-container">
            <div className='view-header'>
                <h2>product</h2>
                <div className="icons">
                    {!admin && <CartActions product={product}/>}
                    <IconButton onClick={()=> goBack('/')} style={{padding: "0.8rem"}}>
                        <DoorBackOutlinedIcon/>
                    </IconButton>
                </div>
            </div>
            <div className='view-details'>
                <ThemeProvider theme={orangeTheme}>
                    <ProductForm product={product}/>
                </ThemeProvider>
                <div className="img-wrapper">
                    <img src={`${product.images[product.images.length-1]}`} alt="profile" />
                </div>
            </div>
        </div>
    )
}

export default ProductView;