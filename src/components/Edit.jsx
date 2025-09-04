import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const Edit = () => {
    // State to hold the user data to be edited
    const [data, setData] = useState({
        _id: '',
        name: '',
        phno: '',
        designation: '',
        department: ''
    });
    // Get the user ID from the URL parameters
    const { pid } = useParams();
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // useEffect hook to fetch the user data when the component mounts
    useEffect(() => {
        setLoading(true);
        // Fetch the user data from the backend using the user's ID
        axios.get(`http://localhost:5000/edit/${pid}`)
            .then((res) => {
                // Check if data was returned before setting state
                if (res.data) {
                    setData(res.data);
                } else {
                    setMsg("Failed to load user data: Invalid response.");
                }
                setLoading(false);
            })
            .catch((err) => {
                setMsg("Failed to load user data. Please check the backend connection.");
                setLoading(false);
                console.error(err);
            });
    }, [pid]);

    // Function to handle the update of the user's data
    const upd = () => {
        // Basic validation to ensure all fields are filled
        if (!data.name || !data.phno || !data.designation || !data.department) {
            setMsg("Please fill in all fields.");
            return;
        }
        // Send a PUT request to the backend to update the user data
        axios.put("http://localhost:5000/upd", data)
            .then((res) => {
                setMsg(res.data.msg);
                // Navigate to the admin page after a successful update
                setTimeout(() => {
                    navigate("/admin");
                }, 1500);
            })
            .catch((err) => {
                setMsg("Update failed. Please check the backend connection.");
                console.error(err);
            });
    };

    // Function to update the state as the user types in the input fields
    const fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Show a loading state with an animated skeleton while fetching data
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
                    Loading user data...
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen w-screen flex-col items-center justify-start px-4 pt-16 pb-12 bg-gradient-to-br from-indigo-950 to-gray-900 font-sans">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl border border-gray-800 space-y-6 mt-16">
                <div className="flex items-center justify-between mb-6">
                    <button className="flex items-center gap-2 text-gray-400 font-medium transition-colors hover:text-indigo-400" onClick={() => navigate("/admin")}>
                        <FaArrowLeft /> Back
                    </button>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center flex-grow">
                        Update User
                    </h2>
                    <div className="w-16"></div> {/* Spacer to keep title centered */}
                </div>

                {msg && (
                    <div className={`mb-4 p-3 text-sm rounded-lg border text-center ${msg.toLowerCase().includes('success') ? 'bg-green-800/70 text-green-300 border-green-700' : 'bg-red-800/70 text-red-300 border-red-700'}`}>
                        {msg}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="_id" className="block text-sm font-medium text-gray-400 mb-1">Email (Cannot be edited)</label>
                        <input
                            id="_id"
                            type='email'
                            name='_id'
                            readOnly
                            value={data._id}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input
                            id="name"
                            type='text'
                            name='name'
                            placeholder='Full Name'
                            onChange={fun}
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
                            placeholder='Phone Number'
                            onChange={fun}
                            value={data.phno}
                            pattern="[0-9]{10}"
                            maxLength="10"
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
                            onChange={fun}
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
                            onChange={fun}
                            value={data.department}
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow'
                        />
                    </div>
                </div>

                <button onClick={upd} className='mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
                    Update User
                </button>
            </div>
        </div>
    );
};

export default Edit;
