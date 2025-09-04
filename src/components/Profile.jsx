import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Profile = () => {
    // State to hold the user's profile data
    const [data, setData] = useState({
        _id: '',
        name: '',
        phno: '',
        designation: '',
        department: ''
    });

    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the user's authentication token from cookies
        const token = Cookies.get('lgc');
        if (!token) {
            // If no token exists, redirect to the login page
            navigate('/login');
            return;
        }

        try {
            // Parse the token to get the user ID
            const user = JSON.parse(token);
            // Fetch user data from the backend using their UID
            axios.get(`http://localhost:5000/home/${user.uid}`)
                .then((res) => {
                    const fetchedData = res.data;
                    // Check if the phone number from the server starts with '+91'
                    // and if so, strip it before setting the state.
                    if (fetchedData.phno && fetchedData.phno.startsWith('+91')) {
                        const strippedPhno = fetchedData.phno.substring(3);
                        setData({ ...fetchedData, phno: strippedPhno });
                    } else {
                        setData(fetchedData);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setMsg('Failed to load profile data. Please check your network connection.');
                });
        } catch (e) {
            console.error("Failed to parse user cookie", e);
            navigate('/login');
        }
    }, [navigate]);

    // Handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phno') {
            // Allow only digits for the phone number and limit to 10 characters
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length <= 10) {
                setData({ ...data, [name]: digitsOnly });
            }
        } else {
            setData({ ...data, [name]: value });
        }
    };

    // Function to handle profile update submission
    const updateProfile = () => {
        const { name, phno, designation, department } = data;

        // Validate that all fields are filled
        if (!name || !phno || !designation || !department) {
            setMsg('Please fill in all fields.');
            return;
        }

        // Validate phone number format (10 digits starting with 6, 7, 8, or 9)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phno)) {
            setMsg('Phone number must start with 6, 7, 8, or 9 and be 10 digits.');
            return;
        }

        // Send a PUT request to the backend to update the user's profile
        axios.put('http://localhost:5000/upd', data)
            .then((res) => {
                setMsg(res.data.msg);
                // Navigate to the home page after a successful update
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                setMsg('Update failed. Please try again.');
            });
    };

    return (
        <div className='relative flex min-h-screen w-screen flex-col items-center justify-center px-4 pt-16 bg-gradient-to-br from-indigo-950 to-gray-900'>
            {/* Animated Background from Landing Page */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
            </div>
            
            {/* Profile Card Container */}
            <div className='relative z-10 w-full max-w-md rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl border border-gray-800 space-y-6'>
                <div className="flex items-center justify-between mb-6">
                    <button className="flex items-center gap-2 text-gray-400 font-medium transition-colors hover:text-indigo-500" onClick={() => navigate('/home')}>
                        <FaArrowLeft /> Back
                    </button>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center flex-grow">Edit Profile</h2>
                    <div className="w-12"></div> {/* Spacer to keep title centered */}
                </div>

                {/* Message Display */}
                {msg && (
                    <div className={`mb-4 p-3 text-sm rounded-lg border text-center ${msg.toLowerCase().includes('success') ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-red-900/30 text-red-300 border-red-700'}`}>
                        {msg}
                    </div>
                )}

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="_id" className="block text-sm font-medium text-gray-400 mb-1">Email (Cannot be edited)</label>
                        <input
                            id="_id"
                            type='email'
                            name='_id'
                            readOnly
                            value={data._id}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-500 cursor-not-allowed outline-none focus:ring-1 focus:ring-gray-600 transition-shadow'
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input
                            id="name"
                            type='text'
                            name='name'
                            placeholder='Full Name'
                            onChange={handleChange}
                            value={data.name}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow'
                        />
                    </div>
                    <div>
                        <label htmlFor="phno" className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                        <input
                            id="phno"
                            type='tel'
                            name='phno'
                            inputMode='numeric'
                            pattern='[6-9][0-9]{9}'
                            placeholder='Phone Number'
                            onChange={handleChange}
                            value={data.phno}
                            maxLength={10}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow'
                        />
                    </div>
                    <div>
                        <label htmlFor="designation" className="block text-sm font-medium text-gray-400 mb-1">Designation</label>
                        <input
                            id="designation"
                            type='text'
                            name='designation'
                            placeholder='Designation'
                            onChange={handleChange}
                            value={data.designation}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow'
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-1">Department</label>
                        <input
                            id="department"
                            type='text'
                            name='department'
                            placeholder='Department'
                            onChange={handleChange}
                            value={data.department}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow'
                        />
                    </div>
                </div>

                {/* Save Changes Button */}
                <button 
                    onClick={updateProfile} 
                    className='mt-6 w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-3 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden'
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
                    <span className="relative z-10">Save Changes</span>
                </button>
            </div>
        </div>
    );
};

export default Profile;
