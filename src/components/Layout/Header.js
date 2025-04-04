import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(true); // true for login, false for signup

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        logout();
        handleMenuClose();
        // navigate('/login');
    };

    // Toggle between login and signup forms
    const toggleAuthForm = () => {
        setShowLogin(!showLogin);
    };

    // Custom Link component that handles dialog navigation
    const DialogLink = ({ to, children }) => {
        const handleClick = (e) => {
            e.preventDefault();
            toggleAuthForm();
        };

        return (
            <a href="#" onClick={handleClick} className="text-[#8B4513] font-medium underline">
                {children}
            </a>
        );
    };

    return (
        <div>
            <div className='py-4 flex flex-col md:flex-row justify-between items-center px-4 md:px-10 border-b'>
                <div className='mb-4 md:mb-0 cursor-pointer'>
                    <a href="/">
                        <img src={logo} alt="Logo" className='w-24' />
                    </a>
                </div>

                <div className='flex justify-center mb-4 md:mb-0'>
                    <ul className='flex flex-col md:flex-row gap-4'>
                        <li>
                            <a href="/contact" className={`cursor-pointer ${location.pathname === '/contact' ? 'underline' : ''}`}>Contact</a>
                        </li>
                        <li>
                            <a href="/about" className={`cursor-pointer ${location.pathname === '/about' ? 'underline' : ''}`}>About Us</a>
                        </li>
                    </ul>
                </div>

                <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8'>
                    <div className='flex items-center gap-4'>
                        <a href="/wishlist"><FavoriteBorderOutlinedIcon sx={{ color: "grey", fontSize: "20px", cursor: "pointer" }} /></a>
                        <a href="/cart"><ShoppingCartOutlinedIcon sx={{ color: "grey", fontSize: "20px", cursor: "pointer" }} /></a>

                        {isAuthenticated ? (
                            <>
                                <Avatar sx={{ cursor: 'pointer' }} onClick={handleMenuOpen} />
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                    <MenuItem component="a" href="/" onClick={handleLogout}>Logout</MenuItem>
                                    <MenuItem component="a" href="/orders">Orders</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <PersonOutlineOutlinedIcon
                                    sx={{ color: "grey", fontSize: "23px", cursor: "pointer",mt:0.8 }}
                                    onClick={() => setAuthDialogOpen(true)}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Authentication Dialog */}
            <Dialog
                open={authDialogOpen}
                onClose={() => setAuthDialogOpen(false)}
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        minWidth: '500px',
                        backgroundImage: 'url("/loginimage.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    },
                }}
            >
                {/* Title with Close Button */}
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                   
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setAuthDialogOpen(false)}
                        aria-label="close"
                        sx={{ color: 'black' }} // Adjust color for visibility
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {/* Dialog Content */}
                <DialogContent>
                    {showLogin ? (
                        <Login setAuthDialogOpen={setAuthDialogOpen} isDialog={true} Link={DialogLink} />
                    ) : (
                        <SignUp setAuthDialogOpen={setAuthDialogOpen} isDialog={true} Link={DialogLink} />
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Header;