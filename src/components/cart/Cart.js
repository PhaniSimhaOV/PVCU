import React, { useEffect } from "react";
import { Container } from "@mui/material";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";  // Import the custom hook from CartContext
import emptyCartLogo from "../../assets/images/empty-cart.png";
import axios from "axios";
import { API_URL } from "../../constants";
import loadingImage from "../../assets/images/2.png"


const Cart = () => {
    const { cartItems, subtotal, total, removeItem, updateCart, setCartItems } = useCart();  // Access cart data and actions from context
    const [isLoading, setIsLoading] = React.useState(true);

    // Fetch cart items from the API
    useEffect(() => {
        const fetchCart = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Handle case where user is not logged in
                    setIsLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${API_URL}/cart/cart-details`, config);
                const fetchedCartItems = response.data.cart.items || [];  // Assuming the cart structure has a field `items`
                setCartItems(fetchedCartItems);  // Pass fetched items to context
            } catch (error) {
                console.error('Error fetching cart:', error);
                // Handle error appropriately, maybe set empty cart
                setCartItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCart();
    }, [setCartItems]);  // Only run once when component mounts

    if (isLoading) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center h-screen">
                    <img
                        src={loadingImage}
                        alt="Loading..."
                        className="w-42 h-20 animate-bounce"
                    />
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="container mx-auto p-4 my-14">
                <nav className="text-sm mb-6">
                    <a href="/" className="text-gray-500">Home</a> /
                    <span className="text-gray-800 font-semibold"> Your Cart</span>
                </nav>

                {
                    cartItems.length !== 0 ? (
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
                    ) : (
                        <div className="flex items-center justify-center flex-col">
                            <img src={emptyCartLogo} className="h-64" alt="Empty cart" />
                            <p className="mt-4 text-gray-600 text-lg">Your cart is currently empty. Start shopping now!</p>
                        </div>
                    )
                }
            </div>
        </Container>
    );
};

export default Cart;