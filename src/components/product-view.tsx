import { FC } from 'react';
import { Product } from '../@types/product';
import { IconButton } from '@mui/material';
import DoorBackOutlinedIcon from '@mui/icons-material/DoorBackOutlined';
import { useNavigate } from 'react-router-dom';
import ProductForm from './product-form';

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
                <ProductForm product={product}/>
                <div className="img-wrapper">
                    <img src={`${product.images[product.images.length-1]}`} alt="profile picture" />
                </div>
            </div>
        </div>
    )
}

export default ProductView;