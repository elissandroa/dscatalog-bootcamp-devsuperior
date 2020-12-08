import React from 'react';
import ProductPrice from '../../../../core/assets/components/ProductPrice';
import  { ReactComponent as ProductImage} from '../../../../core/assets/images/product.svg';
import './styles.scss'


const ProductCard = () => (
    <div className="card-base border-radius-10 product-card">
       <ProductImage />
       <div className="product-info">
          <h6 className="product-name">
              Computador Desktop - Intel Core i7
          </h6>
          <div className="product-price-container">
              <ProductPrice price="2.779,00" />
          </div>
       </div>
    </div>
);


export default ProductCard;