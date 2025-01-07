/* eslint-disable jsx-a11y/anchor-is-valid */
import { Visibility } from '@mui/icons-material'
import React from 'react'
import loginImage from "../../assets/images/login.png"
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <Container>
            <div className="flex flex-col md:flex-row items-center h-screen container mx-auto p-4 my-6">
                {/* Left Image Section */}
                <div className="hidden md:block md:w-1/2 h-full">
                    <img
                        src={loginImage} // Replace with your image URL
                        alt="Nature"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Form Section */}
                <div className="flex flex-col justify-center md:w-1/2  p-8 md:p-16">
                    <h1 className="text-4xl font-semibold text-[#3E3E3E] font-mono mb-6">SIGN IN</h1>
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#8B4513]"
                            >
                                EMAIL OR PHONE NUMBER
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="example@email.com"
                                className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600"
                            >
                                PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-sm outline-none"
                                />
                                <Visibility className="absolute top-2 right-3 text-gray-400 cursor-pointer" />
                            </div>
                        </div>

                    </form>

                    <div className="flex justify-between items-center my-6">

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-[#8B4513] rounded-md"
                        >
                            SIGN IN →
                        </button>
                        <a
                            href="#"
                            className="text-sm w-full text-right text-[#8B4513] font-medium underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="px-4 text-gray-500">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <button
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 text-xs font-normal text-[#8B4513] bg-white border border-[#8B4513] rounded-sm "
                    >
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                            alt="Google logo"
                            className="w-7 h-7 mr-2"
                        />
                        SIGN IN WITH GOOGLE
                    </button>

                    <p className="text-sm text-center font-normal mt-6">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-[#8B4513] font-medium underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default Login
