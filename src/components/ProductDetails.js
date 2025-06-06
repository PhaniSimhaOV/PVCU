/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Container } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import loadingImage from "../assets/images/2.gif"
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import oversized from "../assets/images/Oversized-FIT.jpg"

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
    const [expandedPanels, setExpandedPanels] = useState({
        panel1: true,
        panel2: false,
    });

    const handleAccordionToggle = (panel) => (event, isExpanded) => {
        setExpandedPanels((prev) => ({
            ...prev,
            [panel]: isExpanded,
        }));
    };
    const chartRef = useRef(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (chartRef.current && !chartRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const sizeLabelMap = {
        S: "8-9",
        M: "10-12",
        L: "12-13",
        XL: "14",
    };
    // const filteredSizes = productSize?.sizes?.filter((sizeOption) => {
    //     let targetSize = sizeOption?.size;

    //     if (product?.gender === "Kids") {
    //         targetSize = sizeLabelMap[sizeOption?.size] || sizeOption?.size;
    //     }

    //     const matchingProductSize = product?.sizes?.find(
    //         (pSize) => pSize?.size === targetSize
    //     );

    //     const hasStock = matchingProductSize && matchingProductSize?.stock > 0;
    //     const excludeXXLForKids = !(product?.gender === "Kids" && sizeOption?.size === "XXL");
    //     return hasStock && excludeXXLForKids;
    // });
    const filteredSizes = productSize?.sizes?.filter(sizeOption => {
        if (product?.gender === "Kids" && sizeOption.size === "XXL") {
            return false;
        }
        return true;
    });
    return (
        <Container>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                dataLoading ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <img
                            src={loadingImage}
                            alt="Loading..."
                        />
                    </div>

                ) : (
                    <div className="container mx-auto p-4 my-10">
                        <nav className="text-sm mb-4">
                            <a href="/" className="text-gray-500">Home</a> /
                            <span className="text-gray-800 font-semibold"> {product?.name}</span>
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
                                                className="border rounded-sm w-full object-cover h-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
                                                style={{ display: isLoaded ? 'block' : 'none' }}
                                            />
                                        );
                                    })}
                                </div>




                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold">{product?.name}</h1>
                                <span className='text-xs text-gray-400'>T-Shirt</span>
                                <hr />
                                {/* <div className="flex flex-col gap-4 mb-4">

                                    <div className='mt-2'>
                                        <p className="text-xl font-medium text-[#8B4513]">₹ {product?.original_price}</p>
                                    </div>
                                </div> */}
                                <div className="flex flex-col gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xl font-medium text-[#8B4513]">₹ {product.original_price}</p>
                                        {/* <p className="text-sm text-gray-500 line-through">₹{product.original_price + 100}</p> */}
                                        {/* <p className="text-sm text-red-500">₹100 OFF</p> */}
                                    </div>
                                    <p className="text-xs text-gray-500">MRP incl. of all taxes</p>
                                </div>
                                {/* Size Selection */}


                                {productSize.sizes?.length > 0 && (
                                    <>
                                        <p className="text-gray-800 mb-2 font-semibold">
                                            <div>
                                                Please select a size :{" "}
                                                <span onClick={() => setOpen(true)} className="text-blue-600 cursor-pointer inline-flex items-center">
                                                    Size Chart <InfoOutlinedIcon fontSize="small" className="ml-1" />
                                                </span>

                                            </div>

                                            {open && <div ref={chartRef} style={{
                                                width: '450px', display: "flex", flexDirection: "column", gap: "10px", background: "rgb(172 91 36/var(--tw-bg-opacity,1))", color: "white"
                                            }}>
                                                {
                                                    product?.gender !== "Kids" && <table className="w-full border border-collapse mb-6">
                                                        <thead className="bg-[rgb(172 91 36/var(--tw-bg-opacity,1))
]">
                                                            <tr>
                                                                <th className="border p-2">Size</th>
                                                                <th className="border p-2">To Fit Your Chest Size</th>
                                                                <th className="border p-2">Chest (inches)</th>
                                                                <th className="border p-2">Length (inches)</th>
                                                                <th className="border p-2">Shoulder (inches)</th>
                                                                <th className="border p-2">Neck (inches)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border p-2">Small</td>
                                                                <td className="border p-2">38</td>

                                                                <td className="border p-2">44</td>
                                                                <td className="border p-2">27</td>
                                                                <td className="border p-2">21</td>
                                                                <td className="border p-2">21</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">Medium</td>
                                                                <td className="border p-2">40</td>

                                                                <td className="border p-2">46</td>
                                                                <td className="border p-2">27.5</td>
                                                                <td className="border p-2">22</td>
                                                                <td className="border p-2">21</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">Large</td>
                                                                <td className="border p-2">42</td>

                                                                <td className="border p-2">48</td>
                                                                <td className="border p-2">30</td>
                                                                <td className="border p-2">23</td>
                                                                <td className="border p-2">21</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">X Large</td>
                                                                <td className="border p-2">44</td>

                                                                <td className="border p-2">50</td>
                                                                <td className="border p-2">30.5</td>
                                                                <td className="border p-2">24</td>
                                                                <td className="border p-2">22</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">XX Large</td>
                                                                <td className="border p-2">46</td>

                                                                <td className="border p-2">52</td>
                                                                <td className="border p-2">31</td>
                                                                <td className="border p-2">25</td>
                                                                <td className="border p-2">22</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">XXX Large</td>
                                                                <td className="border p-2">48</td>

                                                                <td className="border p-2">54</td>
                                                                <td className="border p-2">31</td>
                                                                <td className="border p-2">26</td>
                                                                <td className="border p-2">22</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                }
                                                {
                                                    product?.gender === "Kids" && <table className="w-full border border-collapse" style={{ background: "rgb(172 91 36/var(--tw-bg-opacity,1))", color: "white" }}>
                                                        <thead >
                                                            <tr>
                                                                <th className="border p-2">Size</th>
                                                                <th className="border p-2">Age</th>
                                                                <th className="border p-2">Chest (in)</th>
                                                                <th className="border p-2">Length (in)</th>
                                                                <th className="border p-2">Shoulder (in)</th>
                                                                <th className="border p-2">Sleeve Length (in)</th>
                                                                <th className="border p-2">Neck (in)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border p-2">Small</td>
                                                                <td className="border p-2">8-9</td>
                                                                <td className="border p-2">26-28</td>
                                                                <td className="border p-2">20-21</td>
                                                                <td className="border p-2">12-13</td>
                                                                <td className="border p-2">6</td>
                                                                <td className="border p-2">12-13</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">Medium</td>
                                                                <td className="border p-2">10-11</td>
                                                                <td className="border p-2">28-30</td>
                                                                <td className="border p-2">22-23</td>
                                                                <td className="border p-2">13-14</td>
                                                                <td className="border p-2">6.5</td>
                                                                <td className="border p-2">13-14</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">Large</td>
                                                                <td className="border p-2">12-13</td>
                                                                <td className="border p-2">30-32</td>
                                                                <td className="border p-2">24-25</td>
                                                                <td className="border p-2">14-15</td>
                                                                <td className="border p-2">7</td>
                                                                <td className="border p-2">14-15</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border p-2">X Large</td>
                                                                <td className="border p-2">14</td>
                                                                <td className="border p-2">32-34</td>
                                                                <td className="border p-2">26-27</td>
                                                                <td className="border p-2">15-16</td>
                                                                <td className="border p-2">7.5</td>
                                                                <td className="border p-2">15-16</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                }
                                            </div>}



                                        </p>
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center gap-4 mt-4">
                                            {filteredSizes?.map((sizeOption) => {
                                                let targetSize = sizeOption.size;

                                                if (product?.gender === "Kids") {
                                                    targetSize = sizeLabelMap[sizeOption.size] || sizeOption.size;
                                                }

                                                const matchingProductSize = product?.sizes?.find(
                                                    (pSize) => pSize.size === targetSize
                                                );

                                                const hasStock = matchingProductSize && matchingProductSize.stock > 0;
                                                const isDisabled = !hasStock;

                                                const displayLabel = product.gender === "Kids"
                                                    ? (sizeLabelMap[sizeOption.size] || sizeOption.size)
                                                    : sizeOption.size;


                                                return (
                                                    <button
                                                        title={isDisabled ? "Size not available" : ""}
                                                        key={sizeOption.size}
                                                        disabled={isDisabled}
                                                        className={`px-4 py-2 border rounded-lg
          ${size === sizeOption.size ? "bg-[#8B4513] text-white" : "hover:bg-gray-100"}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
                                                        onClick={() => {
                                                            if (!isDisabled) {
                                                                console.log("Selected size:", sizeOption);
                                                                setSize(sizeOption.size);
                                                            }
                                                        }}
                                                    >
                                                        {displayLabel}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}


                                <div className="flex items-center gap-2 mt-8">
                                    <p className="text-sm text-gray-800">Quantity:</p>
                                    <select
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="border border-[#148c8d] rounded-md px-2 py-1"
                                    >
                                        {[...Array(10).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    <button onClick={addToCart} className="px-8 bg-[#8B4513] text-white py-3 w-full lg:w-fit">
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            'ADD TO CART'
                                        )}
                                    </button>
                                    <button
                                        className="px-4 py-3 border border-[#148c8d] text-[#148c8d] flex items-center gap-2 w-full lg:w-fit"
                                        onClick={() =>
                                            isProductInWishlist(product._id)
                                                ? handleRemoveFromWishlist(product._id)
                                                : addToWishlist(product._id)
                                        }
                                    >
                                        {
                                            isProductInWishlist(product._id) ?
                                                <FavoriteIcon fontSize="small" />
                                                : <FavoriteBorderRoundedIcon fontSize="small" />
                                        }

                                        ADD TO WISHLIST
                                    </button>
                                </div>
                                <div className="mb-6 mt-4 flex items-center gap-4">
                                    <p className="text-sm text-gray-800 mb-0">Share</p>
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 text-gray-600 hover:text-gray-900"
                                            onClick={() => window.open('https://youtube.com/@thepvcu?si=VFLyQROR_UfUWfJl', '_blank')}
                                        >
                                            <YouTubeIcon sx={{ fontSize: "27px" }} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-600 hover:text-gray-900"
                                            onClick={() => window.open('https://www.facebook.com/ThePVCU', '_blank')}
                                        >
                                            <FacebookIcon sx={{ fontSize: "27px" }} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-600 hover:text-gray-900"
                                            onClick={() => window.open('https://twitter.com/ThePVCU', '_blank')}
                                        >
                                            <XIcon fontSize="medium" />
                                        </button>
                                        <button
                                            className="p-2 text-gray-600 hover:text-gray-900"
                                            onClick={() => window.open('https://www.instagram.com/thepvcu', '_blank')}
                                        >
                                            <InstagramIcon fontSize="medium" />
                                        </button>
                                    </div>
                                </div>

                                {/* <div className="mb-6">
                                    <p className="text-sm font-medium text-gray-800 mb-2">Delivery Details</p>
                                    <div className="relative w-full max-w-xl">
                                        <input
                                            type="text"
                                            placeholder="Enter Pincode"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-20 text-sm"
                                        />
                                        <button className="absolute right-1 top-1 bottom-1 px-4 text-sm bg-white text-[#148c8d] font-medium rounded-md">
                                            CHECK
                                        </button>
                                    </div>
                                </div> */}

                                {/* <div className="flex items-start gap-2 p-3 border rounded-md mb-6">
                                    <div className="mt-1"><UpdateDisabledRoundedIcon /></div>
                                    <div>
                                        <p className="text-sm text-gray-800">This product is eligible for return or exchange under our 30-day return or exchange policy.</p>
                                        <p className="text-xs text-gray-500">No questions asked!</p>
                                    </div>
                                </div> */}



                                {/* <button onClick={addToCart} className="w-full bg-[#8B4513] text-white py-3 rounded-lg ">
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            'ADD TO CART'
                                        )}
                                    </button> */}

                                <div className="mt-8">
                                    <Accordion
                                        expanded={expandedPanels.panel1}
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
                                        expanded={expandedPanels.panel2}
                                        onChange={handleAccordionToggle("panel2")}
                                        elevation={0}
                                        sx={{ boxShadow: "none", border: "1px solid #ddd" }}
                                    >
                                        <AccordionSummary sx={{ fontWeight: "bold" }} expandIcon={<ExpandMoreIcon />}>
                                            Product Details
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <img src={oversized} width={250} className='h-auto mx-auto mb-4' />
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

                                {/* <p className="text-gray-800 my-4 font-semibold">Quantity:</p>
                                <div className='flex gap-4 my-2 items-center'>
                                    <div>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleQuantityChange('decrease')} className="px-4 py-2 border rounded-lg hover:bg-gray-100">-</button>
                                            <p className="text-gray-800">{quantity}</p>
                                            <button onClick={() => handleQuantityChange('increase')} className="px-4 py-2 border rounded-lg hover:bg-gray-100">+</button>
                                        </div>
                                    </div>

                                </div> */}
                            </div>
                        </div>
                    </div >
                )}
        </Container >
    )
}

export default ProductDetails;