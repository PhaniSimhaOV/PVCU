import React from "react";
import PaymentButton from "../PaymentButton";

const CartSummary = ({ subtotal, total, promoMessage, cartItems }) => {
    const DELIVERY_CHARGE = 100;
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-8">
                <h6 className="text-2xl uppercase">Shopping Info</h6>
            </div>
            {promoMessage && (
                <div className="bg-[#EDE5E1] flex p-2 rounded mb-4">
                    {promoMessage} <button className="text-[#8B4513] underline ml-2">Use promo code</button>
                </div>
            )}
            <div className="text-lg space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}.00</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>₹{DELIVERY_CHARGE}.00</span>
                </div>
                <div className="flex justify-between font-semibold text-xl">
                    <span>Total</span>
                    <span>₹{total + DELIVERY_CHARGE}.00</span>
                </div>
            </div>
            <PaymentButton cartItems={cartItems} totalAmount={total} />
        </div>
    );
};

export default CartSummary;
