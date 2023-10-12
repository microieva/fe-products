import { FC } from 'react';

import { Product } from '../@types/product';
import CartActions from './cart-actions';

interface CardProps {
    product: Product
}

const ProductCard: FC<CardProps> = ({product}: CardProps) => {

  return (
    <div className="card-wrapper">
        <img src='../assets/img.avif' alt=""/>
        <div className="card-content">
            <div className='product-price'>{product.price}</div>
            <p className='product-title'>{product.title}</p>
            <p className='product-category'>{product.category.name}</p>
            <CartActions product={product}/>
        </div>
    </div>
  )
}

export default ProductCard;