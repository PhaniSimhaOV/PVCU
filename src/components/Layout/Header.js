import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../context/AuthContext'; // Import the AuthContext

const Header = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useContext(AuthContext); 
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };

    return (
        <div>
            <div className='bg-[#8B4513] py-2'>
                <p className='text-xs text-center text-white'>Discount 20% For New Member, ONLY FOR TODAY!!</p>
            </div>
            <div className='py-4 flex flex-col md:flex-row justify-between items-center px-4 md:px-10 border-b'>
                <div className='mb-4 md:mb-0'>
                    <img src={logo} alt="Logo" className='w-24' />
                </div>
                <div className='flex justify-center mb-4 md:mb-0'>
                    <ul className='flex flex-col md:flex-row gap-4'>
                        <li>
                            <Link
                                to="/"
                                className={`cursor-pointer ${location.pathname === '/' ? 'underline' : ''}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`cursor-pointer ${location.pathname === '/contact' ? 'underline' : ''}`}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`cursor-pointer ${location.pathname === '/about' ? 'underline' : ''}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
                    <div className='relative mb-4 md:mb-0 w-full md:w-auto'>
                        <input
                            className='w-full md:w-64 outline-none border border-slate-100 p-2.5 rounded-sm text-sm pr-10 focus:outline-none focus:border-slate-100'
                            type='text'
                            placeholder='What are you looking for?'
                        />
                        <div className='absolute right-2 top-0 bottom-0 flex items-center'>
                            <SearchOutlinedIcon sx={{ color: "grey", fontSize: "20px" }} />
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Link to="/wishlist">
                            <FavoriteBorderOutlinedIcon sx={{ color: "grey", fontSize: "20px", cursor: "pointer" }} />
                        </Link>
                        <Link to="/cart">
                            <ShoppingCartOutlinedIcon sx={{ color: "grey", fontSize: "20px", cursor: "pointer" }} />
                        </Link>

                        {isAuthenticated ? (
                            <div>
                                <Avatar
                                    sx={{ cursor: 'pointer' }}
                                    onClick={handleMenuOpen}
                                />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Link to="/login">
                                <PersonOutlineOutlinedIcon sx={{ color: "grey", fontSize: "23px", cursor: "pointer" }} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
