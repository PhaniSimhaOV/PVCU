import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Import the custom hook from CartContext
import { API_URL, IMAGE_URL } from "../constants";
import payment from "../assets/images/payment.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";


const CheckoutForm = () => {
  const { cartItems, subtotal, total, setCartItems } = useCart(); // Fetch cart data from context
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    province: "",
    zip: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendEmail = async (data) => {
    try {
      const serviceID = "service_42scdsw";
      const templateID = "template_rsh28zt";

      const itemList = data.items
      ?.map((item) => `- ${item.name} - ${item.quantity} - ${item.size}`)
      .join("\n") || "- No items";

      const params = {
        sendername: "PVCU",
        to: "sreefabrics2019@gmail.com",
        // to: "raj.shah@budhanatech.com",
        subject: "Order Details of PVCU",
        replyto: "venkat@pvcu.in",
        // replyto:"raj.shah@budhanatech.com",
        message: `
        Order ID: ${data?.orderId}
        Amount: ₹${data?.amount}
        Address:${data?.address}
        Order Status: ${data?.orderStatus}
        Order Name :${data?.name}
        Email: ${data?.email}
        Phone: ${data?.phone}
        Zip: ${data?.zip}
        Payment Status: ${data?.paymentStatus}
        Items:${itemList},
      `,
      };

      await emailjs.send(serviceID, templateID, params, "rLi115x7NbmnZdlX-");
      toast.success("Email sent successfully!");

    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
    }
  };

  const sendEmailToCustomer = async (data) => {
    try {
      const serviceID = "service_42scdsw";
      const templateID = "template_rsh28zt";

      const itemList = data.items
      ?.map((item) => `- ${item.name} - ${item.quantity} - ${item.size}`)
      .join("\n") || "- No items";

      const params = {
        sendername: "PVCU",
        // to: "sreefabrics2019@gmail.com",
        to: data.email,
        subject: "Order Details of PVCU",
        replyto: "venkat@pvcu.in",
        // replyto:"raj.shah@budhanatech.com",
        message: `
        Order ID: ${data?.orderId}
        Amount: ₹${data?.amount}
        Address:${data?.address}
        Order Status: ${data?.orderStatus}
        Order Name :${data?.name}
        Email: ${data?.email}
        Phone: ${data?.phone}
        Zip: ${data?.zip}
        Payment Status: ${data?.paymentStatus}
        Items:${itemList},
      `,
      };

      await emailjs.send(serviceID, templateID, params, "rLi115x7NbmnZdlX-");
      toast.success("Email sent successfully!");

    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const orderFormData = new FormData();

      // Append form data fields
      orderFormData.append("name", formData.name);
      orderFormData.append("phone", formData.phone);
      orderFormData.append("email", formData.email);
      orderFormData.append("address", formData.address);
      orderFormData.append("country", formData.country);
      orderFormData.append("province", formData.province);
      orderFormData.append("zip", formData.zip);
      orderFormData.append("amount", total);

      // Append cart items to form data
      cartItems.forEach((item) => {
        orderFormData.append("items[]", JSON.stringify(item));
      });

      const response = await axios.post(
        `${API_URL}/cart/create-order`,
        orderFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { orderId, amount, currency } = response.data;
      sendEmail(response.data)
      sendEmailToCustomer(response.data)


      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "PVCU",
        description: "Purchase Items",
        order_id: orderId,
        handler: async (res) => {
          try {
            const paymentVerification = await axios.post(
              `${API_URL}/cart/verify-payment`,
              {
                razorpay_order_id: orderId,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
              }
            );

            toast.success(paymentVerification.data.message);
          
            setCartItems([])
            await axios.delete(`${API_URL}/cart/delete/clear-cart`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setTimeout(() => {
              navigate("/cart");
            }, 3000);

          } catch (error) {
            alert("Payment verification failed. Please try again."); // Show error
            console.error(error);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#8B4513",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error creating order or opening Razorpay", error);
      alert("Payment initiation failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="">
        <form onSubmit={handlePayment} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className=" space-y-5">
            <h1 className="text-2xl font-bold mb-6">Checkout Form</h1>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Eg: John Doe"
                className="w-full border border-black rounded- px-3 py-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                PHONE NUMBER
              </label>
              <div className="flex gap-2">
                <select
                  className="border border-black px-3 py-2"
                  value={formData.country}
                  name="country"
                  required

                  onChange={handleInputChange}
                >
                  <option>+91</option>
                  <option>+1</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required

                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="111-222-3333"
                  className="flex-grow border border-black rounded- px-3 py-3"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                required

                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@gmail.com"
                className="w-full border border-black rounded- px-3 py-3"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="address"
              >
                ADDRESS
              </label>
              <input
                type="text"
                id="address"
                required

                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Eg: ABC Street 12A, Jubilee Hills, Hyderabad"
                className="w-full border border-black rounded- px-3 py-3"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="province"
                >
                  STATE/PROVINCE
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  required

                  value={formData.province}
                  onChange={handleInputChange}
                  placeholder="Choose Province"
                  className="w-full border border-black rounded- px-3 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="zip">
                  ZIP CODE
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  required

                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Choose ZIP Code"
                  className="w-full border border-black rounded- px-3 py-3"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 mb-4">
                    <img
                      src={`${IMAGE_URL}/${item.image}`} // Replace with actual product image
                      alt={item.productId.name}
                      className="w-24 h-full rounded-sm object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.productId.name}</h3>
                      <p className="text-gray-500">
                        {item.quantity} × {item.productId.original_price}
                      </p>
                      <p className="text-sm text-gray-400">
                        {item.productId.description || "No description available"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty.</p>
              )}

              {/* Totals */}
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {/* <div className="flex justify-between mb-2 text-red-500">
                  <span>Voucher (50KDISCOUNT)</span>
                  <span>-₹{50}</span>
                </div> */}
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4 w-full">PAYMENT</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 border border-[#8B4513] py-3 px-2">
                  <div className="w-full flex gap-2 items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="payment"
                      className="h-4 w-4"
                    />
                    <span htmlFor="bank" className="text-sm text-black">
                      Bank
                    </span>
                  </div>
                  <img src={payment} alt="Payment Methods" className="h-6" />
                </div>
                <div className="flex items-center gap-2 border border-[#8B4513] py-3 px-2">
                  <div className="w-full flex gap-2 items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="payment"
                      className="h-4 w-4"
                    />
                    <span htmlFor="bank" className="text-sm text-black">
                      Cash on Delivery
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-[#8B4513] text-white py-2 rounded my-4"
                disabled={loading}

              >
                {loading ? "Placing order" : "Place Order"}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CheckoutForm;
