import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { Link } from 'react-router-dom';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductsResponse } from 'core/Types/Product';
import ProductCardLoader from './components/Loader/ProductCardLoader';
import Pagination from 'core/assets/components/Pagination';
import { act } from '@testing-library/react';


const Catalog = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    console.log(productsResponse);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 12
        }
       
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);
    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catálogo de produtos
        </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product} />
                    </Link>
                )))}

            </div > 
            {productsResponse && (
            <Pagination 
                totalPages={productsResponse.totalPages} 
                activePage={activePage}
                onChange={page => setActivePage(page)}
                />
            )}
        </div>

    );
}

export default Catalog;