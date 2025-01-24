/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Container, Pagination, Skeleton } from "@mui/material";
import { API_URL, IMAGE_URL } from "./constants";
import axios from "axios";
import NoFound from "./components/common/NoFound";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="border-b">
            <button
                className="w-full flex justify-between items-center py-3 px-4 text-left font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="text-xs">{isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</span>
            </button>
            {isOpen && <div className="px-4 pb-4">{children}</div>}
        </div>
    );
};

const FilterSidebar = () => {
    return (

        <div className="w-64 border-r my-8 pr-2 space-y-4">
            <h3 className="text-md bg-[#E8E1DE] p-2">CATEGORY</h3>
            <Accordion title="Woman">
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Dress</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Shirt</span>
                    </label>
                </div>
            </Accordion>

            <Accordion title="Man">
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Jackets</span>
                    </label>
                </div>
            </Accordion>

            <Accordion title="Price">
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>$100 - $1000</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>$1001 - $5000</span>
                    </label>
                </div>
            </Accordion>

            <Accordion title="Size">
                <div className="grid grid-cols-3 gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                            key={size}
                            className="px-4 py-1 border rounded-full hover:bg-gray-100"
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </Accordion>
        </div>
    );
};

const ProductGrid = ({ bestSelling, loading }) => {
    const addToWishlist = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `${API_URL}/wishlist/add`,
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Products added successfully to Wishlist")
            return response.data;
        } catch (error) {
            // toast.error(error.response.data.message)
            console.error('Error adding to wishlist', error);
            
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
    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="mx-4">

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
                    <NoFound name={"Products"} />
                ) : (
                    <div>
                        <section className="py-4 antialiased dark:bg-gray-900">
                            <div className="mx-auto max-w-screen-xl 2xl:px-0">
                                <div className="mb-4 grid gap-4 sm:grid-cols-1 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
                                    {bestSelling.slice(0, 8).map((product) => (
                                        <div
                                            key={product._id}
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
                                                    </div>
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
                                                        <span className="text-md text-[#8B4513]">-{product.discount}%</span>
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
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </>
    );
};

const AllProductsPage = () => {
    const [bestSelling, setBestSelling] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalProducts, setTotalProducts] = useState(0); // Total products from API
    const productsPerPage = 8; // Number of products per page

    const getBestSellingProducts = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${API_URL}/products?pagination=true&page=${page}&limit=${productsPerPage}`
            );
            setBestSelling(response.data.products);
            setTotalProducts(response.data.pagination.totalItems); // Assuming the API provides the total count
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        getBestSellingProducts(currentPage);
    }, [currentPage]);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <Container>
            <div className="container mx-auto p-4 my-6">
                <h2 className="text-3xl font-medium">All Products</h2>
                <div className="flex">
                    <FilterSidebar />
                    <div className="flex-1">
                        <div className="p-4 flex flex-col md:flex-row lg:flex-row justify-between items-center">
                            <p className="text-gray-500 mt-2">
                                {`Showing ${bestSelling.length} of ${totalProducts} results`}
                            </p>
                            <select className="border w-full md:w-ft lg:w-fit mt-4 p-2 rounded">
                                <option>Sort by: Avg Customer Reviews</option>
                            </select>
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
