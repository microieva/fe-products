import { FC } from 'react';
import { Product } from '../@types/product';
import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';

interface Props {
    product: Product
}

const ProductView: FC<Props> = ({product}) => {
    
    const goBack = useNavigate();

    return (
        <div className="view-container">
            <div className='view-header'>
                <h2>product</h2>
                <div className='btn-group'>
                        <IconButton>
                            
                       </IconButton>
                       <IconButton onClick={()=> goBack('/')}>
                           <DoorBackOutlinedIcon/>
                       </IconButton>
                </div>
            </div>
            <div className='view-details'>
                <div className="product-details-text">
                    <p><span>product name:</span> {product.title}</p>
                    <p><span>product price:</span> {product.price}</p>
                </div>
                <div className="img-wrapper">
                   this will be image stepper
                </div>
            </div>
        </div>
    )
}

export default ProductView;