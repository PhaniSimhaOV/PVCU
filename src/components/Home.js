/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Header from './Layout/Header';
import { Container } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import c1 from "../assets/images/c1.png"
import c2 from "../assets/images/c2.png"
import c3 from "../assets/images/c3.png"
import c4 from "../assets/images/c4.png"

import na1 from "../assets/images/na1.png"
import na2 from "../assets/images/na2.png"
import na3 from "../assets/images/na3.png"

import a from "../assets/images/a.png"

import Footer from './Layout/Footer';
import Carousel from './Carousel';


const Home = () => {
    const categories = [
        {
            name: 'Electronics',
            imageUrl: c1
        },
        {
            name: 'Clothing',
            imageUrl: c2
        },
        {
            name: 'Home & Garden',
            imageUrl: c3
        },
        {
            name: 'Sports & Outdoors',
            imageUrl: c4
        }
    ];

    const newArrivals = [
        {
            name: 'Formal Women',
            imageUrl: na1
        },
        {
            name: 'Formal Men',
            imageUrl: na2
        },
        {
            name: 'Casual Style',
            imageUrl: na3
        },

    ];

    const products = [
        {
            id: 1,
            imageUrl: 'https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg',
            rating: 4.5,
            category: 'Jackets',
            title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
            discount: '-25%',
            price: '120$',
            originalPrice: '160$',
        },
        {
            id: 2,
            imageUrl: 'https://thehouseofrare.com/cdn/shop/products/IMG_0010_51e74518-2782-4b53-8112-a026836a45de.jpg?v=1722671264&_gl=1*1bsrjj5*_up*MQ..*_gs*MQ..&gclid=Cj0KCQiA7NO7BhDsARIsADg_hIZsLqFEJOMHbHM2fPHrlpYxhVwOE8Z4ZzaZX9bY8K1iHGYekbjEE80aAmZyEALw_wcB',
            rating: 4.5,
            category: 'Jackets',
            title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
            discount: '-25%',
            price: '120$',
            originalPrice: '160$',
        },
        {
            id: 3,
            imageUrl: 'https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg',
            rating: 4.5,
            category: 'Jackets',
            title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
            discount: '-25%',
            price: '120$',
            originalPrice: '160$',
        },
        {
            id: 4,
            imageUrl: 'https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg',
            rating: 4.5,
            category: 'Jackets',
            title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
            discount: '-25%',
            price: '120$',
            originalPrice: '160$',
        },
        {
            id: 5,
            imageUrl: 'https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg',
            rating: 4.5,
            category: 'Jackets',
            title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
            discount: '-25%',
            price: '120$',
            originalPrice: '160$',
        },
        {
            id: 6,
            imageUrl: 'https://myraymond.com/cdn/shop/files/RMSX12887-B3-1.jpg?v=1714559309',
            rating: 4.5,
            category: 'Jackets',
            title: 'Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max',
            discount: '-25%',
            price: '120$',
            originalPrice: '160$',
        }
        // Add more product objects here
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleForwardClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handleBackwardClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + products.length);

    return (
        <div>
            <Carousel />
            <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Today's Flash Sales</h1>
                        <div className="flex gap-2">
                            <div
                                className="border rounded-full px-2 py-1 bg-slate-100 cursor-pointer"
                                onClick={handleBackwardClick}
                            >
                                <ArrowBackOutlinedIcon sx={{ fontSize: '18px' }} />
                            </div>
                            <div
                                className="border rounded-full px-2 py-1 bg-slate-100 cursor-pointer"
                                onClick={handleForwardClick}
                            >
                                <ArrowForwardOutlinedIcon sx={{ fontSize: '18px' }} />
                            </div>
                        </div>
                    </div>
                    <div className='today_flash_sale'>
                        <section className="py-8 antialiased md:py-12">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 flex gap-4 overflow-x-auto">
                                    {visibleProducts.map((product) => (
                                        <div key={product.id} className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative">
                                            <div className="h-72 w-full">
                                                <a href="#">
                                                    <img
                                                        className="w-full object-cover h-full dark:hidden"
                                                        src={product.imageUrl}
                                                        alt={product.title}
                                                    />
                                                    <img
                                                        className="w-full object-cover hidden h-full dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                        alt={product.title}
                                                    />
                                                </a>
                                            </div>
                                            <div className="pt-6 p-3">
                                                <div className="absolute flex gap-1 top-2 bg-[#8B4513] px-2 py-1 items-center rounded-full">
                                                    <svg
                                                        className="h-3 w-3 text-yellow-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                    </svg>
                                                    <span className="text-xs text-white">{product.rating}</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center flex-col justify-end gap-0 absolute top-0 right-1">
                                                        <button
                                                            type="button"
                                                            data-tooltip-target="tooltip-add-to-favorites"
                                                            className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                        >
                                                            <span className="sr-only"> Add to Favorites </span>
                                                            <svg
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-tooltip-target="tooltip-quick-look"
                                                            className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                        >
                                                            <span className="sr-only"> Quick look </span>
                                                            <svg
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                                />
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs">{product.category}</span>
                                                    <a
                                                        href="#"
                                                        className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                    >
                                                        {product.title}
                                                    </a>
                                                    <div className="flex gap-3 items-center my-2">
                                                        <span className="text-md text-[#8B4513]">{product.discount}</span>
                                                        <span className="text-md text-[#8B4513]">{product.price}</span>
                                                        <span className="text-xs">
                                                            MRP: <span className="line-through">{product.originalPrice}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full text-center">
                                    <button
                                        type="button"
                                        className="rounded-sm border border-gray-200 px-5 py-2 text-sm font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                    >
                                        View All Products
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Container>

            <div className="mt-12 py-4 bg-[#F2F2F2]">
                <Container>
                    <div>
                        <h1 className="text-3xl font-semibold">Browse By Category</h1>
                    </div>
                    <div>
                        <section className="py-8 antialiased dark:bg-gray-900 md:py-8">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
                                    {categories?.map((product) => (
                                        <div key={product.id} className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative">
                                            <div className="h-full w-full relative">
                                                <a href="">
                                                    <img
                                                        className="w-full h-full dark:hidden"
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                    />
                                                    <img
                                                        className="w-full hidden h-full dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                        alt={product.name}
                                                    />
                                                </a>
                                                <div className="w-full text-center absolute bottom-3">
                                                    <button
                                                        type="button"
                                                        className="rounded-sm border border-gray-200 px-5 py-2 text-sm focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-black bg-white font-medium"
                                                    >
                                                        {product.name}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </section>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Best Selling Products</h1>

                    </div>
                    <div>
                        <section className="py-8 antialiased dark:bg-gray-900 md:py-12">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative">
                                            <div className="h-72  w-full">
                                                <a href="#">
                                                    <img
                                                        className="w-full object-cover h-full dark:hidden"
                                                        src={product.imageUrl}
                                                        alt={product.title}
                                                    />
                                                    <img
                                                        className="w-full object-cover hidden h-full dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                        alt={product.title}
                                                    />
                                                </a>
                                            </div>
                                            <div className="pt-6 p-3">
                                                <div className="absolute flex gap-1 top-2 bg-[#8B4513] px-2 py-1 items-center rounded-full">
                                                    <svg
                                                        className="h-3 w-3 text-yellow-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                    </svg>
                                                    <span className="text-xs text-white">{product.rating}</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center flex-col justify-end gap-0 absolute top-0 right-1">
                                                        <button
                                                            type="button"
                                                            data-tooltip-target="tooltip-add-to-favorites"
                                                            className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                        >
                                                            <span className="sr-only"> Add to Favorites </span>
                                                            <svg
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-tooltip-target="tooltip-quick-look"
                                                            className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                        >
                                                            <span className="sr-only"> Quick look </span>
                                                            <svg
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                                />
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs">{product.category}</span>
                                                    <a
                                                        href="#"
                                                        className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                    >
                                                        {product.title}
                                                    </a>
                                                    <div className="flex gap-3 items-center my-2">
                                                        <span className="text-md text-[#8B4513]">{product.discount}</span>
                                                        <span className="text-md text-[#8B4513]">{product.price}</span>
                                                        <span className="text-xs">
                                                            MRP: <span className="line-through">{product.originalPrice}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full text-center">
                                    <button
                                        type="button"
                                        className="rounded-sm border border-gray-200 px-5 py-2 text-sm font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                    >
                                        View All Products
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Container>


            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3C1E09] via-[#763c13] to-[#41210A]">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center p-6 max-w-7xl mx-auto">
                    {/* Left Section */}
                    <div className="text-white space-y-6">
                        <div className=" text-sm ">Categories</div>
                        <h1 className="text-4xl lg:text-5xl font-bold font-mono">
                            Enhance Your Winter Wardrobe
                        </h1>
                        {/* Countdown Timer */}
                        <div className="flex space-x-6 text-lg font-medium">
                            {["Hours", "Days", "Minutes", "Seconds"].map((label, index, arr) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center ${index !== arr.length - 1 ? "border-r border-slate-400 pr-6" : ""
                                        }`}
                                >
                                    <span className="text-xl font-normal">23</span>
                                    <span className="text-xs">{label}</span>
                                </div>
                            ))}
                        </div>
                        {/* Button */}
                        <button
                            type="button"
                            className="rounded-md border border-gray-200 px-5 py-2 text-sm focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-black bg-white font-medium"
                        >
                            Buy Now
                        </button>
                    </div>
                    {/* Right Section */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src={a}
                            alt="Winter Jacket"
                            className="max-w-full w-[90%] lg:w-full"
                        />
                    </div>
                </div>
            </div>


            <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Explore Our Products</h1>
                        <div className=" text-center">
                            <button
                                type="button"
                                className="rounded-sm border border-gray-200 px-5 py-2 text-sm font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                            >
                                View All
                            </button>
                        </div>
                    </div>
                    <div className='today_flash_sale'>
                        <section className="py-8 antialiased md:py-12">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 flex gap-4 overflow-x-auto">
                                    {visibleProducts.map((product) => (
                                        <div key={product.id} className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative">
                                            <div className="h-72 w-full">
                                                <a href="#">
                                                    <img
                                                        className="w-full object-cover h-full dark:hidden"
                                                        src={product.imageUrl}
                                                        alt={product.title}
                                                    />
                                                    <img
                                                        className="w-full object-cover hidden h-full dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                        alt={product.title}
                                                    />
                                                </a>
                                            </div>
                                            <div className="pt-6 p-3">
                                                <div className="absolute flex gap-1 top-2 bg-[#8B4513] px-2 py-1 items-center rounded-full">
                                                    <svg
                                                        className="h-3 w-3 text-yellow-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                    </svg>
                                                    <span className="text-xs text-white">{product.rating}</span>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center flex-col justify-end gap-0 absolute top-0 right-1">
                                                        <button
                                                            type="button"
                                                            data-tooltip-target="tooltip-add-to-favorites"
                                                            className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                        >
                                                            <span className="sr-only"> Add to Favorites </span>
                                                            <svg
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-tooltip-target="tooltip-quick-look"
                                                            className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                        >
                                                            <span className="sr-only"> Quick look </span>
                                                            <svg
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                                />
                                                                <path
                                                                    stroke="currentColor"
                                                                    stroke-width="2"
                                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs">{product.category}</span>
                                                    <a
                                                        href="#"
                                                        className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                    >
                                                        {product.title}
                                                    </a>
                                                    <div className="flex gap-3 items-center my-2">
                                                        <span className="text-md text-[#8B4513]">{product.discount}</span>
                                                        <span className="text-md text-[#8B4513]">{product.price}</span>
                                                        <span className="text-xs">
                                                            MRP: <span className="line-through">{product.originalPrice}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </Container>


            <Container>
                <div>
                    <h1 className="text-3xl font-semibold">New Arrivals</h1>
                </div>
                <div>
                    <section className="py-8 antialiased dark:bg-gray-900 md:py-8">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            {/* Grid layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Left Side: Two Stacked Images */}
                                <div className="grid grid-rows-2 gap-4">
                                    {newArrivals.slice(0, 2).map((product) => (
                                        <div
                                            key={product.id}
                                            className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                                        >
                                            <a href="">
                                                <img
                                                    className="w-full h-full object-cover rounded-lg"
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                />
                                            </a>
                                            <div className="w-full text-center absolute bottom-3 text-3xl text-white font-mono uppercase">

                                                {product.name}

                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Right Side: Full Height Image */}
                                <div className="row-span-1">
                                    {newArrivals[2] && (
                                        <div
                                            key={newArrivals[2].id}
                                            className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative h-full"
                                        >
                                            <a href="">
                                                <img
                                                    className="w-full h-full object-cover rounded-lg"
                                                    src={newArrivals[2].imageUrl}
                                                    alt={newArrivals[2].name}
                                                />
                                            </a>
                                            <div className="w-full text-center absolute bottom-3 text-3xl text-white font-mono uppercase">
                                                {newArrivals[2].name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Container>



        </div>
    );
};

export default Home;
