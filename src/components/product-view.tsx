import { FC } from 'react';
import { Product } from '../@types/product';
import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';
import ProductForm from './product-form';
import CartActions from './cart-actions';

interface Props {
    product: Product | undefined
}

const ProductView: FC<Props> = ({ product }) => {
    
    const goBack = useNavigate();

    return (
        <>
            { product && 
                <div className="view-container">
                    <div className='view-header'>
                        <h2>product</h2>
                        <div className="icons">
                                <CartActions product={product}/>
                                <IconButton onClick={()=> goBack('/')} style={{padding: "0.3rem 0.8rem"}}>
                                    <DoorBackOutlinedIcon/>
                                </IconButton>
                        </div>
                    </div>
                    <div className='view-details'>
                        <ProductForm product={product}/>
                        <div className="img-wrapper">
                            <img src={`${product.images[product.images.length-1]}`} alt="profile" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductView;