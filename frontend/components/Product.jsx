"use client";
import React from 'react'
import Image from 'next/image'

function Product({ product, type }) {
    return (
        <div className="">
            <div className="product-card upcoming-product-card">
                <div className="product-img-wrap">
                    <a href="#" className="product-img-link">
                        <img src="/images/upcoming/1.jpg" alt="upcoming-product" className="product-img" />
                    </a>
                </div>
                <div className="product-text">
                    <a href="#" className="product-name-link"><h4 className="product-name">{product.title}</h4></a>
                    <div className='flex items-center justify-around'>
                        <h5 className="product-price">
                            <span className="product-new-price">৳300</span>
                        </h5>
                        <button className='cart-btn'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product