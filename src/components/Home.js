/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import Header from './Layout/Header';
import { Container, Skeleton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import c1 from "../assets/images/c1.png"
import c2 from "../assets/images/c2.png"
import c3 from "../assets/images/c3.png"
import c4 from "../assets/images/c4.png"
import a from "../assets/images/Map.png"
import aBaner from "../assets/images/Map Banner.png"



import kids from "../assets/images/kids-banner.jpg"

import Carousel from './Carousel';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import NoFound from './common/NoFound';


const Home = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate()
    const womenMenuRef = useRef(null);
    const menMenuRef = useRef(null);
    const electronicsMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                womenMenuRef.current && !womenMenuRef.current.contains(event.target) &&
                menMenuRef.current && !menMenuRef.current.contains(event.target) &&
                electronicsMenuRef.current && !electronicsMenuRef.current.contains(event.target)
            ) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

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




    const [product, setProduct] = useState([])
    const [bestSelling, setBestSelling] = useState([])
    const [newArrivals, setNewArrivals] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false)


    const handleForwardClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % product.length);
    };

    const handleBackwardClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + product.length) % product.length);
    };

    const getProducts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/products?category=flashSales`)
            setProduct(response.data.products)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }
    const getBestSellingProducts = async () => {
        setLoading(true)

        try {
            const response = await axios.get(`${API_URL}/products?category=bestSelling`)
            setBestSelling(response.data.products)
            setLoading(false)

        } catch (e) {
            console.log(e)
        }
    }

    const getNewArrivals = async () => {
        try {
            const response = await axios.get(`${API_URL}/products?category=newArrivals`)
            setNewArrivals(response.data.products)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProducts()
        getBestSellingProducts()
        getNewArrivals()
    }, [])
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        const wishlistedData = localStorage.getItem("wishlist")
        if (wishlistedData) {
            const data = JSON.parse(wishlistedData)
            setWishlist(data)
        }
    }, [wishlist])

    const isProductInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const visibleProducts = product && product.slice(currentIndex, currentIndex + product.length);
    const addToWishlist = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to add items to your wishlist');
            return;
        }
        try {
            const response = await axios.post(
                `${API_URL}/wishlist/add`,
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Products added successfully to Wishlist")
            const prev = JSON.parse(localStorage.getItem("wishlist")) || [];
            const newWishlist = [...wishlist, { id: productId, isWishlisted: true }];
            setWishlist(newWishlist);
            if (Array.isArray(prev)) {
                localStorage.setItem("wishlist", JSON.stringify([...prev, { id: productId, isWishlisted: true }]));
            } else {
                localStorage.setItem("wishlist", JSON.stringify([{ id: productId, isWishlisted: true }]));
            }
            return response.data;
        } catch (error) {
            console.error('Error adding to wishlist', error);
            throw error;
        }
    };
    const skeletonCards = Array.from({ length: 5 }).map((_, index) => (
        <div
            key={index}
            className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
        >
            <div className="h-72 w-full">
                <Skeleton variant="rectangular" height="100%" />
            </div>
            <div className="pt-6 p-3">
                <div className="absolute flex gap-1 top-2 bg-[#8B4513] px-2 py-1 items-center rounded-full">
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton variant="text" width={30} height={15} />
                </div>
                <div className="flex flex-col gap-1">
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="80%" height={25} />
                    <div className="flex gap-3 items-center my-2">
                        <Skeleton variant="text" width="20%" height={20} />
                        <Skeleton variant="text" width="30%" height={20} />
                        <Skeleton variant="text" width="40%" height={15} />
                    </div>
                </div>
            </div>
        </div>
    ));
    const skeletons = (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="grid grid-rows-2 gap-4">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                    >
                        <Skeleton
                            variant="rectangular"
                            height={200}
                            className="w-full rounded-lg"
                        />
                        <Skeleton
                            variant="text"
                            height={30}
                            width="50%"
                            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center"
                        />
                    </div>
                ))}
            </div>
            <div className="row-span-1">
                <div
                    className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative h-full"
                >
                    <Skeleton
                        variant="rectangular"
                        height="100%"
                        className="w-full h-full rounded-lg"
                    />
                    <Skeleton
                        variant="text"
                        height={30}
                        width="50%"
                        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center"
                    />
                </div>
            </div>
        </div>
    );
    const [filters, setFilters] = useState({})
    const getFilters = async () => {
        try {
            const response = await axios.get(`${API_URL}/filters`)
            setFilters(response.data)

        } catch (e) { }
    }
    useEffect(() => {
        getFilters()
    }, [])

    const handleNavigate = (value) => {
        navigate({
            pathname: '/products',
            search: `?category=${value}`, // Add more parameters as needed
        });
    }
    const handleNavigateToKids = (value) => {
        navigate({
            pathname: '/products',
            search: `?gender=${value}`, // Add more parameters as needed
        });
    }
    return (
        <div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Container>
                <div className="text-white">
                    <nav className="flex justify-between items-center p-2">
                        <div className="space-x-6 flex">
                            {/* <div className="relative" ref={womenMenuRef}>
                                <button
                                    className="text-black"
                                    onClick={() => toggleMenu('women')}
                                >
                                    Women's Fashion
                                </button>
                                {activeMenu === 'women' && (
                                    <div className="z-50 absolute left-0 mt-2.5 bg-white text-black cursor-pointer rounded-sm w-48">
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-slate-100">Hoodies</li>
                                            <li className="px-4 py-2 hover:bg-slate-100">Sweatshirts</li>
                                            <li className="px-4 py-2 hover:bg-slate-100">Tops</li>
                                            <li className="px-4 py-2 hover:bg-slate-100">Dresses</li>
                                        </ul>
                                    </div>
                                )}
                            </div> */}
                            <div className="relative" ref={menMenuRef}>
                                <button
                                    className="text-black"
                                    onClick={() => toggleMenu('men')}
                                >
                                    Fashion & Clothing
                                </button>
                                {activeMenu === 'men' && (
                                    <div className="z-50 absolute left-0 mt-2.5 bg-white text-black cursor-pointer rounded-sm w-48">
                                        <ul className="py-2">
                                            {filters?.length > 0 && filters?.map((category) => (
                                                category?.category === "categories" && category?.values.map((value) => (
                                                    <li onClick={() => handleNavigate(value)} className="px-4 py-2 hover:bg-slate-100">{value}</li>
                                                ))
                                            ))}

                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </Container>
            <Carousel />

            <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Our Products</h1>
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
                    {loading ? (
                        <div className="text-center mt-8">
                            <div className="today_flash_sale">
                                <section className="py-8 antialiased md:py-12">
                                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                        <div className="mb-4 flex gap-4 overflow-x-auto">
                                            {skeletonCards}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ) : visibleProducts?.length === 0 ? (
                        // <NoFound name={"Products"} />
                        <></>
                    ) : (
                        <div className="today_flash_sale">
                            <section className="py-8 antialiased md:py-12">
                                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                    <div className="mb-4 flex gap-4 overflow-x-auto">
                                        {visibleProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                                            >
                                                <div className="h-72 w-full">
                                                    <Link to={`/details/${product._id}`}>
                                                        <img
                                                            className="w-full object-cover h-full dark:hidden"
                                                            src={`${IMAGE_URL}/${product.imageUrl}`}
                                                            alt={product.name}
                                                        />
                                                        <img
                                                            className="w-full object-cover hidden h-full dark:block"
                                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                            alt={product.name}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="pt-6 p-3">
                                                    {/* Product Info */}
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
                                                    {/* Actions */}
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center flex-col justify-end gap-0 absolute top-0 right-1">
                                                            <button
                                                                onClick={() => addToWishlist(product._id)}
                                                                type="button"
                                                                data-tooltip-target="tooltip-add-to-favorites"
                                                                className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                            >
                                                                <span className="sr-only"> Add to Favorites </span>
                                                                <svg
                                                                    className={`h-5 w-5 ${isProductInWishlist(product._id) ? 'text-red-500' : 'text-gray-500'}`}
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* Product Details */}
                                                    <div className="flex flex-col gap-1">
                                                        {/* <span className="text-xs">{product.category}</span> */}
                                                        <a
                                                            href="#"
                                                            className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                        >
                                                            <h6 className='text-md'>{product.name}</h6>
                                                        </a>
                                                        <div className="flex gap-3 items-center my-1">
                                                            {
                                                                product.discount !== 0 && <span className="text-md text-[#8B4513]">-{product.discount}%</span>
                                                            }
                                                            <span className="text-md text-[#8B4513]">₹{product.price}</span>
                                                            {/* <span className="text-xs">
                                                                MRP: <span className="line-through">₹{product.original_price}</span>
                                                            </span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full text-center">
                                        <button
                                            onClick={() => navigate("/products")}
                                            type="button"
                                            className="rounded-sm border border-gray-200 px-5 py-2 text-sm font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                        >
                                            View All Products
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </Container>

            <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Browse By Category</h1>
                    </div>
                    <div className='my-6 mb-12 cursor-pointer'>
                        <img onClick={() => handleNavigateToKids("Kids")} src={kids} />
                    </div>

                </div>
            </Container>



            <div className="mt-12 py-4 bg-[#F2F2F2]">
                <Container>
                    <div>
                        <h1 className="text-3xl font-semibold">Best Selling Products</h1>
                    </div>
                    <div>
                        <section className="py-8 antialiased dark:bg-gray-900 md:py-8">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
                                    {bestSelling?.map((product) => (
                                        <div key={product.id} className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative">
                                            <div className="h-full w-full relative">
                                                {/* <a href=""> */}
                                                <Link to={`/details/${product._id}`}>
                                                    <img
                                                        className="w-full h-full dark:hidden"
                                                        src={`${IMAGE_URL}/${product.imageUrl}`}
                                                        alt={product.name}
                                                    />
                                                    {/* <img
                                                        className="w-full h-full dark:hidden"
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                    /> */}
                                                    <img
                                                        className="w-full hidden h-full dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                        alt={product.name}
                                                    />
                                                </Link>
                                                {/* </a> */}
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

            {/* <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Best Selling Products</h1>
                    </div>

                    {loading ? (
                        <div className="text-center mt-8">
                            <div className="today_flash_sale">
                                <section className="py-8 antialiased md:py-12">
                                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                                            {skeletonCards}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ) : bestSelling?.length === 0 ? (
                        <></>
                    ) : (
                        <div>
                            <section className="py-8 antialiased dark:bg-gray-900 md:py-12">
                                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                                        {bestSelling.slice(0, 8).map((product) => (
                                            <div
                                                key={product.id}
                                                className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                                            >
                                                <div className="h-72 w-full">
                                                    <Link to={`/details/${product._id}`}>
                                                        <img
                                                            className="w-full object-cover h-full dark:hidden"
                                                            src={`${IMAGE_URL}/${product.imageUrl}`}
                                                            alt={product.name}
                                                        />
                                                        <img
                                                            className="w-full object-cover hidden h-full dark:block"
                                                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                            alt={product.name}
                                                        />
                                                    </Link>
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
                                                                onClick={() => addToWishlist(product._id)}
                                                                type="button"
                                                                data-tooltip-target="tooltip-add-to-favorites"
                                                                className="rounded-lg p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400"
                                                            >
                                                                <span className="sr-only"> Add to Favorites </span>
                                                                <svg
                                                                    className={`h-5 w-5 ${isProductInWishlist(product._id) ? 'text-red-500' : 'text-gray-500'}`}
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <a
                                                            href="#"
                                                            className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                        >
                                                            <h6 className='text-md'>{product.name}</h6>
                                                        </a>
                                                        <div className="flex gap-3 items-center my-2">
                                                            {
                                                                product.discount !== 0 && <span className="text-md text-[#8B4513]">-{product.discount}%</span>
                                                            }
                                                            <span className="text-md text-[#8B4513]">₹{product.price}</span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full text-center">
                                        <button
                                            onClick={() => navigate("/products")}
                                            type="button"
                                            className="rounded-sm border border-gray-200 px-5 py-2 text-sm font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                        >
                                            View All Products
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </Container> */}

            <section className="py-8 antialiased dark:bg-gray-900 md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3C1E09] via-[#763c13] to-[#41210A]">
                            <div className="relative w-[90%] lg:w-[80%] h-screen flex justify-center items-center">
                                {/* Background Map Image */}
                                <img
                                    src={a}
                                    alt="Map Background"
                                    className="absolute w-full h-full object-cover opacity-50"
                                />
                                {/* Main Banner Image */}
                                <img
                                    src={aBaner}
                                    alt="Winter Jacket"
                                    className="relative w-full h-auto max-h-full object-contain"
                                />
                            </div>
                        </div>
                    </div></section>








            {/* <Container>
                <div>
                    <h1 className="text-3xl font-semibold">New Arrivals</h1>
                </div>
                <div>
                    <section className="py-8 antialiased dark:bg-gray-900 md:py-8">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            {loading ? (
                                skeletons
                            ) : newArrivals?.length === 0 ? (
                                // <NoFound name="New Arrivals" />
                                <></>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="grid grid-rows-2 gap-4">
                                        {newArrivals.slice(1, 3).map((product) => (
                                            <div
                                                key={product.id}
                                                className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                                            >
                                                <a href="">
                                                    <img
                                                        className="w-full h-full object-cover rounded-lg"
                                                        src={`${IMAGE_URL}/${product.imageUrl}`}
                                                        alt={product.name}
                                                    />
                                                </a>
                                                <div className="w-full text-center absolute bottom-3 text-3xl text-white  uppercase">
                                                    {product.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="row-span-1">
                                        {newArrivals[0] && (
                                            <div
                                                key={newArrivals[0].id}
                                                className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative h-full"
                                            >
                                                <a href="">
                                                    <img
                                                        className="w-full h-full object-cover rounded-lg"
                                                        src={`${IMAGE_URL}/${newArrivals[0].imageUrl}`}
                                                        alt={newArrivals[0].name}
                                                    />
                                                </a>
                                                <div className="w-full text-center absolute bottom-3 text-3xl text-white  uppercase">
                                                    {newArrivals[0].name}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </Container> */}



        </div>
    );
};

export default Home;
