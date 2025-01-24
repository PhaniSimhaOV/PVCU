/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { Visibility } from '@mui/icons-material';
import { Container, CircularProgress } from '@mui/material';
import loginImage from "../../assets/images/login.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../constants';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const { setToken } = useContext(AuthContext); 


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/signin`, formData);
            toast.success(response.data.message);
            setToken(response.data.token);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            toast.error(error.response?.data?.error || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="flex flex-col md:flex-row lg:items-center h-screen container mx-auto lg:p-4 my-6">
                <div className="hidden md:block md:w-1/2 h-full">
                    <img
                        src={loginImage}
                        alt="Nature"
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="flex flex-col justify-center md:w-1/2 p-8 md:p-16">
                    <h1 className="text-4xl font-semibold text-[#3E3E3E]  mb-6">SIGN IN</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                            {loading ? <CircularProgress size={20} style={{ color: '#fff' }} /> : 'SIGN IN →'}
                        </button>
                    </form>

                    <div className="flex justify-between items-center my-6">
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
                        className="flex items-center justify-center w-full px-4 py-2 text-xs font-normal text-[#8B4513] bg-white border border-[#8B4513] rounded-sm"
                    >
                        <img
                            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                            alt="Google logo"
                            className="w-7 h-7 mr-2"
                        />
                        SIGN IN WITH GOOGLE
                    </button>

                    <p className="text-sm text-center font-normal mt-6">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-[#8B4513] font-medium underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default Login;
