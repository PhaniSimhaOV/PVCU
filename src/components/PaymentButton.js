import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const PaymentButton = ({ totalAmount, cartItems }) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        navigate("/checkout");
    };
    return (
        <button
            className="w-full bg-[#8B4513] text-white py-2 rounded my-4"
            onClick={handleNavigate}
        >
            {"Proceed to Checkout"}

        </button>
    );
};

export default PaymentButton;
