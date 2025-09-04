import { Link } from "react-router-dom";
import Ct from "./Ct";
import { useContext, useState } from "react";

// MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Nav = () => {
    const { state } = useContext(Ct);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-900/50 backdrop-blur-sm shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* The logo has been removed as per the request. */}

                    {/* Hamburger Menu for mobile */}
                    <button
                        className="sm:hidden p-2 rounded-md text-gray-400 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open menu</span>
                        <div className={`space-y-1.5 ${isOpen ? "open" : ""}`}>
                            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                            <span className={`block w-6 h-0.5 bg-current transition duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
                            <span className={`block w-6 h-0.5 bg-current transform transition duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                        </div>
                    </button>

                    {/* Main navigation links container */}
                    <div
                        className={`sm:flex flex-grow sm:items-center sm:justify-between ${
                            isOpen
                                ? "block absolute top-16 left-0 w-full bg-gray-900/50 backdrop-blur-sm shadow-md sm:static sm:shadow-none"
                                : "hidden"
                        } p-4 sm:p-0`}
                    >
                        {/* Left side links */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                            {state.token !== "" && state.role !== "admin" && (
                                <>
                                    <Link
                                        to="/home"
                                        className="flex items-center text-gray-400 hover:text-indigo-400 font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <DashboardIcon fontSize="small" className="mr-2" />
                                        User Dashboard
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center text-gray-400 hover:text-indigo-400 font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <AccountCircleIcon fontSize="small" className="mr-2" />
                                        My Profile
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Right side links */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-4 sm:mt-0">
                            {state.token === "" && (
                                <>
                                    <Link
                                        to="/reg"
                                        className="flex items-center font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <PersonAddIcon fontSize="small" className="mr-2" />
                                        Register
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="flex items-center font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LoginIcon fontSize="small" className="mr-2" />
                                        Login
                                    </Link>
                                </>
                            )}
                            {state.token !== "" && (
                                <Link
                                    to="/logout"
                                    className="flex items-center text-red-400 hover:text-red-300 font-medium px-3 py-2 rounded-md hover:bg-red-900/30 transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <LogoutIcon fontSize="small" className="mr-2" />
                                    Logout
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
