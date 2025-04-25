import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { API_URL, IMAGE_URL } from "../constants";
import payment from "../assets/images/payment.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { states } from "./Constants";

const CheckoutForm = () => {
  const { cartItems, subtotal, total, setCartItems } = useCart();
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
  const [orders, setOrders] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  const [usePreviousAddress, setUsePreviousAddress] = useState(false);
  // Add state for payment method
  const [paymentMethod, setPaymentMethod] = useState("bank"); // Default to bank payment

  // Fetch user's previous orders
  const getOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data.order);
      setHasOrders(response.data.order.length > 0);
    } catch (e) {
      console.error("Error fetching previous orders:", e);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Handle using previous address
  const handleUsePreviousAddress = (e) => {
    const checked = e.target.checked;
    setUsePreviousAddress(checked);

    if (checked && orders.length > 0) {
      // Use the most recent order's address information
      const latestOrder = orders[0]; // Assuming orders are sorted by date with newest first
      setFormData({
        name: latestOrder.name || "",
        phone: latestOrder.phone || "",
        email: latestOrder.email || "",
        address: latestOrder.address || "",
        country: latestOrder.country || "",
        province: latestOrder.province || "",
        zip: latestOrder.zip || "",
        houseNumber: latestOrder.address.split(',  ')[0],
        streetName: latestOrder.address.split(',  ')[1],
        landmark: latestOrder.address.split(',  ')[2],
        district: latestOrder.address.split(',  ')[3]

      });
    } else {
      // Reset all form fields when unchecked
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        country: "",
        province: "",
        zip: "",
      });
    }
  };

  const sendEmail = async (data) => {
    try {
      const serviceID = "service_42scdsw";
      const templateID = "template_rsh28zt";

      const itemList = data.items
        ?.map((item) => `-${item.productId}-${item.name} - Quantity: ${item.quantity} - Size: ${item.size}`)
        .join("\n") || "- No items";

      const message = `
  Dear ${data?.name},
  
  Thank you for your order with PVCU! Please find your order details below:
  
  ----------------------------------------
  🧾 Order ID: ${data?.orderId}
  💰 Amount: ₹${data?.amount}
  🏠 Address: ${data?.address}
  📦 Order Status: ${data?.orderStatus}
  👤 Name: ${data?.name}
  📧 Email: ${data?.email}
  📞 Phone: ${data?.phone}
  📮 ZIP Code: ${data?.zip}
  💳 Payment Status: ${data?.paymentStatus}
  🛒 Items:
  ${itemList}
  ----------------------------------------
  
  If you have any questions or need assistance, feel free to contact us at venkat@pvcu.in.
  
  Warm regards,  
  PVCU Team
  `;

      const params = {
        sendername: "PVCU",
        to: "sreefabrics2019@gmail.com",
        subject: "Order Details of PVCU",
        replyto: "venkat@pvcu.in",
        message: message,
      };

      await emailjs.send(serviceID, templateID, params, "rLi115x7NbmnZdlX-");
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  const sendEmailToCustomer = async (data) => {
    try {
      const serviceID = "service_42scdsw";
      const templateID = "template_rsh28zt";

      const itemList = data.items
        ?.map((item, index) => `${index + 1}. ${item.name} (Size: ${item.size}) - Qty: ${item.quantity}`)
        .join("\n") || "No items in this order.";

      const message = `
  Hi ${data?.name},
  
  Thank you for shopping with PVCU. We’ve received your order and will begin processing it soon.
  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  🧾 Order Summary  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  • Order ID: ${data?.orderId}  
  • Order Date: ${new Date().toLocaleDateString()}  
  • Payment Status: ${data?.paymentStatus}  
  • Order Status: ${data?.orderStatus}  
  • Total Amount: ₹${data?.amount}
  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  📦 Items Ordered  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  ${itemList}
  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  🏠 Delivery Address  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  ${data?.name}  
  ${data?.address}  
  ZIP: ${data?.zip}  
  Phone: ${data?.phone}  
  Email: ${data?.email}
  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  Need Help?  
  ━━━━━━━━━━━━━━━━━━━━━━━  
  If you have any questions or need assistance, reach out to us at venkat@pvcu.in. We're here to help.
  
  Thank you for choosing PVCU!  
  PVCU Customer Support Team  
  `;

      const params = {
        sendername: "PVCU",
        to: data.email,
        subject: "Your PVCU Order Confirmation",
        replyto: "venkat@pvcu.in",
        message,
      };

      await emailjs.send(serviceID, templateID, params, "rLi115x7NbmnZdlX-");
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };


  const DELIVERY_CHARGE = 100;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const createOrder = async (res) => {
    const token = localStorage.getItem("token");
    const payload = {
      channel_id: "2122163e-f339-4fd9-b860-8adf5e092b52",
      currency: "INR",
      facility_id: "7334eb84-23ce-497e-b41a-a98f9cf90bbe",

      items: res.items.map((data, index) => {
        return {
          sku_name: data.name,
          unit_price: data.price + DELIVERY_CHARGE,
          quantity: data.quantity,
          category_name: "T-Shirt"
        };
      }),
      // [
      //   {
      //     sku_name: "Cenima hero - Super hero",
      //     unit_price: 799,
      //     unit_item_discount: 0,
      //     quantity: 1,
      //     image_urls: [""],
      //     category_name: "Cloth"
      //   }
      // ]
      payment_mode: "PREPAID",
      box_list: [
        {
          length: 15,
          breadth: 15,
          height: 15,
          weight: 50,
          length_unit: "CM",
          weight_unit: "GM",
          shipping_mode: "SURFACE",
          contains_fragile_items: "",
          packaging_type: "BOX",
          chargeableWeight: 675
        }
      ],
      source_order_number: res.orderId,
      cod_amount: "",
      total_weight: 0,
      shipping_address: {
        address_line1: "4-111 1stgodown,Old PSR Poultry,Vissakoderu Village",
        address_line2: "Palakoderu Mandal,West Godavari district",
        city: "Andhra Pradesh",
        country: "IN",
        email: "Sreefabrics2019@gmail.com",
        first_name: "Varma",
        last_name: "pinnamaraju",
        phone: "+918008499905",
        pin_code: "500005",
        state: "Telangana"
      },
      billing_address: {
        address_line1: res.address,
        address_line2: "",
        city: res.province,
        country: "IN",
        email: res.email,
        first_name: res.name,
        last_name: res.name,
        phone: res.phone,
        pin_code: res.zip,
        state: "Telangana"
      },
      client_warehouse_id: "7334eb84-23ce-497e-b41a-a98f9cf90bbe",
      client_warehouse_uuid: "delhivery::clientwarehouse::884556aa-8a75-4acb-985b-4658815ae4ce",
      seller_name: "SREE FABRICS"
    };
    try {
      const response = await axios.post(`${API_URL}/orders/manifest_order`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('✅ Order Created:', response.data);
    } catch (error) {
      console.error('❌ Error Creating Order:', error.response?.data || error.message);
    }
  };


  // Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (paymentMethod === "bank") {
        // Process with Razorpay for bank payment
        await handleBankPayment();
      } else {
        // Process cash on delivery order
        await handleCashOnDelivery();
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  // Handle bank payment through Razorpay
  const handleBankPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderFormData = new FormData();

      // Append form data fields
      orderFormData.append("name", formData.name);
      orderFormData.append("phone", formData.phone);
      orderFormData.append("email", formData.email);
      orderFormData.append("address", `${formData.houseNumber},  ${formData.streetName},  ${formData.landmark},  ${formData.district},  ${formData.province},  ${formData.zip}`);
      orderFormData.append("country", formData.country);
      orderFormData.append("province", formData.province);
      orderFormData.append("zip", formData.zip);
      orderFormData.append("amount", total + DELIVERY_CHARGE);
      orderFormData.append("paymentMethod", "bank");

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

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * DELIVERY_CHARGE,
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
            sendEmail(response.data);
            sendEmailToCustomer(response.data);
            createOrder(response.data)


            setCartItems([]);
            await axios.delete(`${API_URL}/cart/delete/clear-cart`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            setTimeout(() => {
              navigate("/cart");
            }, 3000);

          } catch (error) {
            toast.error("Payment verification failed. Please try again.");
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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle cash on delivery order
  const handleCashOnDelivery = async () => {
    try {
      const token = localStorage.getItem("token");
      const orderFormData = new FormData();

      // Append form data fields
      orderFormData.append("name", formData.name);
      orderFormData.append("phone", formData.phone);
      orderFormData.append("email", formData.email);
      orderFormData.append("address", `${formData.houseNumber},  ${formData.streetName},  ${formData.landmark},  ${formData.district},  ${formData.province},  ${formData.zip}`);
      orderFormData.append("country", formData.country);
      orderFormData.append("province", formData.province);
      orderFormData.append("zip", formData.zip);
      orderFormData.append("amount", total + DELIVERY_CHARGE);
      orderFormData.append("paymentMethod", "cod");
      orderFormData.append("paymentStatus", "pending"); // Set payment status as pending for COD

      // Append cart items to form data
      cartItems.forEach((item) => {
        orderFormData.append("items[]", JSON.stringify(item));
      });

      const response = await axios.post(
        `${API_URL}/cart/create-order`, // Consider making a separate endpoint for COD
        orderFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Order placed successfully!");
      sendEmail(response.data);
      sendEmailToCustomer(response.data);
      setCartItems([]);

      // Clear the cart after successful order
      await axios.delete(`${API_URL}/cart/delete/clear-cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTimeout(() => {
        navigate("/cart");
      }, 3000);

    } catch (error) {
      console.error("Error placing COD order:", error);
      toast.error("Failed to place order. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-12 p-4">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Checkout</h1>
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              <div className="lg:col-span-7 space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
                </div>

                {/* Previous Address Checkbox - Only shown if user has previous orders */}
                {hasOrders && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={usePreviousAddress}
                        onChange={handleUsePreviousAddress}
                        className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700 select-none">
                        Use my previously saved address
                      </span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                      Full Name (First Name and Last Name)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                      Phone Number
                    </label>
                    <div className="flex">
                      {/* <select
                        className="border border-gray-300 rounded-l-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                        value={formData.country}
                        name="country"
                        required
                        onChange={handleInputChange}
                      >
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1 (USA)</option>
                      </select> */}
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-b border-gray-200 py-4">
                  <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                    Address
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="col-span-1">
                    <input
                      type="text"
                      id={'houseNumber'}
                      name="houseNumber"
                      required
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      placeholder="Building Name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      id="streetName"
                      name="streetName"
                      required
                      value={formData.streetName}
                      onChange={handleInputChange}
                      placeholder="Street Name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      required
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Landmark"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="text"
                      id="district"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="District"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="province">
                      State
                    </label>
                    <select
                      className="border stateName border-gray-300 rounded-l-md rounded-r-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                      value={formData.province}
                      name="province"
                      required
                      onChange={handleInputChange}
                    >
                      {states.map((state) => {
                        return (
                          <option key={state.key} value={state.name}>{state.name}</option>
                        )
                      })}

                    </select>

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="zip">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="500019"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-6">ORDER SUMMARY</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 mb-4">
                        <img
                          src={`${IMAGE_URL}/${item.image}`}
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
                    <div className="flex justify-between mb-2">
                      <span>Delivery Charges</span>
                      <span>₹{DELIVERY_CHARGE}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total + DELIVERY_CHARGE}</span>
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
                          checked={paymentMethod === "bank"}
                          onChange={() => handlePaymentMethodChange("bank")}
                        />
                        <label htmlFor="bank" className="text-sm text-black cursor-pointer">
                          Bank
                        </label>
                      </div>
                      <img src={payment} alt="Payment Methods" className="h-6" />
                    </div>
                    {/* <div className="flex items-center gap-2 border border-[#8B4513] py-3 px-2">
                      <div className="w-full flex gap-2 items-center">
                        <input
                          type="radio"
                          id="cash"
                          name="payment"
                          className="h-4 w-4"
                          checked={paymentMethod === "cod"}
                          onChange={() => handlePaymentMethodChange("cod")}
                        />
                        <label htmlFor="cash" className="text-sm text-black cursor-pointer">
                          Cash on Delivery
                        </label>
                      </div>
                    </div> */}
                  </div>
                  <button
                    className="w-full bg-[#8B4513] text-white py-2 rounded my-4"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Placing order" : paymentMethod === "bank" ? "Proceed to Payment" : "Place Order"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;