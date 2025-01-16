/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { API_URL } from "../../constants";
import emptyCartLogo from "../../assets/images/empty-cart.png"

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${API_URL}/cart/cart-details`, config);
                setCartItems(response.data.cart.items);  // Assuming the cart structure has a field `items`
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const calculateCart = (items) => {
        let subtotal = 0;
        items.forEach(item => {
            const itemPrice = item.productId.discount
                ? item.productId.original_price - (item.productId.original_price * (item.productId.discount.percent / 100))
                : item.productId.original_price;

            subtotal += itemPrice * item.quantity; // Add price for the quantity of the item
        });

        setSubtotal(subtotal);
        setTotal(subtotal);
    };

    const updateCart = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
    };

    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCartItems);
        calculateCart(updatedCartItems)
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            calculateCart(cartItems);
        }
    }, [cartItems]);

    return (
        <Container>
            <div className="container mx-auto p-4 my-6">
                <nav className="text-sm mb-6">
                    <a href="" className="text-gray-500">Home</a> /
                    <a href="" className="text-gray-500"> Men T-Shirt</a> /
                    <span className="text-gray-800 font-semibold"> Your Cart</span>
                </nav>
                {
                    cartItems?.length !== 0 ?
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-6">

                                    {
                                        cartItems.map((item, index) => (
                                            <CartItem
                                                key={index}
                                                item={item}
                                                updateCart={updateCart}
                                                removeItem={removeItem}
                                            />
                                        ))
                                    }

                                </div>

                                <CartSummary
                                    subtotal={subtotal}
                                    total={total}
                                    promoMessage="Hooray! You have a promo code!"
                                />

                            </div>
                        </> :
                        <>
                            <div className="flex items-center justify-center flex-col">
                                <img src={emptyCartLogo} className="h-64" alt="Empty cart" />
                                <p className="mt-4 text-gray-600 text-lg">Your cart is currently empty. Start shopping now!</p>
                            </div>
                        </>
                }

            </div>
        </Container>
    );
};

export default Cart;
