import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../constants';

const Carousel = () => {
    const [banners, setBanners] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0); // State to track the active slide

    // Fetch banners from the API when the component mounts
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${API_URL}/banners`); // Adjust the URL to match your backend
                setBanners(response.data.banners); // Set the banners in state
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    // Go to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? banners.length - 1 : prevSlide - 1));
    };

    // Go to the next slide
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === banners.length - 1 ? 0 : prevSlide + 1));
    };

    // Go to a specific slide when a dot is clicked
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div id="custom-carousel" className="relative w-full">
            <div className="relative h-56 overflow-hidden lg:h-96">
                {/* Display banners */}
                {banners.length > 0 && (
                    <div
                        className="flex transition-transform duration-700"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {banners.map((banner, index) => (
                            <div
                                key={banner._id}
                                className="w-full flex-shrink-0"
                            >
                                <img
                                    src={`${IMAGE_URL}${banner.imageUrl}`}
                                    className="absolute block w-full h-96 object-cover"
                                    alt={`Banner ${banner._id}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Previous button */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
                onClick={prevSlide}
            >
                &#10094;
            </button>

            {/* Next button */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
                onClick={nextSlide}
            >
                &#10095;
            </button>

            {/* Dots for slide indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
