"use client";
import React, { useEffect, useState } from 'react'

function page() {
    const [currentIndex, setCurrentIndex] = useState(0);


    const images = [
        '/images/hero/1.jpg',
        '/images/hero/2.jpg',
        '/images/hero/3.jpg',
        // Add more image URLs as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Advance to the next slide
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval); // Clean up the interval on unmount
        };
    }, []);
    const handleSlideClick = (index) => {
        setCurrentIndex(index);
    };


    return (
        <div className="carousel-container">

            <div className="carousel-slides">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-slide ${index === currentIndex ? 'active' : ''
                            }`}
                        style={{
                            opacity: index === currentIndex ? 1 : 0,
                        }}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            <div className="carousel-controls">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 m-1 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                            }`}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => handleSlideClick(index)}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default page
