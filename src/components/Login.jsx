import React, { useContext, useState } from 'react';
import Ct from './Ct';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

export default function Login() {
    const [data, setData] = useState({ _id: '', pwd: '' });
    const [msg, setMsg] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const obj = useContext(Ct);
    const navigate = useNavigate();

    const fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const log = async () => {
        if (!data._id.trim() || !data.pwd.trim()) {
            setMsg('Please enter both email and password.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/login', data);
            if (res.data.token !== undefined) {
                Cookies.set('lgc', JSON.stringify(res.data), { expires: 2 });
                obj.updstate(res.data);

                if (res.data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                }
            } else {
                setMsg(res.data.msg);
            }
        } catch (err) {
            console.error('Login error:', err.message);
            setMsg('Server error. Please try again later.');
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
                className="absolute left-4 top-20 flex items-center gap-2 text-gray-400 font-medium transition-colors hover:text-indigo-500"
                onClick={() => navigate('/reg')}
            >
                <FaArrowLeft /> Back
            </button>

            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-gray-900/50 backdrop-blur-sm p-8 shadow-xl border border-gray-800">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Login</h2>

                {msg && (
                    <div className={`mb-4 p-3 text-sm rounded-lg border text-center bg-red-900/30 text-red-300 border-red-700`}>
                        {msg}
                    </div>
                )}

                <input
                    type="email"
                    name="_id"
                    placeholder="Enter Email"
                    onChange={fun}
                    value={data._id}
                    className="mb-4 w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
                />

                <div className="relative mb-6">
                    <input
                        type={showPwd ? 'text' : 'password'}
                        name="pwd"
                        placeholder="Enter Password"
                        onChange={fun}
                        value={data.pwd}
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-shadow"
                    />
                    <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                        onClick={() => setShowPwd(!showPwd)}
                    >
                        {showPwd ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <button
                    onClick={log}
                    className='w-full relative group bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-3 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 overflow-hidden'
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
                    <span className="relative z-10">CONTINUE</span>
                </button>
            </div>
        </div>
    );
}
