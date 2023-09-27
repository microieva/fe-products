import React, { FC } from 'react';
import { Product } from '../@types/product';

interface CardProps {
  product: Product
}

const ProductCard: FC<CardProps> = ({product}: CardProps) => {
  return (
    <div className="card-wrapper">
        <div>ProductCard</div>
        <p>{product.title}</p>
    </div>
  )
}

export default ProductCard;