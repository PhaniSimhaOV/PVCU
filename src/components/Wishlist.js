/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL, IMAGE_URL } from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import NoFound from "../components/common/NoFound"
import { Link, useNavigate } from 'react-router-dom';
import loadingImage from "../assets/images/2.gif"
import { ShoppingBag } from '@mui/icons-material';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingBest, setBestLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true); // New state for initial page loading
    const [isAdded, setIsAdded] = useState(false); // To track if the product is already added


    const [bestSelling, setBestSelling] = useState([])


    const getWishlistData = async () => {
        setPageLoading(true); // Start loading
        const token = localStorage.getItem('token');

        try {
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
            setWishlist(data); // Set the wishlist data here
            return data;
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            return []; // Return empty array in case of error
        } finally {
            setPageLoading(false); // End loading
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
            toast.success('Product removed from wishlist');
            const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            console.log(currentWishlist)
            const updatedWishlist = currentWishlist.filter(
                (product) => product?.id !== productId
            );

            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            setWishlist((prev) => prev.filter((product) => product?.productId?._id !== productId));
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    const addToCart = async (product) => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to add items to your cart');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Try fetching cart details
            let cartItems = [];
            try {
                const cartResponse = await axios.get(`${API_URL}/cart/cart-details`, config);
                cartItems = cartResponse.data.cart.items; // Get items if cart exists
            } catch (error) {
                // If the cart is not found (404 error), initialize cartItems as an empty array
                if (error.response?.status === 404) {
                    console.log('Cart not found. Creating a new cart...');
                    cartItems = []; // No items, create a new cart
                } else {
                    throw error; // Re-throw the error if it's something else (network issues, etc.)
                }
            }

            // Check if the product is already in the cart
            const isProductInCart = cartItems.some(
                (item) => item.productId?._id === product?.productId?._id
            );

            if (isProductInCart) {
                setIsAdded(true);
                toast.error('This product is already in your cart');
                return;
            }

            // Add product to the cart
            await axios.post(
                `${API_URL}/cart/add`,
                {
                    productId: product?.productId?._id,
                    size: product?.productId?.sizes[0]?.size,
                    quantity: 1,
                },
                config
            );

            toast.success('Item added to cart successfully');
            handleRemoveFromWishlist(product?.productId?._id) 
            setIsAdded(true); // Mark as added after successful addition
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
            toast.error('Error adding item to cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWishlistData(); // Fetch wishlist from API (now handles loading state internally)
    }, []);


    // const handleMoveToBag = async () => {
    //     setLoading(true);
    //     const token = localStorage.getItem('token');

    //     try {
    //         await axios.post(
    //             `${API_URL}/wishlist/move-to-cart`,
    //             {},
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         toast.success('All items moved to the cart successfully!');
    //         setWishlist([])
    //     } catch (err) {
    //         console.error('Error:', err);
    //         toast.error('Failed to move items to cart');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const getBestSellingProducts = async () => {
        setBestLoading(true)

        try {
            const response = await axios.get(`${API_URL}/products?category=justForYou`)
            setBestSelling(response.data.products)
        } catch (e) {
            console.log(e)
        } finally {
            setBestLoading(false)
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        getBestSellingProducts()
    }, [])

    if (pageLoading) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center h-screen">
                    <img
                        src={loadingImage}
                        alt="Loading..."
                    />
                </div>
            </Container>
        );
    }

    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Container>
                <div className={`mt-16 my-2 ${wishlist?.length === 0 ? 'h-96' : ''}`}>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">Wishlist ({wishlist?.length})</h1>
                        {/* {
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
                        } */}
                    </div>
                    {
                        wishlist?.length === 0 ? <>
                            <NoFound name={"Wishlist"} />

                        </> : <>

                            <div className="today_flash_sale">
                                <section className="py-8 antialiased md:py-12">
                                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {wishlist.map((product) => (
                                                <div
                                                    key={product?.productId?.id || Math.random()}
                                                    className="flex-none w-64 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative transition-all duration-300 ease-in-out transform hover:scale-105"
                                                >
                                                    <div className="w-full">
                                                        <Link to={`/details/${product?.productId?._id}`}>
                                                            <img
                                                                className="w-full object-cover  dark:hidden"
                                                                src={`${IMAGE_URL}/${product?.productId?.imageUrl}`}
                                                                alt={product?.productId?.name}
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="pt-6 p-3">

                                                        <div className="flex flex-col gap-1">
                                                            <a
                                                                href="#"
                                                                className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                            >
                                                                {product?.productId?.name}
                                                            </a>
                                                            <div className="flex gap-3 items-center">
                                                                {
                                                                    product?.productId?.discount !== 0 && <span className="text-md text-[#8B4513]">-{product?.productId?.discount}%</span>
                                                                }
                                                                <span className="text-md text-[#8B4513]">₹ {product?.productId?.price}</span>

                                                            </div>
                                                        </div>

                                                        {/* Remove Icon */}
                                                        <div className="absolute top-2 left-2">
                                                            <button
                                                                onClick={() => handleRemoveFromWishlist(product?.productId?._id)} // Call the remove function
                                                                className="bg-[#AB5A25] rounded-full p-1 text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#91481F]"
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
                                                        <div className="absolute top-2 right-2">
                                                            <button
                                                                onClick={() => { addToCart(product)}} // Call the remove function
                                                                className="bg-[#AB5A25] rounded-full p-1 text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#91481F]"
                                                            >
                                                                <ShoppingBag />
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
        </div>
    )
}

export default Wishlist