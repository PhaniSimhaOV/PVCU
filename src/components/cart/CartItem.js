import React, { useState } from "react";
import { IMAGE_URL, API_URL } from "../../constants";
import axios from "axios";

const CartItem = ({ item, updateCart, removeItem }) => {
    const { image, name, price, discount, quantity } = item;
    
    const [itemQuantity, setItemQuantity] = useState(quantity);

    const handleIncrease = () => {
        setItemQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            updateCart(item._id, newQuantity); // Update parent component with new quantity
            return newQuantity;
        });
    };

    const handleDecrease = () => {
        if (itemQuantity > 1) {
            setItemQuantity(prevQuantity => {
                const newQuantity = prevQuantity - 1;
                updateCart(item._id, newQuantity); // Update parent component with new quantity
                return newQuantity;
            });
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.delete(`${API_URL}/cart/${item._id}`, config);
            removeItem(item._id); 
        } catch (error) {
            console.error('Error deleting cart item:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <img
                src={`${IMAGE_URL}/${image}`}
                alt={name}
                className="w-24 h-full rounded-sm object-cover"
            />
            <div className="flex-grow">
                <h3 className="font-medium  mb-2  text-xl">{name}</h3>
                <div className="flex items-center space-x-2">
                    <span className="font-normal text-sm">₹ {price}</span>
                    {/* {discount && (
                        <>
                            <span className="line-through text-gray-400">₹{discount.original}</span>
                            <div className="text-white text-sm rounded-full bg-[#E90000] px-4 my-2 py-0.5">
                                {discount.percent}%
                            </div>
                        </>
                    )} */}
                </div>
                <div className="flex items-center justify-between">
                    <div className="mt-2 flex items-center border border-slate-500 w-fit space-x-2">
                        <button
                            onClick={handleDecrease}
                            className="px-2 py-1 rounded"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={itemQuantity}
                            className="w-12 text-center border-none rounded"
                            readOnly
                        />
                        <button
                            onClick={handleIncrease}
                            className="px-2 py-1 rounded"
                        >
                            +
                        </button>
                    </div>
                    <div>
                        <button onClick={handleDelete} className="text-slate-400 hover:text-red-800">Delete</button>
                    </div>
                </div>
                {/* <textarea
                    placeholder="Eg: Please double check before packing."
                    className="w-full my-2 border rounded-sm p-2 text-sm"
                /> */}
            </div>
        </div>
    );
};

export default CartItem;
