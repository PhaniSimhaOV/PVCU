/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { Container } from "@mui/material";


const Cart = () => {
    const cartItems = [
        {
            image: "https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg",
            title: "White Casual T-Shirt",
            price: 100,
            notes: "",
        },
        {
            image: "https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg",
            title: "TSS Originals: The OGS",
            price: 100,
            notes: "",
        },
        {
            image: "https://m.media-amazon.com/images/I/61eJOdWT34L._SX569_.jpg",
            title: "TSS Originals: The OGS",
            price: 125,
            discount: { original: 250, percent: 25 },
            notes: "",
        },
    ];

    return (
        <Container>
            <div className="container mx-auto p-4 my-6">
                <nav className="text-sm mb-6">
                    <a href="" className="text-gray-500">Home</a> /
                    <a href="" className="text-gray-500"> Men T-Shirt</a> /
                    <span className="text-gray-800 font-semibold"> White casual T-Shirt</span>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="space-y-6">
                        {cartItems.map((item, index) => (
                            <CartItem key={index} {...item} />
                        ))}
                    </div>

                    <CartSummary
                        subtotal={300}
                        total={250}
                        promoMessage="Hooray! You have a promo code!"
                    />
                </div>
            </div>

        </Container>
    );
};

export default Cart;
