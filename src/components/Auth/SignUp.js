import React, { useState } from 'react';
import { Visibility } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { API_URL } from '../../constants';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import loginImage from "../../assets/images/login.png";

const SignUp = ({ isDialog = false, Link }) => {
    // Use the provided Link component or the React Router Link
    const LinkComponent = isDialog ? Link : RouterLink;

    const [formData, setFormData] = useState({
        name: '',
        emailOrPhone: '',
        password: ''
    });


    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const handleEyeClick = () => {
        setPasswordVisibility(!passwordVisibility)
    }


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            });
            if (isDialog) {
                // Optionally close dialog or redirect
            }
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

    // Dialog-specific styles
    const dialogStyles = isDialog ? {
        container: "w-full max-w-md",
        wrapper: "flex flex-col",
        title: "text-2xl font-semibold text-[#3E3E3E] mb-4",
        formPadding: "p-0",
        spacing: "space-y-4"
    } : {
        container: "container mx-auto",
        wrapper: "flex flex-col md:flex-row lg:items-center h-screen container mx-auto lg:p-4 my-6",
        title: "text-4xl font-semibold text-[#3E3E3E] mb-6",
        formPadding: "p-8 md:p-16",
        spacing: "space-y-6"
    };

    return (
        <div className={dialogStyles.container}>
            <Toaster position="top-right" reverseOrder={false} />
            <div className={dialogStyles.wrapper}>
                {/* Left Image Section - Only show when not in dialog */}
                {!isDialog && (
                    <div className="hidden md:block md:w-1/2 h-full">
                        <img
                            src={loginImage}
                            alt="Nature"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                {/* Right Form Section */}
                <div className={`flex flex-col justify-center ${isDialog ? 'w-full' : 'md:w-1/2'} ${dialogStyles.formPadding}`}>
                    <h1 className={dialogStyles.title}>SIGN UP</h1>
                    <form className={dialogStyles.spacing} onSubmit={handleSubmit}>
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
                                    type={passwordVisibility ? "password" : "text"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-sm outline-none"
                                    required
                                />
                                <Visibility onClick={handleEyeClick} className="absolute top-2 right-3 text-gray-400 cursor-pointer" />
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

                    <div className="flex items-center my-3">
                        <hr className="w-full border-gray-300" />
                        <span className="px-4 text-gray-500 text-sm">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <GoogleOAuthProvider clientId="6871043980-ql7icu6dkt4imqn2g555j9l58gr81hrj.apps.googleusercontent.com">
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => toast.error('Google login failed')}
                                useOneTap
                                size={isDialog ? "medium" : "large"}
                            />
                        </div>
                    </GoogleOAuthProvider>

                    <p className="text-sm text-center font-normal mt-4">
                        Already have an account?{' '}
                        <LinkComponent to="/login" className="text-[#8B4513] font-medium underline">
                            Sign In
                        </LinkComponent>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;