/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Visibility } from '@mui/icons-material';
import { Container, CircularProgress } from '@mui/material';
import loginImage from "../../assets/images/login.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { API_URL } from '../../constants';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';


const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        emailOrPhone: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/signup`, formData);
            toast.success(response.data.message);
            setFormData({
                name: '',
                emailOrPhone: '',
                password: ''
            })
        } catch (error) {
            toast.error(error.response?.data?.error || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (response) => {
        if (response.credential) {
            try {
                const { data } = await axios.post(`${API_URL}/auth/google-login`, { token: response.credential });
                toast.success(data.message);
                window.scrollTo(0, 0);
                window.location.reload();
                localStorage.setItem('token', data.token);
                // navigate('/');
            } catch (error) {
                toast.error(error.response?.data?.error || 'Google sign-in failed.');
            }
        }
    };


    return (
        <Container>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="flex flex-col md:flex-row lg:items-center h-screen container mx-auto lg:p-4 my-6">
                {/* Left Image Section */}
                <div className="hidden md:block md:w-1/2 h-full">
                    <img
                        src={loginImage}
                        alt="Nature"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Right Form Section */}
                <div className="flex flex-col justify-center md:w-1/2  p-8 md:p-16">
                    <h1 className="text-4xl font-semibold text-[#3E3E3E]  mb-6">SIGN UP</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-[#8B4513]"
                            >
                                NAME
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-sm"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="emailOrPhone"
                                className="block text-sm font-medium text-[#8B4513]"
                            >
                                EMAIL OR PHONE NUMBER
                            </label>
                            <input
                                type="text"
                                id="emailOrPhone"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-sm"
                                required
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-sm outline-none"
                                    required
                                />
                                <Visibility className="absolute top-2 right-3 text-gray-400 cursor-pointer" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-[#8B4513] rounded-md flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={20} style={{ color: '#fff' }} /> : 'CREATE ACCOUNT →'}
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="px-4 text-gray-500">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {/* <button
                        type="button"
                        className="flex items-center justify-center w-full px-4 py-2 text-xs font-normal text-[#8B4513] bg-white border border-[#8B4513] rounded-sm "
                    >
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                            alt="Google logo"
                            className="w-7 h-7 mr-2"
                        />
                        SIGN UP WITH GOOGLE
                    </button> */}
                    <GoogleOAuthProvider clientId="6871043980-ql7icu6dkt4imqn2g555j9l58gr81hrj.apps.googleusercontent.com">
                        <div>
                            <Toaster position="top-right" reverseOrder={false} />
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => toast.error('Google login failed')}
                                useOneTap
                            />
                            {/* Your form here */}
                        </div>
                    </GoogleOAuthProvider>


                    <p className="text-sm text-center font-normal mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#8B4513] font-medium underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default SignUp;
