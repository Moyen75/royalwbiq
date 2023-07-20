import React from 'react'

function Banner() {
    return (
        <div>
            <section className="hero-section">
                {/* <!-- <div className="wrapper"> --> */}
                <div id="carouselExampleCaptions" className="carousel slide carousel-fad" data-bs-ride="carousel">
                    <div className="hero-banner-slide-indicators carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="hero-banner carousel-item active">
                            <img src="assets/images/hero/1.jpg" className="d-block w-100 h-100" alt="hero banner" />
                            <div className="hero-slide-content wrapper carousel-caption">
                                <div className="hero-slide-text">
                                    <h1 className="hero-slide-top-title p-font-700 size-xl text-color5 text-uppercase position-relative">Men's Fashion</h1>
                                    <h2 className="hero-slide-title p-font-700 size-3xl primary-color text-uppercase">Top New summer <br />Collection</h2>
                                    <p className="hero-slide-p s-font-400 size-lg primary-color">Get it form 50% off</p>
                                    <a href="#" className="hero-slide-btn bg-btn">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="hero-banner carousel-item">
                            <img src="assets/images/hero/2.jpg" className="d-block w-100 h-100" alt="hero banner" />
                            <div className="hero-slide-content wrapper carousel-caption">
                                <div className="hero-slide-text">
                                    <h1 className="hero-slide-top-title p-font-700 size-xl text-color5 text-uppercase position-relative">Men's Fashion</h1>
                                    <h2 className="hero-slide-title p-font-700 size-3xl primary-color text-uppercase">Top New summer <br />Collection</h2>
                                    <p className="hero-slide-p s-font-400 size-lg primary-color">Get it form 50% off</p>
                                    <a href="#" className="hero-slide-btn bg-btn">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="hero-banner carousel-item">
                            <img src="assets/images/hero/3.jpg" className="d-block w-100 h-100" alt="hero banner" />
                            <div className="hero-slide-content wrapper carousel-caption">
                                <div className="hero-slide-text">
                                    <h1 className="hero-slide-top-title p-font-700 size-xl text-color5 text-uppercase position-relative">Men's Fashion</h1>
                                    <h2 className="hero-slide-title p-font-700 size-3xl primary-color text-uppercase">Top New summer <br />Collection</h2>
                                    <p className="hero-slide-p s-font-400 size-lg primary-color">Get it form 50% off</p>
                                    <a href="#" className="hero-slide-btn bg-btn">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- <button className="hero-banner-slide-prev carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="hero-banner-slide-next carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button> --> */}
                </div>
                {/* <!-- </div> --> */}
            </section>
        </div>
    )
}

export default Banner