/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Container } from "@mui/material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";  // Import the custom hook from CartContext
import emptyCartLogo from "../../assets/images/empty-cart.png";

const Cart = () => {
    const { cartItems, subtotal, total, removeItem, updateCart } = useCart();  // Use the context to access cart data

    useEffect(() => {
        // Since cartItems are fetched and managed in CartContext, no need for fetching here
        // The context automatically updates the cart when needed
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
                    cartItems?.length !== 0 ? (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    {cartItems.map((item, index) => (
                                        <CartItem
                                            key={index}
                                            item={item}
                                            updateCart={updateCart}  // Pass the updateCart function from context
                                            removeItem={removeItem}  // Pass the removeItem function from context
                                        />
                                    ))}
                                </div>

                                <CartSummary
                                    subtotal={subtotal}  // Use subtotal from context
                                    total={total}  // Use total from context
                                    cartItems={cartItems}  // Use cartItems from context
                                    promoMessage="Hooray! You have a promo code!"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-center flex-col">
                                <img src={emptyCartLogo} className="h-64" alt="Empty cart" />
                                <p className="mt-4 text-gray-600 text-lg">Your cart is currently empty. Start shopping now!</p>
                            </div>
                        </>
                    )
                }

            </div>
        </Container>
    );
};

export default Cart;
