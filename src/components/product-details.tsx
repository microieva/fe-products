import { FC } from 'react';
import { Product } from '../@types/product';

interface ProductProps {
  product: Product
}

const ProductDetails: FC<ProductProps> = ({ product }) => {

    return (
        product && <div>ProductDetails: {product.title}</div>
    )
}

export default ProductDetails