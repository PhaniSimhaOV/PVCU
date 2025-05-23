import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, IMAGE_URL } from "../constants";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
    const [banners, setBanners] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadedImages, setLoadedImages] = useState({}); // Track image load state

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`${API_URL}/banners`);
                setBanners(response.data.banners || []);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        // Preload images for better performance
        banners.forEach((banner) => {
            const img = new Image();
            img.src = `${IMAGE_URL}${banner.imageUrl}`;
            img.onload = () => {
                setLoadedImages((prev) => ({ ...prev, [banner._id]: true }));
            };
        });
    }, [banners]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const BANNER_URLS = {
        "67ebcdbf5d2648edb1c2ca49": "/details/67ebd41c5d2648edb1c2cac5",
        "67ebcdc85d2648edb1c2ca4d": "/details/67ebd5545d2648edb1c2caf5",
        "67ecd0c45d2648edb1c2ce7f": "/details/67ebd4ef5d2648edb1c2cae9",
        "67f5fb1b541c66611959c9ba":"/details/67ebd4ef5d2648edb1c2cae9",
        "682ada7f9cd789b032f7dd49":"/details/67ebd32f5d2648edb1c2caaa"
    };


    return (
        <div id="custom-carousel" className="relative w-full">
            <div className="relative overflow-hidden">
                {banners.length > 0 && (
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {banners.map((banner, index) => (
                            <div key={banner._id} className="w-full flex-shrink-0">
                                {/* Show placeholder while loading */}
                                {!loadedImages[banner._id] && (
                                    <div className="w-full h-[700px]  animate-pulse flex items-center justify-center">
                                        <span className="text-gray-400"></span>
                                    </div>
                                )}
                                <a href={BANNER_URLS[banner._id] || "#"}>
                                    <img
                                        src={`${IMAGE_URL}${banner.imageUrl}`}
                                        className={`cursor-pointer block w-full h-full object-cover transition-opacity duration-700 ${loadedImages[banner._id] ? "opacity-100" : "opacity-0"
                                            }`}
                                        alt={`Banner ${banner._id}`}
                                        loading="lazy"
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
                onClick={prevSlide}
            >
                <ArrowBackIos sx={{ ml: 0.7, mb: 0.8 }} fontSize="medium" />
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
                onClick={nextSlide}
            >
                <ArrowForwardIos sx={{ ml: 0.2, mb: 0.8 }} fontSize="medium" />
            </button>

            {/* Dots for slide indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white scale-110" : "bg-gray-500"
                            }`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
