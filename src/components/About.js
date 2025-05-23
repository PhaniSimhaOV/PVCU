import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import a1 from "../assets/images/hanuman-top-banner.mp4"


const AboutUs = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoaded(true), 300); // Delay effect for smooth transition
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <div className="w-full h-screen bg-transparent relative">
                <video
                    className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    loop
                    autoPlay
                    muted
                    onLoadedData={() => setIsLoaded(true)} // Trigger animation when video loads
                >
                    <source src={a1} type="video/mp4" />
                </video>
            </div>
            <Container>
                <div className="container mx-auto px-4 py-10 space-y-12">
                    <div className="relative">

                        <div
                            className=" top-0 left-0 right-0 bottom-0 my-6 flex justify-center items-center"
                            style={{
                                position: '',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
                            }}
                        >

                            <div className="px-4 items-center mt-6 text-left" >
                                {/* Text Section Below the Image */}
                                <h1 className="text-black text-4xl font-bold text-left">
                                    Our Story
                                </h1>
                                <div className="my-6">
                                    <p className="text-black leading-relaxed mb-2">
                                        Welcome to the PVCU, where fandom meets fashion and legends live on your shelf.
                                    </p>
                                    <p className="text-black leading-relaxed mb-2">
                                        We’re the official merch destination of PVCU, an Indian superhero universe inspired by our itihasas, valor, and homegrown heroes.
                                    </p>
                                    <p className="text-black leading-relaxed mb-2">
                                        From divine power to street-smart swag, every T-shirt, poster, and collectible here is a tribute to the epic stories we're building. One film, one fan, one hero at a time.
                                    </p>
                                    {/* <p className="text-black leading-relaxed mb-2"> Join the PVCU tribe and carry the spirit of our heroes with you.</p> */}

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10.5k", description: "100% premium cotton" },
                            { number: "33k", description: "Hanu-Man Exclusive merch" },
                            { number: "45.5k", description: "PVCU Limited Edition" },
                            { number: "25k", description: "Culturally-rooted, Fashion-forward" },
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
                                {/* <h2 className="text-3xl font-medium">
                                    {stat.number}
                                </h2> */}
                                <p className="text-gray-700">{stat.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Team Section */}
                    {/* <div>
                        <h2 className="text-3xl font-bold mb-10 text-center">
                            Meet Our Team
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    name: "Tom Cruise",
                                    title: "Founder & Chairman",
                                    img: "https://via.placeholder.com/150", 
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                                {
                                    name: "Emma Watson",
                                    title: "Managing Director",
                                    img: "https://via.placeholder.com/150", 
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                                {
                                    name: "Will Smith",
                                    title: "Product Designer",
                                    img: "https://via.placeholder.com/150", 
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                                {
                                    name: "Will Smith",
                                    title: "Product Designer",
                                    img: "https://via.placeholder.com/150", 
                                    social: ["instagram", "linkedin", "facebook"],
                                },
                            ].map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-white border-0 m-0 rounded-lg flex flex-col"
                                >
                                    <img
                                        src={a2}
                                        alt={member.name}
                                        className="w-full h-[300px] object-cover rounded-t-lg"
                                    />
                                    <div className="p-4 text-center">
                                        <h3 className="text-lg font-semibold">{member.name}</h3>
                                        <p className="text-gray-600 text-sm">{member.title}</p>
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

                    </div> */}
                </div>
            </Container>
        </>
    );
};

export default AboutUs;
