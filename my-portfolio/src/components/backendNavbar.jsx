import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export default function BackendNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState("Login");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            try {
                const decoded = jwtDecode(localStorage.getItem('token'));
                setUsername(decoded.username);
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow fixed w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="font-durer text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-200 bg-clip-text text-transparent">Portfolio Manager</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 text-sm font-medium">
                        <h1 className="text-blue-600">Welcome {username}</h1>
                        <a href="/" className="hover:text-blue-600">Home</a>
                        <a href="/displayPortfolio" className="hover:text-blue-600">Display</a>
                        <a href="/createPortfolio" className="hover:text-blue-600">Create New</a>
                        <a href="/logout" className="hover:text-blue-600">Logout</a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} mt-4`}>
                    <div className="space-y-4 text-sm font-medium pb-6">
                        <h1 className="text-blue-600">Welcome {username}</h1>
                        <a href="/" className="block text-blue-600 hover:text-blue-800">Home</a>
                        <a href="/displayPortfolio" className="block text-blue-600 hover:text-blue-800">Display</a>
                        <a href="/createPortfolio" className="block text-blue-600 hover:text-blue-800">Create New</a>
                        <a href="/logout" className="block text-blue-600 hover:text-blue-800">Logout</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
