import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { MenuOutlined, MoreVertOutlined } from '@mui/icons-material';

const Header = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEls, setAnchorEls] = useState(null);

    const [authDialogOpen, setAuthDialogOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [isSticky, setIsSticky] = useState(false);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleGuestMenuOpen = (event) => setAnchorEls(event.currentTarget);
    const handleGuestMenuClose = () => setAnchorEls(null);

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    const toggleAuthForm = () => setShowLogin(!showLogin);

    const DialogLink = ({ children }) => {
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

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <>
            {/* Placeholder for height to avoid layout shift */}
            <div className="h-[105px] md:h-[84px]"></div>
            <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? 'shadow-md bg-white' : 'bg-white'}`}>
                <div className='w-full py-1 bg-[#AC5B24]'>
                    <p className='text-sm text-white text-center'>Exclusive Hanuman Merch is Live</p>
                </div>

                <div className='py-4 flex flex-col md:flex-row justify-between items-center px-4 md:px-10 border-b'>
                    <div className='mb-4 md:mb-0 cursor-pointer'>
                        <a href="/">
                            <img src={logo} alt="Logo" className='w-24' />
                        </a>
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
                                <PersonOutlineOutlinedIcon
                                    sx={{ color: "grey", fontSize: "23px", cursor: "pointer", mt: 0.8 }}
                                    onClick={() => setAuthDialogOpen(true)}
                                />
                            )}
                            <MoreVertOutlined
                                sx={{ color: "grey", fontSize: "23px", cursor: "pointer", mt: 0.8 }}
                                onClick={handleGuestMenuOpen}
                            />
                            <Menu anchorEl={anchorEls} open={Boolean(anchorEls)} onClose={handleGuestMenuClose}>
                                <MenuItem component="a" href="/contact" onClick={handleGuestMenuClose}>Contact Us</MenuItem>
                                <MenuItem component="a" href="/about" onClick={handleGuestMenuClose}>About Us</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>

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
                <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setAuthDialogOpen(false)}
                        aria-label="close"
                        sx={{ color: 'black' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {showLogin ? (
                        <Login setAuthDialogOpen={setAuthDialogOpen} isDialog={true} Link={DialogLink} />
                    ) : (
                        <SignUp setAuthDialogOpen={setAuthDialogOpen} isDialog={true} Link={DialogLink} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Header;
