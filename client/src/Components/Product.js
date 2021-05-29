import React from 'react';
import products from "./data";

const Product = ({match}) => {

    return (
        <div>
            <h1>{product.name}</h1>
            <img>{product.img}</img>
            <p>{product.description}</p>
        </div>
    )
}

export default Product;