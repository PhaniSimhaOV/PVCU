import React, { createContext, useState, useEffect } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);

    const calculateCart = (items) => {
        let subtotal = 0;
        items.forEach(item => {
            const itemPrice = item?.productId?.discount
                ? item?.productId?.original_price - (item?.productId?.original_price * (item?.productId?.discount?.percent / 100))
                : item?.productId?.original_price;

            subtotal += itemPrice * item.quantity; // Add price for the quantity of the item
        });

        setSubtotal(subtotal);
        setTotal(subtotal);
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            calculateCart(cartItems);
        }
    }, [cartItems]);

    // Update cart item quantity
    const updateCart = (itemId, newQuantity) => {
        const updatedCartItems = cartItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
    };

    // Remove an item from the cart
    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCartItems);
        calculateCart(updatedCartItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, subtotal, total, updateCart, removeItem ,setCartItems}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return React.useContext(CartContext);
};
