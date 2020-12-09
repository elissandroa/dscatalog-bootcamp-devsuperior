import React from 'react';
import ProductPrice from '../../../../core/assets/components/ProductPrice';
import { Product } from '../../../../core/Types/Product';
import './styles.scss'

type Props = {
    product: Product;
}

const ProductCard = ({product}:Props) => (
     <div className="card-base border-radius-10 product-card">
       <img src={product.imgUrl} alt={product.name} className="product-card-image"/>
       <div className="product-info">
          <h6 className="product-name">
              {product.name}
          </h6>
          <div className="product-price-container">
              <ProductPrice price={product.price} />
          </div>
       </div>
    </div>
);


export default ProductCard;