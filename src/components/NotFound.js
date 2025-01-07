import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold text-gray-800 font-mono">404 ERROR</h1>
            <p className="mt-4  text-center text-sm text-gray-600">
                Sorry, Page not found.
                <br />
                The page you were looking for doesn't exist.
            </p>
            <button
                onClick={() => navigate("/")}
                className="mt-6 px-6 py-3 bg-[#8B4513] text-white text-sm font-normal rounded-md"
            >
                BACK TO HOME
            </button>
        </div>
    );
};

export default NotFound;
