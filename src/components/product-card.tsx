import { FC } from 'react';

import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Product } from '../@types/product';

interface CardProps {
  product: Product
}

const ProductCard: FC<CardProps> = ({product}: CardProps) => {
  // this will have title, price & maybe category; 
  // button to add to card - or showing "In Cart" 
  // button remove from cart

  const addToCart = () => {
    console.log('add')
  }
  const removeFromCart = () => {
    console.log('remove')
  }

  return (
    <div className="card-wrapper">
        <img src='../assets/img.avif' alt=""/>
        <div className="card-content">
            <div className='product-price'>{product.price}</div>
            <p className='product-title'>{product.title}</p>
            <p className='product-category'>{product.category.name}</p>
            <div className='btn-group'>
                <IconButton aria-label="add" size="large" onClick={addToCart}>
					<AddCircleOutlineIcon/>
				</IconButton>
				<IconButton aria-label="delete" size="large" onClick={removeFromCart}>
					<DeleteOutlineIcon/>
				</IconButton>
            </div>
        </div>
    </div>
  )
}

export default ProductCard;