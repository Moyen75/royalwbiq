"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination} from 'swiper/modules';

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="/images/hero/1.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="/images/hero/2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                <img src="/images/hero/3.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;

