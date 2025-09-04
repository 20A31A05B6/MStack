import React, { useState, useEffect, useContext } from 'react';
import { ArrowRight, Sparkles, Users, TrendingUp, Zap, LogIn, UserPlus } from 'lucide-react';

// Mock context for demo - replace with your actual Context
const Ct = React.createContext({ state: { token: null, name: '' } });

// Main App Component to handle the overall layout
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Simulate a user login/logout
  useEffect(() => {
    // You could fetch a token or check local storage here
    const token = 'mock-token-123'; // Assume a user is logged in
    const name = 'user'; // Set a mock user name

    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const state = {
    token: isLoggedIn ? 'mock-token-123' : null,
    name: isLoggedIn ? userName : '',
  };

  return (
    <Ct.Provider value={{ state }}>
      <div className="bg-gray-900 min-h-screen">
        <LandingPage />
        <Footer />
      </div>
    </Ct.Provider>
  );
}

// LandingPage Component
const LandingPage = () => {
  const { state } = useContext(Ct);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigation = () => {
    if (state.token) {
      // Navigate to dashboard - replace with your navigation logic
      console.log('Navigate to /home');
    } else {
      // Navigate to login - replace with your navigation logic
      console.log('Navigate to /login');
    }
  };

  return (
    <div className="relative w-screen min-h-screen bg-transparent pt-32 pb-16 flex items-center justify-center">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-gray-800"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '4s' }}></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm pointer-events-none transition-all duration-200 ease-out opacity-60"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 w-screen px-6 text-center">

        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 px-6 py-3 rounded-full mb-8 text-sm font-medium">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
            {state.token ? 'Welcome back!' : 'Join our community'}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            {state.token ? (
              <>
                Hello, <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{state.name}</span>!
              </>
            ) : (
              <>
                Unlock Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Potential
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            {state.token
              ? 'Great to see you again! Head over to your dashboard to continue building, learning, and connecting with the community.'
              : 'Join our powerful platform to learn, grow, and collaborate with a vibrant community of creators and innovators.'}
          </p>

          {/* Main CTA Button */}
          <div className="mb-16">
            <button
              onClick={handleNavigation}
              className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 flex items-center gap-4 mx-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
              <span className="relative z-10">{state.token ? 'Go to Dashboard' : 'Explore Now'}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </button>
          </div>

          {/* Feature Highlights */}
          {!state.token && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
                <p className="text-gray-300">Join thousands of creators and innovators building the future together</p>
              </div>

              <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105" style={{ transitionDelay: '100ms' }}>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Grow</h3>
                <p className="text-gray-300">Access powerful tools and resources to accelerate your learning journey</p>
              </div>

              <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105" style={{ transitionDelay: '200ms' }}>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Achieve</h3>
                <p className="text-gray-300">Turn your ideas into reality with our comprehensive platform and support</p>
              </div>
            </div>
          )}

          {/* User Dashboard Preview for Logged in Users */}
          {state.token && (
            <div className="max-w-3xl mx-auto">
              {/* This section has been removed as per your request */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="w-full bg-gray-950/50 text-gray-400 text-center py-6 mt-auto border-t border-gray-800 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <p className="text-sm">© 2025 YourApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;
