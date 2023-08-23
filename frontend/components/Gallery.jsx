import React, { useState } from 'react';

const Slideshow = () => {
    const [slideIndex, setSlideIndex] = useState(1);

    const plusSlides = (n) => {
        showSlides(slideIndex + n);
    };

    const currentSlide = (n) => {
        showSlides(n);
    };

    const showSlides = (n) => {
        const slides = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("description");

        if (n > slides.length) {
            setSlideIndex(1);
        } else if (n < 1) {
            setSlideIndex(slides.length);
        } else {
            setSlideIndex(n);
        }

        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Remove opacity-100 from all dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("opacity-100");
        }

        // Display the current slide
        slides[slideIndex - 1].style.display = "block";

        // Add opacity-100 to the current dot
        dots[slideIndex - 1].classList.add("opacity-100");
    };

    return (
        <section className="mx-auto max-w-2xl">
            <h2 className="text-4xl text-center tracking-wide font-extrabold font-serif leading-loose mb-2">Slideshow Gallery</h2>
            <div className="shadow-2xl relative">
                {/* Slides */}
                <div className="mySlides hidden">
                    <div className="image1 w-full object-cover"></div>
                </div>
                {/* Add more slides as needed */}
                {/* Buttons */}
                <a className="absolute left-0 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold" onClick={() => plusSlides(-1)}>❮</a>
                <a className="absolute right-0 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold" onClick={() => plusSlides(1)}>❯</a>
                {/* Image description */}
                <div className="text-center text-white font-light tracking-wider bg-gray-800 py-2">
                    <p id="caption"></p>
                </div>
                {/* Smaller images under description */}
                <div className="flex">
                    <div>
                        <img className="image1 description h-24 opacity-50 hover:opacity-100 cursor-pointer" src="#" onClick={() => currentSlide(1)} alt="Dog's Nose" />
                    </div>
                    {/* Add more images as needed */}
                </div>
            </div>
        </section>
    );
};

export default Slideshow;