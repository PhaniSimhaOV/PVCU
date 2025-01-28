/* eslint-disable jsx-a11y/anchor-is-valid */
import { CircularProgress, Container, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../constants';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState()
    const [size, setSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);

    const getProductsById = async () => {
        if (id) {
            try {
                const response = await axios.get(`${API_URL}/products/get/${id}`)
                const fetchedProduct = response.data.product;
                setProduct(response.data.product)
                setPreviewImage(`${IMAGE_URL}/${fetchedProduct.imageUrl}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        getProductsById()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const navigate = useNavigate()

    const [isAdded, setIsAdded] = useState(false); // To track if the product is already added

    const addToCart = async () => {
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
                    throw error; // Re-throw the error if it’s something else (network issues, etc.)
                }
            }
    
            // Check if the product is already in the cart
            const isProductInCart = cartItems.some(
                (item) => item.productId?._id === product._id && item.size === size
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
                    productId: product._id,
                    size: size,
                    quantity: quantity,
                },
                config
            );
    
            toast.success('Item added to cart successfully');
            setIsAdded(true); // Mark as added after successful addition
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
            toast.error('Error adding item to cart');
        } finally {
            setLoading(false);
        }
    };
    


    const handleQuantityChange = (action) => {
        setQuantity((prev) => (action === 'increase' ? prev + 1 : prev - 1 <= 0 ? 1 : prev - 1));
    };


    return (
        <Container>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                !product ? (
                    <div className="container mx-auto p-4 my-6">
                        {/* Navigation */}
                        <nav className="text-sm mb-4">
                            <Skeleton width="100px" />
                            <Skeleton width="100px" />
                            <Skeleton width="150px" />
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <div className="border rounded-lg overflow-hidden mb-4">
                                    <Skeleton variant="rectangular" width="100%" height="300px" />
                                </div>

                                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                                    <Skeleton variant="rectangular" width="100%" height="120px" />
                                    <Skeleton variant="rectangular" width="100%" height="120px" />
                                    <Skeleton variant="rectangular" width="100%" height="120px" />
                                    <Skeleton variant="rectangular" width="100%" height="120px" />
                                    <Skeleton variant="rectangular" width="100%" height="120px" />
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center gap-3 px-2 py-3 border bg-[#F2F2F2]">
                                        <Skeleton variant="circular" width={24} height={24} />
                                        <div className='flex flex-col'>
                                            <Skeleton width="100px" height="20px" />
                                            <Skeleton width="100px" height="14px" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-2 py-3 border bg-[#F2F2F2]">
                                        <Skeleton variant="circular" width={24} height={24} />
                                        <div className='flex flex-col'>
                                            <Skeleton width="100px" height="20px" />
                                            <Skeleton width="200px" height="14px" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Skeleton width="300px" height="30px" />
                                <div className="flex flex-col gap-4 mb-4">
                                    <div className='flex gap-2'>
                                        <Skeleton width="80px" height="30px" />
                                        <Skeleton variant="rectangular" width={50} height={30} />
                                    </div>
                                    <div>
                                        <Skeleton width="120px" height="30px" />
                                    </div>
                                </div>
                                <Skeleton width="300px" height="20px" />
                                <Skeleton width="400px" height="50px" />
                                <Skeleton width="100px" height="20px" />
                                <div className="grid grid-cols-4 lg:grid-cols-6 items-center gap-4">
                                    <Skeleton variant="rectangular" width={60} height={40} />
                                    <Skeleton variant="rectangular" width={60} height={40} />
                                    <Skeleton variant="rectangular" width={60} height={40} />
                                    <Skeleton variant="rectangular" width={60} height={40} />
                                    <Skeleton variant="rectangular" width={60} height={40} />
                                    <Skeleton variant="rectangular" width={60} height={40} />
                                </div>

                                {/* Quantity */}
                                <Skeleton width="100px" height="20px" />
                                <Skeleton width="200px" height="40px" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto p-4 my-6">
                        {/* Navigation */}
                        <nav className="text-sm mb-4">
                            <a href="" className="text-gray-500">Home</a> /
                            <a href="" className="text-gray-500"> Men T-Shirt</a> /
                            <span className="text-gray-800 font-semibold"> {product.name}</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <div className="border rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={`${previewImage}`}
                                        alt="White Casual T-Shirt"
                                        className="w-full object-cover h-1/2"
                                    />
                                </div>

                                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">

                                    {
                                        product?.slideImages?.map((sld, index) => (
                                            <img
                                                key={index}
                                                src={`${IMAGE_URL}/${sld}`}
                                                alt="Thumbnail"
                                                onClick={() => setPreviewImage(`${IMAGE_URL}/${sld}`)}
                                                className="border rounded-lg w-full cursor-pointer h-32"
                                            />
                                        ))

                                    }
                                </div>


                                {/* Shipping & Return info */}
                                <div className="mt-4">
                                    <div className="flex items-center gap-3 px-2 py-3 border bg-[#F2F2F2]">
                                        <LocalShippingOutlinedIcon />
                                        <div className='flex flex-col'>
                                            <p className="text-sm font-semibold">Free Delivery</p>
                                            <p className='text-xs'>Enter your postal code</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 px-2 py-3 border bg-[#F2F2F2]">
                                        <ReplayOutlinedIcon />
                                        <div className='flex flex-col'>
                                            <p className="text-sm font-semibold">Return Delivery</p>
                                            <p className="text-sm">Free 30-day returns. <a href="#" className="underline text-[#8B4513]">Details</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Product name */}
                                <h1 className="text-2xl font-bold mb-2 ">{product.name}</h1>
                                <div className="flex flex-col gap-4 mb-4">
                                    {/* Price and Discount */}
                                    <div className='flex gap-2'>
                                        <p className="line-through text-gray-500 text-xl">${product.price}</p>
                                        <div className="text-white  text-sm  rounded-full bg-[#8B4513] px-2 py-0.5">{product.discount}%</div>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-medium text-[#8B4513]">${product.original_price}</p>
                                    </div>
                                </div>
                                {/* Product Description */}
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                {/* Size Selection */}
                                {
                                    product.sizes?.length > 0 && <>
                                        <p className="text-gray-600 mb-2">Size:</p>
                                        <div className="grid grid-cols-4 lg:grid-cols-6 items-center gap-4">
                                            {product.sizes.map((sizeOption) => (
                                                <button
                                                    key={sizeOption.size}
                                                    className={`px-4 py-2 border rounded-lg ${size === sizeOption.size ? 'bg-[#8B4513] text-white' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSize(sizeOption.size)}
                                                >
                                                    {sizeOption.size}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                }

                                {/* Quantity */}
                                <p className="text-gray-600 my-4">Quantity:</p>
                                <div className='flex gap-4 my-2 items-center'>
                                    <div>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleQuantityChange('decrease')} className="px-4 py-2 border rounded-lg hover:bg-gray-100">-</button>
                                            <p className="text-gray-800">{quantity}</p>
                                            <button onClick={() => handleQuantityChange('increase')} className="px-4 py-2 border rounded-lg hover:bg-gray-100">+</button>
                                        </div>
                                    </div>
                                    <button onClick={addToCart} className="w-full bg-[#8B4513] text-white py-3 rounded-lg ">
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            'ADD TO CART'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </Container>
    )
}

export default ProductDetails;
