import { Container } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const serviceID = "service_42scdsw";
      const templateID = "template_rsh28zt";

      const params = {
        sendername: formData.name,
        to: "superhelp@pvcu.in",
        subject: "Enquiry Form Details",
        replyto: formData.email,
        message: `
          Name: ${formData.name}
          Mobile Number: ${formData.phone}
          Email: ${formData.email}
          Note: ${formData.message}
        `,
      };

      await emailjs.send(serviceID, templateID, params, "rLi115x7NbmnZdlX-");
      toast.success("Email sent successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
       <Toaster
                position="top-right"
                reverseOrder={false}
            />
      <div className="container mx-auto px-4 py-14">
        <h1 className="text-4xl font-bold mb-8 ">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="space-y-6">
            {/* Call To Us */}
            {/* <div className="flex items-start space-x-4">
              <div className="p-4 bg-[#DDC8B9] rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10a9 9 0 009 9m0 0a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9v3m0-12V6m-6 3h3m6-3h3"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Email To Us</h2>
                <p className="text-gray-600">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-slate-400 font-medium">
                  Email: superhelp@pvcu.in
                </p>
              </div>
            </div> */}
            {/* Write To Us */}
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-[#DDC8B9] rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10a9 9 0 009 9m0 0a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9v3m0-12V6m-6 3h3m6-3h3"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Write To Us</h2>
                <p className="text-gray-600">
                  Fill out the forms and we will contact you within 24 hours.
                </p>
                <p className="text-slate-400 font-medium">
                  Email: superhelp@pvcu.in
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form className="space-y-6" onSubmit={sendEmail}>
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Eg: John Doe"
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium">
                  Phone Number
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="111-222-3333"
                    className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </div>
              </div>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@gmail.com"
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
              </div>
              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium">
                  Your Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message"
                  rows="4"
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#8B4513] text-white font-medium rounded-sm focus:outline-none"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
