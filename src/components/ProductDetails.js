/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from '@mui/material'
import React from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

const ProductDetails = () => {
    return (
        <Container>
            <div className="container mx-auto p-4 my-6">
                <nav className="text-sm mb-4">
                    <a href="" className="text-gray-500">Home</a> /
                    <a href="" className="text-gray-500"> Men T-Shirt</a> /
                    <span className="text-gray-800 font-semibold"> White casual T-Shirt</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                        <div className="border rounded-lg overflow-hidden mb-4">
                            <img
                                src="https://www.nicobar.com/cdn/shop/products/2_fcfd8180-15bf-4ab6-9a35-5d4e640cc1e1.jpg?v=1709801344"
                                alt="White Casual T-Shirt"
                                className="w-full object-cover h-1/2"
                            />
                        </div>
                        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                            <img
                                src="https://www.nicobar.com/cdn/shop/products/2_fcfd8180-15bf-4ab6-9a35-5d4e640cc1e1.jpg?v=1709801344"
                                alt="Thumbnail"
                                className="border rounded-lg w-full cursor-pointer h-32"
                            />
                            <img
                                src="https://www.nicobar.com/cdn/shop/products/2_fcfd8180-15bf-4ab6-9a35-5d4e640cc1e1.jpg?v=1709801344"
                                alt="Thumbnail"
                                className="border rounded-lg w-full cursor-pointer h-32"
                            />
                            <img
                                src="https://www.nicobar.com/cdn/shop/products/2_fcfd8180-15bf-4ab6-9a35-5d4e640cc1e1.jpg?v=1709801344"
                                alt="Thumbnail"
                                className="border rounded-lg w-full cursor-pointer h-32"
                            />
                            <img
                                src="https://www.nicobar.com/cdn/shop/products/2_fcfd8180-15bf-4ab6-9a35-5d4e640cc1e1.jpg?v=1709801344"
                                alt="Thumbnail"
                                className="border rounded-lg w-full cursor-pointer h-32"
                            />
                            <img
                                src="https://www.nicobar.com/cdn/shop/products/2_fcfd8180-15bf-4ab6-9a35-5d4e640cc1e1.jpg?v=1709801344"
                                alt="Thumbnail"
                                className="border rounded-lg w-full cursor-pointer h-32"
                            />
                        </div>
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
                        <h2 className="text-sm text-gray-600">MEN T-SHIRT</h2>
                        <h1 className="text-2xl font-bold mb-2 font-mono">WHITE CASUAL T-SHIRT</h1>
                        <div className="flex flex-col gap-4 mb-4">
                            <div className='flex  gap-2'>
                                <p className="line-through text-gray-500 text-xl">$200.00</p>
                                <div className="text-white  text-sm  rounded-full bg-[#E90000] px-2 py-0.5">50%</div>
                            </div>
                            <div>
                                <p className="text-2xl font-medium text-[#8B4513]">$100.00</p>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Lorem ipsum dolor sit amet consectetur. Metus nibh dictum vel enim sollicitudin. Metus nibh a leo orci aliquam diam. Metus pretium purus augue malesuada metus. Nec suspendisse proin aliquam dolor ipsum. Quis id enim viverra et.
                            Lorem ipsum dolor sit amet consectetur. Metus nibh dictum vel enim sollicitudin. Metus nibh a leo orci aliquam diam. Metus pretium purus augue malesuada metus. Nec suspendisse proin aliquam dolor ipsum. Quis id enim viverra et.
                        </p>
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">Size:</p>
                            <div className="grid grid-cols-4 lg:grid-cols-6 items-center gap-4">
                                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">XS</button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">S</button>
                                <button className="px-4 py-2 border rounded-lg bg-[#8B4513] text-white">M</button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">L</button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">XL</button>
                                <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">XXL</button>
                            </div>
                        </div>
                        <p className="text-gray-600 ">Quantity:</p>
                        <div className='flex gap-4 my-2 items-center'>
                            <div>
                                <div className="flex items-center gap-4">
                                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">-</button>
                                    <p className="text-gray-800">1</p>
                                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">+</button>
                                </div>
                            </div>
                            <button className="w-full bg-[#8B4513] text-white py-3 rounded-lg ">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default ProductDetails
