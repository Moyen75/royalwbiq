"use client";
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };


    return (
        <div className='w-[80%] mx-auto'>
            <Slider {...settings}>
                <div>
                    <img src="/images/hero/1.jpg" alt="" />
                </div>
                <div>
                    <img src="/images/hero/2.jpg" alt="" />
                </div>
                <div>
                    <img src="/images/hero/3.jpg" alt="" />
                </div>
            </Slider>
        </div>
    )
}

export default Banner
