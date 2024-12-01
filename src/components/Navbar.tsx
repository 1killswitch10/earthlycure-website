import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/images/logo.png';
import { HiMenu, HiX } from 'react-icons/hi';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="EarthlyCure Logo" className="h-10 sm:h-12" />
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-green-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-200">About</Link></li>
              <li><Link to="/consultation" className="hover:text-green-200">Consultation</Link></li>
              <li><Link to="/contact" className="hover:text-green-200">Contact</Link></li>
              <li><Link to="/posts" className="hover:text-green-200">Recent Posts</Link></li>
            </ul>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Welcome, {user.firstname}!</span>
                <button 
                  onClick={logout}
                  className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition-colors">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="mt-4 pb-4">
            <ul className="flex flex-col space-y-2">
              <li><Link to="/" className="block py-2 hover:text-green-200">Home</Link></li>
              <li><Link to="/about" className="block py-2 hover:text-green-200">About</Link></li>
              <li><Link to="/consultation" className="block py-2 hover:text-green-200">Consultation</Link></li>
              <li><Link to="/contact" className="block py-2 hover:text-green-200">Contact</Link></li>
              <li><Link to="/posts" className="block py-2 hover:text-green-200">Recent Posts</Link></li>
            </ul>
            <div className="mt-4 space-y-2">
              {isAuthenticated && user ? (
                <>
                  <div className="text-white">Welcome, {user.firstname}!</div>
                  <button 
                    onClick={logout}
                    className="w-full px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block w-full px-4 py-2 text-center rounded bg-yellow-600 hover:bg-yellow-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full px-4 py-2 text-center rounded bg-yellow-600 hover:bg-yellow-700 transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};