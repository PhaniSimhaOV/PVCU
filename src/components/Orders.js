/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { API_URL, IMAGE_URL } from '../constants'
import axios from 'axios'
import NoFound from './common/NoFound'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [filterStatus, setFilterStatus] = useState("paid")

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
            console.error('Error fetching orders:', e)
        }
    }

    

    useEffect(() => {
        getOrders()
    }, [])

    const filteredOrders = filterStatus === "all" ? orders : orders.filter(o => o.paymentStatus === filterStatus)

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800'
            case 'failed':
                return 'bg-red-100 text-red-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <Container>
            <div className={`container mx-auto p-4 my-12 ${orders?.length === 0 ? 'h-96' : ''}`}>
                <nav className="text-sm mb-4">
                    <a href="" className="text-gray-500">Home</a> /
                    <a href="" className="text-gray-500 font-semibold"> Your Orders </a>
                </nav>

                <div className="mb-4">
                    <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 mr-2">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                {filteredOrders?.length === 0 ? (
                    <NoFound name={"Orders"} />
                ) : (
                    filteredOrders.map((order, index) => (
                        <div key={index} className='border my-4'>
                            <div className="mx-auto bg-white rounded-lg p-6">
                                {order?.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center space-x-4 mb-4">
                                        <img src={`${IMAGE_URL}/${item.productId?.imageUrl}`} alt="Product" className="w-20 h-24 rounded-lg" />
                                        <div>
                                            <h3 className="font-medium">{item.productId.name}</h3>
                                            <p className="text-gray-500">{item.quantity} × {item.productId.original_price}</p>
                                            <p className="text-sm text-gray-400">{item.productId.description || "No description available"}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-sm font-semibold">Delivery address</h3>
                                    <div className='my-2 bg-slate-100 px-4 py-2'>
                                        <p className="text-gray-600"><span className='font-semibold'>Address -</span> {order?.address}</p>
                                        <p className="text-gray-600"><span className='font-semibold'>Province -</span> {order?.province}</p>
                                        <p className="text-gray-600"><span className='font-semibold'>Phone -</span> {order.phone}</p>
                                        <p className="text-gray-600">
                                            <span className='font-semibold'>Order date -</span> {moment(order.orderDate).format('MMMM Do YYYY, h:mm A')}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t pt-4">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Subtotal</span>
                                        <span>₹ {order?.totalPrice}</span>
                                    </div>

                                    <div className="flex justify-between text-lg font-semibold mt-2">
                                        <span>Order total</span>
                                        <span className="text-indigo-600">₹ {order?.totalPrice}</span>
                                    </div>

                                    <div className={`flex justify-between text-lg font-semibold mt-2 px-2 py-1 rounded ${getStatusColor(order?.paymentStatus)}`}>
                                        <span>Payment Status</span>
                                        <span>{order?.paymentStatus}</span>
                                    </div>

                                    {
                                        <div className="flex justify-between text-lg font-semibold mt-2">
                                            <a href={`track-order/${order.razorpay_order_id}`}>
                                                <span className='text-sm text-blue-600 cursor-pointer'>Track Order</span>
                                            </a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Container>
    )
}

export default Orders
