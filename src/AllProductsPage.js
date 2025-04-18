/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from "react";
import { Container, Pagination, Skeleton } from "@mui/material";
import { API_URL, IMAGE_URL } from "./constants";
import axios from "axios";
import NoFound from "./components/common/NoFound";
import debounce from 'lodash.debounce';

import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const Accordion = ({ title, children, isArrow = true }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b">
            <button
                className="w-full flex justify-between items-center py-2 px-4 text-left font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                {isArrow && <span className="text-xs">{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>}
            </button>
            {isOpen && <div className="px-4 pb-4">{children}</div>}
        </div>
    );
};

const FilterSidebar = ({ selectedSizes, setSelectedSizes, setPriceRange, priceRange, handleCategoryChange, selectedCategories, handleGenderChange, selectedGender }) => {
    const [filters, setFilters] = useState({})
    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };
    const handlePriceChange = (min, max) => {
        if (priceRange && priceRange.min === min && priceRange.max === max) {
            setPriceRange({ min: null, max: null });
        } else {
            setPriceRange({ min, max });
        }
    };

    const priceRanges = [
        { label: "₹ 100 - ₹ 1000", min: 100, max: 1000 },
        { label: "₹ 1001 - ₹ 5000", min: 1001, max: 5000 },
        { label: "₹ 5001 - ₹ 10000", min: 5001, max: 10000 },
        { label: "Above ₹ 10000", min: 15001, max: Infinity }
    ];
    const getFilters = async () => {
        try {
            const response = await axios.get(`${API_URL}/filters`)
            setFilters(response.data)

        } catch (e) { }
    }
    useEffect(() => {
        getFilters()
    }, [])

    return (

        <div className="w-64 border-r my-8 pr-2 space-y-4">
            {/* <h3 className="text-md bg-[#E8E1DE] p-2">CATEGORY</h3> */}
            <Accordion title="Gender">
                <div className="space-y-2">
                    {filters?.length > 0 && filters?.map((category) => (
                        category?.category === "gender" && category?.values.map((value) => (
                            <label key={value} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    onChange={() => handleGenderChange(value)}
                                    checked={selectedGender.includes(value)}
                                />
                                <span>{value}</span>
                            </label>
                        ))
                    ))}
                </div>
            </Accordion>

            <Accordion title="Categories">
                <div className="price space-y-2 h-32">
                    {filters?.length > 0 && filters?.map((category) => (
                        category?.category === "categories" && category?.values.map((value) => (
                            <label key={value} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded"
                                    onChange={() => handleCategoryChange(value)}
                                    checked={selectedCategories.includes(value)}
                                />
                                <span>{value}</span>
                            </label>
                        ))
                    ))}
                </div>
            </Accordion>

            {/* <Accordion title="Price">
                <div className="price space-y-2 h-32">
                    {priceRanges.map((range) => (
                        <label
                            key={`${range.min}-${range.max}`}
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => handlePriceChange(range.min, range.max)}
                        >
                            <input onChange={() => { }} type="checkbox" checked={priceRange && priceRange.min === range.min && priceRange.max === range.max} className="rounded" />
                            <span>{range.label}</span>
                        </label>
                    ))}
                </div>
            </Accordion> */}

            <Accordion title="Size">
                <div className="grid grid-cols-3 gap-2">

                    {filters?.length > 0 && filters?.map((category) => (
                        category?.category === "sizes" && category?.values?.map((size) => (
                            <button
                                key={size}
                                className={`px-4 py-1 border rounded-full ${selectedSizes.includes(size) ? "bg-gray-200" : "hover:bg-gray-100"
                                    }`}
                                onClick={() => toggleSize(size)}
                            >
                                {size}
                            </button>
                        ))
                    ))}
                </div>
            </Accordion>
        </div>
    );
};

const ProductGrid = React.memo(({ bestSelling, loading }) => {
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
            // toast.error(error.response.data.message)
            console.error('Error adding to wishlist', error);

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
                prev.filter((product) => product?.productId?._id !== productId)
            );
        } catch (error) {
            console.error("Error removing from wishlist", error);
        }
    };

    const skeletonCards = Array.from({ length: 5 }).map((_, index) => (
        <div
            key={index}
            className="flex-none w-48 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
        >
            <div className="h-72 w-full">
                <Skeleton variant="rectangular" height="100%" />
            </div>

        </div>
    ));
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="mx-4">

                {loading ? (
                    <div className="text-center">
                        <div className="today_flash_sale">
                            <section className="py-4 antialiased ">
                                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-sm"></div>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : bestSelling?.length === 0 ? (
                    <></>
                ) : (
                    <div>
                        <section className="py-4 antialiased dark:bg-gray-900">
                            <div className="mx-auto max-w-screen-xl 2xl:px-0">
                                <div className="mb-4 grid gap-4 sm:grid-cols-1 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
                                    {!isLoaded && bestSelling.slice(0, 8)?.map((sld, index) => (
                                        <div className="w-full h-96 bg-gray-200 animate-pulse rounded-sm"></div>
                                    ))}

                                    {bestSelling.slice(0, 8).map((product) => (
                                        <div
                                            key={product._id}
                                            className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 relative"
                                        >
                                            <div className="w-full">
                                                <a href={`/details/${product._id}`}>
                                                    <img
                                                        onLoad={() => setIsLoaded(true)}
                                                        className="w-full object-cover h-full dark:hidden"
                                                        src={`${IMAGE_URL}/${product.imageUrl}`}
                                                        alt={product.name}
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
                                                    {/* <span className="text-xs text-white">{product.rating}</span> */}
                                                </div>
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
                                                            <span className="sr-only">
                                                                {isProductInWishlist(product._id) ? "Remove from Favorites" : "Add to Favorites"}
                                                            </span>

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

                                                        {/* Tooltip */}
                                                        <span className="absolute top-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                            {isProductInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    {/* <span className="text-xs">{product.category}</span> */}
                                                    <a
                                                        href="#"
                                                        className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                                                    >
                                                        {product.name}
                                                    </a>
                                                    <div className="flex gap-3 items-center">
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
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </>
    );
});

const AllProductsPage = () => {
    const [bestSelling, setBestSelling] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalProducts, setTotalProducts] = useState(0); // Total products from API
    const [selectedSizes, setSelectedSizes] = useState([]);
    const productsPerPage = 8; // Number of products per page
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGender, setSelectedGender] = useState([]);
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        const gender = params.get('gender');
        if (category) {
            setSelectedCategories([category]);
        } else if (gender) {
            setSelectedGender([gender]);

        }
    }, [])

    const [priceRange, setPriceRange] = useState({ min: null, max: null });

    const getBestSellingProducts = debounce(async (page = 1) => {
        setLoading(true);
        try {
            const sizesQuery = selectedSizes.join(",");
            const categoriesQuery = selectedCategories.join(",");
            const genderQuery = selectedGender.join(",");
            const priceQuery = priceRange.min && priceRange.max ? `&price_min=${priceRange.min}&price_max=${priceRange.max}` : '';
            const response = await axios.get(
                `${API_URL}/products?pagination=true&page=${page}&limit=${productsPerPage}&sizes=${sizesQuery}${priceQuery}&product_category=${categoriesQuery}&gender=${genderQuery}`
            );
            setBestSelling(response.data.products);
            setTotalProducts(response.data.pagination.totalItems); // Assuming the API provides the total count
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }, 500);

    useEffect(() => {
        getBestSellingProducts(currentPage);
    }, [currentPage, selectedSizes, priceRange, selectedGender, selectedCategories]);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleCategoryChange = useCallback((category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    }, []);
    const handleGenderChange = useCallback((category) => {
        setSelectedGender((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    }, []);

    console.log("Selected", selectedGender)

    return (
        <Container>
            <div className="container mx-auto p-4 my-6">
                <h2 className="text-3xl font-medium">All Products</h2>
                <div className="flex">
                    <FilterSidebar
                        handleGenderChange={handleGenderChange}
                        selectedGender={selectedGender}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                        setPriceRange={setPriceRange}
                        priceRange={priceRange}
                        selectedSizes={selectedSizes}
                        setSelectedSizes={setSelectedSizes} />
                    <div className="flex-1">
                        <div className="p-4 flex flex-col md:flex-row lg:flex-row justify-between items-center">
                            <p className="text-gray-500 mt-2">
                                {`Showing ${bestSelling.length} of ${totalProducts} results`}
                            </p>
                            {/* <select className="border w-full md:w-ft lg:w-fit mt-4 p-2 rounded">
                                <option>Sort by: Avg Customer Reviews</option>
                            </select> */}
                        </div>
                        <ProductGrid loading={loading} bestSelling={bestSelling} />
                        {/* MUI Pagination Controls */}
                        <div className="flex justify-center mt-4">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                siblingCount={1}
                                boundaryCount={1}
                                showFirstButton // Show "First" button
                                showLastButton // Show "Last" button
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AllProductsPage;
