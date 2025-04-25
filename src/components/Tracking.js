import React, { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import {
    LocalShipping,
    CheckCircle,
    Schedule,
    DirectionsCar,
    Assignment,
    Payment,
    Home,
    Business,
    Print,
    Refresh,
    Sync,
} from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../constants";
import { useParams } from "react-router-dom";
import moment from "moment";
import { IconButton } from "@mui/material";

const Tracking = () => {
    const { id } = useParams()
    const [order, setOrder] = useState({})
    const getOrders = async () => {

        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${API_URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const foundOrder = response.data.order.find(o => o.razorpay_order_id === id)
            setOrder(foundOrder)
        } catch (e) {
            console.error('Error fetching orders:', e)
        }
    }
    const [trackingInfo, setTrackingInfo] = useState(null)

    const fetchTrackingInfo = async () => {
        try {
            const response = await axios.get(`${API_URL}/orders/track/${id}`);
            const shipment = response.data.ShipmentData[0];
            setTrackingInfo(shipment);
        } catch (error) {
            console.error("Error fetching tracking info", error);
        }
    };

    useEffect(() => {
        getOrders()
        fetchTrackingInfo()
    }, [])
    console.log("trackingInfo", trackingInfo)
    return (
        <div className="max-w-8xl mx-auto p-4 bg-white rounded-lg shadow-sm py-16">
            <h1 className="text-2xl font-bold mb-6">Order Details</h1>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section */}
                <div className="md:w-1/2 space-y-6">
                    {/* Delivery Details */}
                    <div className="border border-gray-200 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                        <div className="flex items-start mb-4">
                            <Business className="text-gray-500 mr-3 mt-1" />
                            <div>
                                <p className="font-medium">Pickup Address</p>
                                <p className="text-gray-600">
                                    Sree fabrics
                                    4-111
                                    1st godown,
                                    Old PSR Poultry,
                                    Vissakoderu Village,
                                    Palakoderu Mandal
                                    West Godavari district
                                    ANDHRA PADESH 534244
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Home className="text-gray-500 mr-3 mt-1" />
                            <div>
                                <p className="font-medium">Delivery Address</p>
                                <p className="text-gray-600">
                                    {order?.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="border border-gray-200 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                        <div className="flex items-center">
                            <Payment className="text-gray-500 mr-3" />
                            <div>
                                <p className="font-medium">Payment Status</p>
                                <p className="text-gray-600">{order?.paymentStatus}</p>
                            </div>
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="border border-gray-200 p-4 rounded-md">
                        <h3 className="text-md font-semibold mb-4">Billing Address</h3>
                        <p className="text-gray-600 mb-4">
                            {order?.address}<br />

                        </p>

                        <table className="w-full mb-2">
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-2">Sub Total</td>
                                    <td className="py-2 text-right">{order?.items?.length} Item(s)</td>
                                    <td className="py-2 text-right">₹{order?.totalPrice - 100}</td>
                                </tr>

                                <tr>
                                    <td className="py-2">Delivery Charges</td>
                                    <td className="py-2 text-right"></td>
                                    <td className="py-2 text-right">₹100</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className=" py-4 rounded-md">
                            <h3 className="text-lg font-bold ">
                                Total Amount paid<br />
                                <span className="text-xl">₹{order?.totalPrice}</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 space-y-6">


                    <div className="border border-gray-200 p-4 rounded-md">
                        <h3 className="text-md font-semibold mb-2">Order No</h3>
                        <p className="text-gray-600 mb-4">{order?.razorpay_order_id}</p>

                        <h4 className="text-sm font-medium mb-1">Order Details</h4>
                        <ul className="text-sm list-disc">
                            {
                                order?.items?.map((ord, index) => (
                                    <li key={index} className="flex flex-col sm:flex-row sm:items-center sm:gap-4 ml-2">
                                        -<div><span className="font-semibold">Name:</span> {ord?.name}</div>
                                        <div><span className="font-semibold">Size:</span> {ord?.size}</div>
                                        <div><span className="font-semibold">Qty:</span> {ord?.quantity}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="border border-gray-200 p-4 rounded-md">
                        <h6>Track order via link - &nbsp;
                            <a
                                className="text-blue-600"
                                href={`https://www.delhivery.com/track-v2/package/${trackingInfo?.Shipment?.AWB}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                {`https://www.delhivery.com/track-v2/package/${trackingInfo?.Shipment?.AWB}`}
                            </a>
                        </h6>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Tracking;