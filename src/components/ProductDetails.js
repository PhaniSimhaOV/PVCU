/* eslint-disable jsx-a11y/anchor-is-valid */
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState()
    const [size, setSize] = useState('S');
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const [previewImage, setPreviewImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(true); // State for initial data loading

    const getProductsById = async () => {
        if (id) {
            setDataLoading(true); // Start loading
            try {
                const response = await axios.get(`${API_URL}/products/get/${id}`)
                const fetchedProduct = response.data.product;
                setProduct(response.data.product)
                setPreviewImage(`${IMAGE_URL}/${fetchedProduct.imageUrl}`);
            } catch (err) {
                console.log(err);
                toast.error('Failed to load product details');
            } finally {
                setDataLoading(false); // End loading regardless of success/failure
            }
        }
    }

    useEffect(() => {
        getProductsById()
    }, [id])

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
                    throw error; // Re-throw the error if it's something else (network issues, etc.)
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

    const [isLoaded, setIsLoaded] = useState(false);

    const productSize = {
        sizes: [
            { size: 'S' },
            { size: 'M' },
            { size: 'L' },
            { size: 'XL' },
            { size: 'XXL' }
        ]
    };

    const [expandedPanel, setExpandedPanel] = useState("panel1"); // Default expanded

    const handleAccordionToggle = (panel) => (event, isExpanded) => {
        setExpandedPanel(isExpanded ? panel : false); // Toggle based on the clicked panel
    };
    return (
        <Container>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                dataLoading ? (
                    // Custom loader using the provided image
                    <div className="flex flex-col items-center justify-center h-screen">
                        <img 
                            src="https://up.yimg.com/ib/th?id=OIP.r5Ebw7k_mrU6PK5l5cALuQHaHa&pid=Api&rs=1&c=1&qlt=95&w=111&h=111" 
                            alt="Loading..." 
                            className="w-20 h-20"
                        />
                        <p className="mt-4 text-gray-600 font-medium">Loading product details...</p>
                    </div>
                ) : (
                    <div className="container mx-auto p-4 my-6">
                        <nav className="text-sm mb-4">
                            <a href="" className="text-gray-500">Home</a> /
                            <span className="text-gray-800 font-semibold"> {product.name}</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                                    {!isLoaded && product?.slideImages?.map((sld, index) => (
                                        <div key={`loading-${index}`} className="w-full h-96 bg-gray-200 animate-pulse rounded-sm"></div>
                                    ))}

                                    {product?.slideImages?.map((sld, index) => {
                                        const imageUrl = `${IMAGE_URL}/${sld}`;
                                        return (
                                            <img
                                                key={index}
                                                src={imageUrl}
                                                alt="Thumbnail"
                                                onLoad={() => setIsLoaded(true)}
                                                onClick={() => setPreviewImage(imageUrl)}
                                                className="border rounded-sm w-full object-cover h-full cursor-pointer transition-transform duration-300"
                                                style={{ display: isLoaded ? 'block' : 'none' }}
                                            />
                                        );
                                    })}
                                </div>


                                {/* Shipping & Return info */}
                                {/* <div className="mt-4">
                                    <div className="flex items-center gap-3 px-2 py-3 border bg-[#F2F2F2]">
                                        <LocalShippingOutlinedIcon />
                                        <div className='flex flex-col'>
                                            <p className="text-sm font-semibold">Free Delivery</p>
                                            <p className='text-xs'>Enter your postal code</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {/* Product name */}
                                <h1 className="text-2xl font-semibold">{product.name}</h1>
                                <span className='text-xs text-gray-400'>T-Shirt</span>
                                <div className="flex flex-col gap-4 mb-4">

                                    <div className='mt-2'>
                                        <p className="text-xl font-medium text-[#8B4513]">₹ {product.original_price}</p>
                                    </div>
                                </div>
                                {/* Size Selection */}
                                {
                                    productSize.sizes?.length > 0 && <>
                                        <p className="text-gray-800 mb-2 font-semibold">Please select a size:</p>
                                        <div className="grid grid-cols-4 lg:grid-cols-6 items-center gap-4 mt-4">
                                            {productSize.sizes.map((sizeOption) => (
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

                                <div className="mt-12">
                                    <Accordion
                                        expanded={expandedPanel === "panel1"}
                                        onChange={handleAccordionToggle("panel1")}
                                        elevation={0}
                                        sx={{ boxShadow: "none", border: "1px solid #ddd" }}
                                    >
                                        <AccordionSummary sx={{ fontWeight: "bold" }} expandIcon={<ExpandMoreIcon />}>
                                            Product Description
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <div className="text-gray-800 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
                                        <div className='mt-2 text-sm'>
                                        <span className='font-semibold'>Note - </span><span>The shades of this T-shirt might slightly vary from the picture.</span>
                                        </div>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion
                                        expanded={expandedPanel === "panel2"}
                                        onChange={handleAccordionToggle("panel2")}
                                        elevation={0}
                                        sx={{ boxShadow: "none", border: "1px solid #ddd" }}
                                    >
                                        <AccordionSummary sx={{ fontWeight: "bold" }} expandIcon={<ExpandMoreIcon />}>
                                            Product Details
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ul className="list-disc pl-5 text-gray-800">
                                                <li>100% Cotton Premium Exclusive of Decoration</li>
                                                <li>Made in India</li>
                                                <li>Machine wash cold with like colors</li>
                                                <li>Do not bleach</li>
                                                <li>Tumble dry low</li>
                                                <li>Warm iron</li>
                                                <li>Do not dry clean</li>
                                                <li>Use mild detergent</li>
                                                <li>Dry immediately after wash</li>
                                                <li>Do not iron on print, tapes & emblems</li>
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                                <p className="text-gray-800 my-4 font-semibold">Quantity:</p>
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