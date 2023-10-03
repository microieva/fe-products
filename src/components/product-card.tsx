import React, { FC } from 'react';
import { Product } from '../@types/product';

interface CardProps {
  product: Product
}

const ProductCard: FC<CardProps> = ({product}: CardProps) => {
  // this will have title, price & maybe category; 
  // button to add to card - or showing "In Cart" 
  // button remove from cart
  return (
    <div className="card-wrapper">
        <div>ProductCard</div>
        <p>{product.title}</p>
    </div>
  )
}

export default ProductCard;