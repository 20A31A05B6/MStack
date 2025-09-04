import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const t = Cookies.get("lgc");

        if (!t) {
            navigate("/login");
            return;
        }

        const cobj = JSON.parse(t);

        axios.get(`http://localhost:5000/home/${cobj.uid}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    if (loading) {
        return (
            <div className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-gray-900">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                    <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
                </div>
                <div className="relative z-10 text-center text-gray-400 text-lg font-medium animate-pulse">
                    Loading profile...
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen w-screen flex-col items-center justify-center px-4 pt-16 bg-gradient-to-br from-indigo-950 to-gray-900">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
            </div>
            
            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl border border-gray-800 space-y-6">
                {/* Profile Header */}
                <div className="text-center">
                    <FaUserCircle className="mx-auto text-6xl mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" />
                    <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Welcome, {data?.name || 'User'}!
                    </h2>
                    <p className="text-gray-400 mt-2">
                        {data ? "Here’s your account information" : "Complete your profile to get started"}
                    </p>
                </div>

                {data ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm border border-gray-700 sm:col-span-2">
                                <span className="block text-sm font-medium text-gray-400">Name</span>
                                <span className="block text-lg text-white">{data.name}</span>
                            </div>
                            <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm border border-gray-700 sm:col-span-2">
                                <span className="block text-sm font-medium text-gray-400">Email</span>
                                <span className="block text-lg text-white">{data.email || data._id}</span>
                            </div>
                            <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm border border-gray-700">
                                <span className="block text-sm font-medium text-gray-400">Designation</span>
                                <span className="block text-lg text-white">{data.designation}</span>
                            </div>
                            <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm border border-gray-700">
                                <span className="block text-sm font-medium text-gray-400">Department</span>
                                <span className="block text-lg text-white">{data.department}</span>
                            </div>
                            <div className="bg-gray-800/70 p-4 rounded-xl shadow-sm sm:col-span-2 border border-gray-700">
                                <span className="block text-sm font-medium text-gray-400">Phone Number</span>
                                <span className="block text-lg text-white">{data.phno}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold text-white">No Profile Data Available</h3>
                        <p className="text-gray-400">
                            It looks like your profile information is missing. Complete your profile to unlock personalized features.
                        </p>
                        <button
                            onClick={() => navigate('/reg')}
                            className="w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-3 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
                            <span className="relative z-10">Complete Your Profile</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
