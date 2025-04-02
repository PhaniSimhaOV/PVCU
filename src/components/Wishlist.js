/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL, IMAGE_URL } from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import NoFound from "../components/common/NoFound"
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingBest, setBestLoading] = useState(false);

    const [bestSelling, setBestSelling] = useState([])

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
    const getWishlistData = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch wishlist data');
        }

        const data = await response.json();
        return data; // Assuming the response contains the wishlist data
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
    const handleRemoveFromWishlist = async (productId) => {
        try {
            await removeFromWishlist(productId);
            toast.success('Product removed from wishlist');
            const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            console.log(currentWishlist)
            const updatedWishlist = currentWishlist.filter(
                (product) => product?.id !== productId
            );

            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            setWishlist((prev) => prev.filter((product) => product?.productId?._id !== productId));
        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const data = await getWishlistData(); // Fetch wishlist from API
                setWishlist(data);
            } catch (error) {
            }
        };
        fetchWishlist();
    }, []);


    const handleMoveToBag = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            await axios.post(
                `${API_URL}/wishlist/move-to-cart`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            toast.success('All items moved to the cart successfully!');
            setWishlist([])
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };
    const getBestSellingProducts = async () => {
        setBestLoading(true)

        try {
            const response = await axios.get(`${API_URL}/products?category=justForYou`)
            setBestSelling(response.data.products)
            setBestLoading(false)

        } catch (e) {
            console.log(e)
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        getBestSellingProducts()
    }, [])

    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Container>
                <div className="mt-12 my-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Wishlist ({wishlist?.length})</h1>
                        {
                            wishlist?.length > 0 && <div className="text-center">
                                <button
                                    type="button"
                                    className="uppercase rounded-sm border border-gray-200 px-5 py-2 text-xs font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                    onClick={handleMoveToBag}
                                    disabled={loading}
                                >
                                    {loading ? 'Moving to Bag...' : 'Move All to Bag'}
                                </button>
                            </div>
                        }
                    </div>
                    {
                        wishlist?.length === 0 ? <>
                            <NoFound name={"Wishlist"} />

                        </> : <>

                            <div className="today_flash_sale">
                                <section className="py-8 antialiased md:py-12">
                                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                        <div className="mb-4 flex gap-4 overflow-x-auto">
                                            {wishlist.map((product) => (
                                                <div
                                                    key={product?.productId?.id}
                                                    className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                                                >
                                                    <div className="h-72 w-full">
                                                        <Link to={`/details/${product.productId._id}`}>
                                                            <img
                                                                className="w-full object-cover h-full dark:hidden"
                                                                src={`${IMAGE_URL}/${product?.productId?.imageUrl}`}
                                                                alt={product?.productId?.name}
                                                            />
                                                            <img
                                                                className="w-full object-cover hidden h-full dark:block"
                                                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                                alt={product?.productId?.name}
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
                                                            <span className="text-xs text-white">{product?.productId?.rating}</span>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs">{product?.productId?.category}</span>
                                                            <a
                                                                href="#"
                                                                className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                            >
                                                                {product?.productId?.name}
                                                            </a>
                                                            <div className="flex gap-3 items-center my-2">
                                                                {
                                                                    product?.productId?.discount !== 0 && <span className="text-md text-[#8B4513]">-{product?.productId?.discount}%</span>
                                                                }
                                                                <span className="text-md text-[#8B4513]">₹ {product?.productId?.price}</span>
                                                                {/* <span className="text-xs">
                                                                    MRP: <span className="line-through">₹ {product?.productId?.original_price}</span>
                                                                </span> */}
                                                            </div>
                                                        </div>

                                                        {/* Remove Icon */}
                                                        <div className="absolute top-2 right-2">
                                                            <button
                                                                onClick={() => handleRemoveFromWishlist(product?.productId?._id)} // Call the remove function
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                <svg
                                                                    className="h-5 w-5"
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
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </>
                    }
                </div>
            </Container>


            <div className='bg-[#F2F2F2]'>
                <Container>
                    <div className="mt-12 py-6 my-2">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-semibold">Just for You</h1>
                            <div className=" text-center">
                                <button
                                    onClick={() => navigate("/products")}
                                    type="button"
                                    className="uppercase rounded-sm border border-gray-200 px-5 py-2 text-xs font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                >
                                    View all
                                </button>
                            </div>
                        </div>
                        {loading ? (
                            <div className="text-center mt-8">
                                <div className="today_flash_sale">
                                    <section className="py-8 antialiased md:py-12">
                                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                            <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                                                {skeletonCards}
                                                {/* {skeletonCards} */}
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        ) : bestSelling?.length === 0 ? (
                            // <NoFound name={"Products"} />
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
                                                            {/* <div className="flex items-center flex-col justify-end gap-0 absolute top-0 right-1">
                                                                <button
                                                                    onClick={() => addToWishlist(product._id)}
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
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs">{product.category}</span>
                                                            <a
                                                                href="#"
                                                                className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                            >
                                                                {product.name}
                                                            </a>
                                                            <div className="flex gap-3 items-center my-2">
                                                                {
                                                                    product.discount !== 0 && <span className="text-md text-[#8B4513]">-{product.discount}%</span>
                                                                }
                                                                <span className="text-md text-[#8B4513]">{product.price}</span>
                                                                <span className="text-xs">
                                                                    MRP: <span className="line-through">{product.original_price}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {/* <div className="w-full text-center">
                                            <button
                                                onClick={() => navigate("/products")}
                                                type="button"
                                                className="rounded-sm border border-gray-200 px-5 py-2 text-sm font-normal focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 text-white bg-[#8B4513]"
                                            >
                                                View All Products
                                            </button>
                                        </div> */}
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Wishlist
