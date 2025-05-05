import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <div className="text-xl font-bold text-blue-600">Phanlop's Portfolio</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 text-sm font-medium">
                        {["home", "about", "skills", "projects", "achievements", "internships", "activities", "education", "contact"].map((id) => (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className="hover:text-blue-600"
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
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
                    <div className="space-y-4 text-sm font-medium">
                        {["home", "about", "skills", "projects", "achievements", "internships", "activities", "education", "contact"].map((id) => (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className="block text-blue-600 hover:text-blue-800"
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
