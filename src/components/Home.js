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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



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
    const productContainerRef = useRef(null);


    const handleForwardClick = () => {
        if (productContainerRef.current) {
            const container = productContainerRef.current;
            const scrollAmount = container.clientWidth; // Scroll by container width
            smoothScroll(container, scrollAmount);
        }
    };

    const handleBackwardClick = () => {
        if (productContainerRef.current) {
            const container = productContainerRef.current;
            const scrollAmount = -container.clientWidth;
            smoothScroll(container, scrollAmount);
        }
    };

    // Function for smooth scrolling
    const smoothScroll = (element, amount) => {
        let start = element.scrollLeft;
        let currentTime = 0;
        const increment = 5;
        const duration = 400; // 500ms smooth scroll

        const animateScroll = () => {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, amount, duration);
            element.scrollLeft = val;
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        animateScroll();
    };

    // Easing function for smooth acceleration & deceleration
    const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
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
    }, [wishlist?.length])

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
    const removeFromWishlist = async (productId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/wishlist/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove product from wishlist');
        }

        return response.json(); // Assuming the response will be in JSON format
    };
    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId);
            toast.success("Product removed from wishlist");

            // Update local storage
            const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const updatedWishlist = currentWishlist.filter(
                (product) => product?.id !== productId
            );
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

            // Update state
            setWishlist((prev) =>
                prev.filter((product) => product?.id !== productId)
            );
        } catch (error) {
            console.error("Error removing from wishlist", error);
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
        navigate("/details/67ebd4ef5d2648edb1c2cae9")
        // navigate({
        //     pathname: '/products',
        //     search: `?gender=${value}`, // Add more parameters as needed
        // });
    }
    const sortedProducts = bestSelling?.sort((a, b) => {
        const order = ['Hanu-Man', 'Super-Hero', 'Michael', 'Hey Siri!'];
        return order.indexOf(a.name) - order.indexOf(b.name);
    });
    return (
        <div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Container>
                <div className="text-white">
                    <nav className="flex justify-between items-center p-2 my-4 md:my-0 lg:my-0">
                        <div className="space-x-6 flex">
                            <div className="relative" ref={menMenuRef}>
                              
                                {activeMenu === 'men' && (
                                    <div className="z-50 absolute left-0 mt-2.5 bg-white text-black cursor-pointer rounded-sm w-48">
                                        <ul className="py-2">
                                            {filters?.length > 0 &&
                                                filters?.map((category) =>
                                                    category?.category === "categories" &&
                                                    category?.values.map((value) => (
                                                        <li key={value} className="px-4 py-2 hover:bg-slate-100">
                                                            <a href={`/products?category=${encodeURIComponent(value)}`} className="block w-full h-full">
                                                                {value}
                                                            </a>
                                                        </li>
                                                    ))
                                                )}
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
                <div className="mt-12 my-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Our Products</h1>

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
                            <section className="py-8 antialiased md:py-6">
                                <div className="mx-auto max-w-screen-xl px-1 2xl:px-0">
                                    <div ref={productContainerRef} className="mb-4 flex flex-row gap-4 overflow-x-auto scroll-smooth lg:grid lg:grid-cols-4 lg:overflow-x-visible">
                                        {product.slice().reverse().filter((product) => !product.name.toLowerCase().includes("hanuman")).map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative 
                        transition-all duration-300 ease-in-out transform hover:scale-105"
                                            >
                                                <div className="w-full">
                                                    <a href={`/details/${product._id}`}>
                                                        <img
                                                            className="w-full object-cover h-full dark:hidden transition-opacity duration-500 ease-in-out"
                                                            src={`${IMAGE_URL}/${product.imageUrl}`}
                                                            alt={product.name}
                                                            loading="lazy"
                                                            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                                                        />

                                                    </a>
                                                </div>
                                                <div className="pt-6 p-3">

                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center flex-col justify-end gap-0 absolute top-3 left-2">
                                                            <button
                                                                onClick={() =>
                                                                    isProductInWishlist(product._id)
                                                                        ? handleRemoveFromWishlist(product._id)
                                                                        : addToWishlist(product._id)
                                                                }
                                                                type="button"
                                                                className="bg-[#AB5A25] rounded-full p-1 text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#91481F]"
                                                            >
                                                                {isProductInWishlist(product._id) ? (
                                                                    // Cross icon for "Remove from Wishlist"
                                                                    <svg
                                                                        className="h-5 w-5 text-white"
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
                                                                            d="M6 6l12 12M18 6l-12 12"
                                                                        />
                                                                    </svg>
                                                                ) : (
                                                                    // Heart icon for "Add to Wishlist"
                                                                    <svg
                                                                        className="h-5 w-5 text-white"
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
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex flex-col gap-1">
                                                        <a
                                                            href="#"
                                                            className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                        >
                                                            <h6 className='text-md'>{product.name}</h6>
                                                        </a>
                                                        <div className="flex gap-3 items-center my-1">
                                                            {product.discount !== 0 && <span className="text-md text-[#8B4513]">-{product.discount}%</span>}
                                                            <span className="text-md text-[#8B4513]">₹{product.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                        <h1 className="text-3xl font-semibold">For The Next Generation </h1>
                    </div>
                    <div className='my-6 mb-12 cursor-pointer'>
                        <a href={`/details/67ebd4ef5d2648edb1c2cae9`}> <img src={kids} /></a>

                    </div>

                </div>
            </Container>



            <div className="mt-12 py-4 bg-[#F2F2F2]">
                <Container>
                    <div>
                        <h1 className="text-3xl font-semibold">Top Picks For You </h1>
                    </div>
                    <div>
                        <section className="py-8 antialiased dark:bg-gray-900 md:py-8">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
                                    {sortedProducts?.map((product) => (
                                        <div key={product.id} className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative transition-all duration-300 ease-in-out transform hover:scale-105">
                                            <div className="h-full w-full relative">
                                                {/* <a href=""> */}
                                                <a href={`/details/${product._id}`}>
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
                                                </a>
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center flex-col justify-end gap-0 absolute top-2 left-2">
                                                        <button
                                                            onClick={() =>
                                                                isProductInWishlist(product._id)
                                                                    ? handleRemoveFromWishlist(product._id)
                                                                    : addToWishlist(product._id)
                                                            }
                                                            type="button"
                                                            className="bg-[#AB5A25] rounded-full p-1 text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#91481F]"
                                                        >
                                                            {isProductInWishlist(product._id) ? (
                                                                // Cross icon for "Remove from Wishlist"
                                                                <svg
                                                                    className="h-5 w-5 text-white"
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
                                                                        d="M6 6l12 12M18 6l-12 12"
                                                                    />
                                                                </svg>
                                                            ) : (
                                                                // Heart icon for "Add to Wishlist"
                                                                <svg
                                                                    className="h-5 w-5 text-white"
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
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
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

            
            <Container>
                <div className='py-8 '>
                    <h1 className="text-3xl font-semibold">Join the PVCU Tribe</h1>
                </div>
            </Container>
            <div className="flex flex-col items-center justify-center px-4">
                <div className="relative w-full max-w-6xl flex justify-center items-center group overflow-hidden">
                    {/* Background Image */}
                    <a href="/details/67ebd32f5d2648edb1c2caaa">
                        <img
                            src={a}
                            alt="Map Background"
                            className="w-full h-full object-cover opacity-50 transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                    </a>

                    {/* Foreground Banner Image */}
                    <a href="/details/67ebd32f5d2648edb1c2caaa">

                        <img
                            src={aBaner}
                            alt="Winter Jacket"
                            className="absolute left-0 top-20 md:top-30 lg:top-60 w-full max-w-[500px] h-auto md:max-w-[700px] lg:max-w-[900px] object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
                        />
                    </a>
                </div>
            </div>


        </div>
    );
};

export default Home;
