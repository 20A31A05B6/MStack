import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
    const [data, setData] = useState({
        _id: '',
        name: '',
        pwd: '',
        countryCode: '+91',
        phno: '',
        designation: '',
        department: ''
    });
    const [msg, setMsg] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Regex
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*@[a-z]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-z ]{4,}$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlePhoneInput = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 10) {
            setData({ ...data, phno: value });
        }
    };

    const reg = async () => {
        if (!data._id || !data.name || !data.pwd || !data.phno || !data.designation || !data.department) {
            setMsg("Please fill all required fields.");
            return;
        }
        if (!emailRegex.test(data._id)) {
            setMsg("Please enter a valid email address.");
            return;
        }
        if (!nameRegex.test(data.name)) {
            setMsg("Enter a proper name using alphabets only.");
            return;
        }
        if (!phoneRegex.test(data.phno)) {
            setMsg("Phone number must be 10 digits and start with 6, 7, 8, or 9.");
            return;
        }

        try {
            let res = await axios.post("http://localhost:5000/reg", {
                ...data,
                phno: `${data.countryCode}${data.phno}`
            });

            if (res.data.msg === "Registration Successfull") {
                setMsg("Registration successful... Redirecting to login...");
                setIsRegistered(true);
                setData({
                    _id: '',
                    name: '',
                    pwd: '',
                    countryCode: '+91',
                    phno: '',
                    designation: '',
                    department: ''
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMsg(res.data.msg);
            }
        } catch (err) {
            setMsg("Server error. Please try again later.");
            console.error("Axios error:", err.message);
        }
    };

    const getInputBorder = (field, value) => {
        if (value === "") return "";
        switch (field) {
            case 'name':
                return nameRegex.test(value) ? 'border-green-500' : 'border-red-500';
            case '_id':
                return emailRegex.test(value) ? 'border-green-500' : 'border-red-500';
            case 'phno':
                return phoneRegex.test(value) ? 'border-green-500' : 'border-red-500';
            default:
                return value ? 'border-green-500' : 'border-red-500';
        }
    };

    return (
        <div className='relative flex min-h-screen w-screen flex-col items-center justify-center px-4 pt-16 bg-gradient-to-br from-indigo-950 to-gray-900'>
            {/* Animated Background from Landing Page */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
            </div>

            {/* Back Button */}
            <button
                className="absolute top-20 left-4 flex items-center gap-2 text-gray-400 font-medium transition-colors hover:text-indigo-500"
                onClick={() => navigate("/")}
            >
                <FaArrowLeft /> Back
            </button>

            <div className="relative z-10 w-full max-w-lg rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl border border-gray-800">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {isRegistered ? "Registration Successful" : "Create Your Account"}
                </h2>

                {msg && (
                    <div className={`mb-4 p-3 text-sm rounded-lg border text-center ${msg.toLowerCase().includes('success') ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-red-900/30 text-red-300 border-red-700'}`}>
                        {msg}
                    </div>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className={`w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow ${getInputBorder('name', data.name)}`}
                        onChange={handleChange}
                        value={data.name}
                        disabled={isRegistered}
                    />

                    <input
                        type="email"
                        name="_id"
                        placeholder="Email Address"
                        className={`w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow ${getInputBorder('_id', data._id)}`}
                        onChange={handleChange}
                        value={data._id}
                        autoComplete="off"
                        disabled={isRegistered}
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="pwd"
                            placeholder="Password"
                            className={`w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow ${getInputBorder('pwd', data.pwd)}`}
                            onChange={handleChange}
                            value={data.pwd}
                            disabled={isRegistered}
                        />
                        <span
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-2">
                        <select
                            name="countryCode"
                            value={data.countryCode}
                            onChange={handleChange}
                            disabled={isRegistered}
                            className="w-32 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
                        >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">�🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+81">🇯🇵 +81</option>
                        </select>
                        <input
                            type="text"
                            name="phno"
                            placeholder="Phone Number"
                            className={`flex-1 px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow ${getInputBorder('phno', data.phno)}`}
                            onInput={handlePhoneInput}
                            value={data.phno}
                            maxLength="10"
                            disabled={isRegistered}
                        />
                    </div>

                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        className={`w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow ${getInputBorder('designation', data.designation)}`}
                        onChange={handleChange}
                        value={data.designation}
                        disabled={isRegistered}
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Department"
                        className={`w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow ${getInputBorder('department', data.department)}`}
                        onChange={handleChange}
                        value={data.department}
                        disabled={isRegistered}
                    />
                </div>

                {/* Button */}
                <div className="mt-6">
                    <button
                        onClick={reg}
                        disabled={isRegistered}
                        className='w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-3 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden disabled:opacity-50'
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
                        <span className="relative z-10">SIGN UP</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
