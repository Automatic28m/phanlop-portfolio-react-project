import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow fixed w-full z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-xl font-bold text-blue-600">Phanlop's Portfolio</div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 text-sm font-medium">
                        <a href="#hero" className="hover:text-blue-600">Home</a>
                        <a href="#about" className="hover:text-blue-600">About</a>
                        <a href="#skills" className="hover:text-blue-600">Skills</a>
                        <a href="#projects" className="hover:text-blue-600">Projects</a>
                        <a href="#achievements" className="hover:text-blue-600">Achievements</a>
                        <a href="#internships" className="hover:text-blue-600">Internships</a>
                        <a href="#activities" className="hover:text-blue-600">Activities</a>
                        <a href="#education" className="hover:text-blue-600">Education</a>
                        <a href="#contact" className="hover:text-blue-600">Contact</a>
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
                    <div className="space-y-4 text-sm font-medium">
                        <a href="#hero" className="block text-blue-600 hover:text-blue-800">Home</a>
                        <a href="#about" className="block text-blue-600 hover:text-blue-800">About</a>
                        <a href="#skills" className="block text-blue-600 hover:text-blue-800">Skills</a>
                        <a href="#projects" className="block text-blue-600 hover:text-blue-800">Projects</a>
                        <a href="#achievements" className="block text-blue-600 hover:text-blue-800">Achievements</a>
                        <a href="#internships" className="block text-blue-600 hover:text-blue-800">Internships</a>
                        <a href="#activities" className="block text-blue-600 hover:text-blue-800">Activities</a>
                        <a href="#education" className="block text-blue-600 hover:text-blue-800">Education</a>
                        <a href="#contact" className="block text-blue-600 hover:text-blue-800">Contact</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}
