/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL, IMAGE_URL } from '../constants'
import axios from 'axios'
import NoFound from './common/NoFound'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const getOrders = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${API_URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setOrders(response.data.order)

        } catch (e) {

        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    return (
        <Container>


            <div className={`container mx-auto p-4 my-6 ${orders?.length === 0 ? 'h-96' : ''}`}>
                <nav className="text-sm mb-4">
                    <a href="" className="text-gray-500">Home</a> /
                    <a href="" className="text-gray-500 font-semibold"> Your Orders </a>
                </nav>
                {orders?.length === 0 ? <>
                    <NoFound name={"Orders"} />
                </> :
                    orders?.map((order, index) => (
                        <div className='border my-4'>
                            <div class="mx-auto bg-white  rounded-lg p-6">
                                {
                                    order?.items?.map((item, index) => (
                                        <div class="flex items-center space-x-4">
                                            <img src={`${IMAGE_URL}/${item.productId?.imageUrl}`} alt="Minimalist Wristwatch" class="w-20 mb-2 h-24 rounded-lg" />
                                            <div>
                                                <h3 className="font-medium">{item.productId.name}</h3>
                                                <p className="text-gray-500">
                                                    {item.quantity} × {item.productId.original_price}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {item.productId.description || "No description available"}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div class="mt-6 border-t pt-4">
                                    <h3 class="text-sm font-semibold">Delivery address</h3>
                                    <div className='my-2 bg-slate-100 px-4 py-2'>
                                        <p class="text-gray-600"><span className='font-semibold'>Address -</span>{order?.address}</p>
                                        <p class="text-gray-600"><span className='font-semibold'>Province -</span>{order?.province}</p>
                                        <p class="text-gray-600"><span className='font-semibold'>Phone -</span>{order.phone}</p>
                                        <p class="text-gray-600"><span className='font-semibold'>Order date -</span> {order.orderDate}</p>
                                    </div>

                                </div>

                                <div class="mt-6 border-t pt-4">
                                    <div class="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹ {order?.totalPrice}</span>
                                    </div>

                                    <div class="flex justify-between text-lg font-semibold mt-2">
                                        <span>Order total</span>
                                        <span class="text-indigo-600">₹ {order?.totalPrice}</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))
                }
            </div>

        </Container>
    )
}

export default Orders
