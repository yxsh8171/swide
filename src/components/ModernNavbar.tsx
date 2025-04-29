
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ModernNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">XALEY</Link>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm">
          <Link to="/about" className="text-white/70 hover:text-white">ABOUT US</Link>
          <Link to="/services" className="text-white/70 hover:text-white">SERVICES</Link>
          <Link to="/projects" className="text-white/70 hover:text-white">PROJECTS</Link>
          <Link to="/contact" className="text-white/70 hover:text-white">CONTACT</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm text-white/70 hover:text-white">LOGIN</Link>
          <Link to="/create" className="text-sm px-4 py-2 border border-white/40 hover:border-white rounded-sm">
            START PROJECT
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-white/10">
          <nav className="flex flex-col space-y-4">
            <Link to="/about" className="text-white/70 hover:text-white">ABOUT US</Link>
            <Link to="/services" className="text-white/70 hover:text-white">SERVICES</Link>
            <Link to="/projects" className="text-white/70 hover:text-white">PROJECTS</Link>
            <Link to="/contact" className="text-white/70 hover:text-white">CONTACT</Link>
            <Link to="/login" className="text-white/70 hover:text-white">LOGIN</Link>
            <Link to="/create" className="text-sm px-4 py-2 border border-white/40 hover:border-white rounded-sm inline-block w-fit">
              START PROJECT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default ModernNavbar;
