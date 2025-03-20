import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import image from '../../Images/images-removebg-preview.png'
import AuthContext from '../../../Context/AuthContext';
import { motion } from 'framer-motion';

function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#262940]/80 backdrop-blur-md border-b border-[#e1e6f0] dark:border-[#32374f] text-[#1a1c2e] dark:text-white">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <img className="h-10 w-10 object-contain" src={image} alt="RoundGen Logo" />
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5e7ce2] to-[#4a69d2]">
                                Sports Scheduler
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user && user.is_superuser && (
                            <Link to="/create" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                                Create Event
                            </Link>
                        )}
                        <Link to="/event" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                            Live Events
                        </Link>
                        <Link to="/enrolled" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                            Registered Participants
                        </Link>
                        <Link to="/schedule" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2] hover:text-[#5e7ce2] dark:hover:text-white transition-colors">
                            Event Schedule
                        </Link>
                    </div>
                    
                    {/* User Menu */}
                    <div className="hidden md:flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-[#5e7ce2]/20 flex items-center justify-center text-[#5e7ce2]">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-[#505565] dark:text-[#a3adc2] capitalize">
                                        {user.username}
                                    </p>
                                </div>
                                <button onClick={logoutUser} className="px-4 py-2 bg-[#f5f7fa] dark:bg-[#1e2136] border border-[#e1e6f0] dark:border-[#32374f] rounded-lg text-[#505565] dark:text-[#a3adc2] hover:text-[#e25e5e] hover:border-[#e25e5e] transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-2 bg-[#5e7ce2] hover:bg-[#4a69d2] text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                                Login
                            </Link>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            className="text-[#505565] dark:text-[#a3adc2]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden py-4 border-t border-[#e1e6f0] dark:border-[#32374f]"
                    >
                        <div className="flex flex-col space-y-3">
                            {user && user.is_superuser && (
                                <Link to="/create" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2]" onClick={() => setIsMenuOpen(false)}>
                                    Create Event
                                </Link>
                            )}
                            <Link to="/event" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2]" onClick={() => setIsMenuOpen(false)}>
                                Live Events
                            </Link>
                            <Link to="/enrolled" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2]" onClick={() => setIsMenuOpen(false)}>
                                Registered Participants
                            </Link>
                            <Link to="/schedule" className="px-4 py-2 text-[#505565] dark:text-[#a3adc2]" onClick={() => setIsMenuOpen(false)}>
                                Event Schedule
                            </Link>
                            
                            <div className="pt-3 border-t border-[#e1e6f0] dark:border-[#32374f]">
                                {user ? (
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-[#5e7ce2]/20 flex items-center justify-center text-[#5e7ce2]">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <p className="text-[#505565] dark:text-[#a3adc2] capitalize">
                                                {user.username}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                logoutUser();
                                                setIsMenuOpen(false);
                                            }}
                                            className="px-4 py-2 bg-[#f5f7fa] dark:bg-[#1e2136] border border-[#e1e6f0] dark:border-[#32374f] rounded-lg text-[#505565] dark:text-[#a3adc2] hover:text-[#e25e5e]"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link 
                                        to="/login" 
                                        className="block px-4 py-2 bg-[#5e7ce2] hover:bg-[#4a69d2] text-white rounded-lg text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
