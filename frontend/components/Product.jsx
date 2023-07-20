import React from 'react'
import Image from 'next/image'

function Product({ product, type }) {
    return (
        <div>
            <div className="column-2">
                <div className="product-card upcoming-product-card">
                    <div className="product-img-wrap">
                        <a href="#" className="product-img-link">
                            <img src="assets/images/upcoming/1.jpg" alt="upcoming-product" className="product-img" />
                        </a>
                        <button type="button" className="wishlist-btn">
                            Add To Wishlist
                        </button>
                    </div>
                    <div className="product-text">
                        <a href="#" className="product-name-link"><h4 className="product-name">Product Name</h4></a>
                        <h5 className="product-price">
                            <span className="product-new-price">৳ 300</span>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product