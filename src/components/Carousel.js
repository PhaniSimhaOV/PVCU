import React from 'react'

const Carousel = () => {
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden  md:h-96">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/BAU/New/HEADER-pc.jpg" className="absolute block w-full" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/BAU/New/HEADER-pc.jpg" className="absolute block w-full" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/BAU/New/HEADER-pc.jpg" className="absolute block w-full" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/BAU/New/HEADER-pc.jpg" className="absolute block w-full" alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/BAU/New/HEADER-pc.jpg" className="absolute block w-full" alt="..."/>
                </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>
        </div>

    )
}

export default Carousel
