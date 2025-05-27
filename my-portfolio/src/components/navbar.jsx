import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
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

    const handleNav = (sectionId) => {
        if (location.pathname !== "/") {
            navigate("/", { replace: false });
            // Wait for the homepage to load, then scroll
            setTimeout(() => scrollToSection(sectionId), 100);
        } else {
            scrollToSection(sectionId);
        }

        setIsMobileMenuOpen(false); // close mobile menu on click
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <header className="bg-white shadow fixed w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="/" className="font-durer text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-200 bg-clip-text text-transparent">Phanlop's Portfolio</a>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-6 text-sm font-medium">
                        {["home", "about", "skills", "projects", "achievements", "internships", "activities", "education", "contact"].map((id) => (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className="hover:text-blue-600"
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                        <a href="/login" className="hover:text-blue-600">{username}</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} mt-4`}>
                    <div className="space-y-4 text-sm font-medium pb-6">
                        {["home", "about", "skills", "projects", "achievements", "internships", "activities", "education", "contact"].map((id) => (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className="block text-blue-600 hover:text-blue-800"
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                        <a href="/login" className="block text-blue-600 hover:text-blue-800">{username}</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
