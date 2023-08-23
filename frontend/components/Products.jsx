"use client";
import React from 'react'
import products from '../assets/products.json'
import Product from './Product'

function Products({ type }) {
    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-5 gap-4 justify-center items-center'>
                {
                    products.map(product => <Product key={product.uid} product={product} type={type} />)
                }
            </div>
        </div>
    )
}

export default Products