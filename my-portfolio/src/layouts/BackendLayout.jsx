import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

function BackendLayout({ children }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            {/* Fixed Sidebar */}
            <div className="w-fit fixed top-0 left-0 h-screen z-40 hidden md:block">
                <Sidebar />
            </div>

            {isNavbarOpen ? (
                <>
                    <div className="w-fit fixed top-0 left-0 h-screen z-40 md:block">
                        <Sidebar />
                    </div>
                </>
            ) : (
                <></>
            )}

            <div className="flex md:hidden z-50 fixed m-2 w-[30px] h-[30px] text-slate-500 bg-slate-300 p-3 rounded-full items-center justify-center">
                <button
                    onClick={() =>
                        isNavbarOpen
                            ? setIsNavbarOpen(false)
                            : setIsNavbarOpen(true)
                    }
                >
                    {isNavbarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {isNavbarOpen ? (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-30"></div>
            ) : (
                <></>
            )}

            {/* Content next to sidebar */}
            <div className="md:ml-44 flex-1 bg-slate-100 px-3">
                <Outlet />
            </div>
        </div>
    );
}

export default BackendLayout;
