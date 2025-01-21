import { Container } from "@mui/material";
import React from "react";
import a1 from "../assets/images/a1.png"
import a2 from "../assets/images/a2.png"


const AboutUs = () => {
    return (
        <>
            <Container>
                <div className="container mx-auto px-4 py-10 space-y-32">
                    {/* Story Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Text Section */}
                        <div>
                            <h1 className="text-4xl font-bold mb-4 font-mono">Our Story</h1>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                At PVCU, our unwavering dedication is ignited by a divine
                                commitment to sculpt a superhero universe, drawing profound
                                inspiration from the sacred tapestry of The Itihasas of Akhand
                                Bharat. Join us at PVCU, where ancient tales seamlessly merge
                                with modern imagination, creating a harmonious fusion that
                                resonates with the soul of Akhand Bharat.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Our Mission transcends the boundaries of mere imagination; it
                                extends a sacred call, inviting you to embark on an
                                extraordinary odyssey into a realm. Where the mythic tales of
                                ancient India come alive in vivid, divine, and astonishing
                                forms.
                            </p>
                        </div>
                        {/* Image Section */}
                        <div>
                            <img
                                src={a1} // Replace with your image URL
                                alt="Our Story"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10.5k", description: "Sellers active our site" },
                            { number: "33k", description: "Monthly Products Sale" },
                            { number: "45.5k", description: "Customer active in our site" },
                            { number: "25k", description: "Annual gross sale in our site" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className=" p-6 rounded-lg shadow-sm border space-y-2 flex items-center flex-col justify-center"
                            >
                                <div className="p-3 bg-[#DDC8B9] rounded-full ">
                                    <div className="p-2 bg-[#8B4513] rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
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
                                </div>
                                <h2 className="text-3xl font-medium">
                                    {stat.number}
                                </h2>
                                <p className="text-gray-700">{stat.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Team Section */}
                    <div>
                        {/* <h2 className="text-3xl font-bold mb-10 text-center">
                            Meet Our Team
                        </h2> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    name: "Tom Cruise",
                                    title: "Founder & Chairman",
                                    img: "https://via.placeholder.com/150", // Replace with your image URL
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                                {
                                    name: "Emma Watson",
                                    title: "Managing Director",
                                    img: "https://via.placeholder.com/150", // Replace with your image URL
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                                {
                                    name: "Will Smith",
                                    title: "Product Designer",
                                    img: "https://via.placeholder.com/150", // Replace with your image URL
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                                {
                                    name: "Will Smith",
                                    title: "Product Designer",
                                    img: "https://via.placeholder.com/150", // Replace with your image URL
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-white border-0 m-0 rounded-lg flex flex-col"
                                >
                                    {/* Image */}
                                    <img
                                        src={a2}
                                        alt={member.name}
                                        className="w-full h-[300px] object-cover rounded-t-lg"
                                    />
                                    {/* Text Content */}
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold">{member.name}</h3>
                                        <p className="text-gray-600 text-sm">{member.title}</p>
                                        {/* Social Links */}
                                        <div className="flex justify-center space-x-4 mt-2">
                                            {member.social.map((platform, i) => (
                                                <a
                                                    key={i}
                                                    href={`#${platform}`}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <i className={`fab fa-${platform}`} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </Container>
        </>
    );
};

export default AboutUs;
