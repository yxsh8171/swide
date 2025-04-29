
import React from 'react';
import { Link } from 'react-router-dom';

const ModernFooter = () => {
  return (
    <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">XALEY</div>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com" className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://linkedin.com" className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-white/60">
          <div>© 2025 XALEY. All Rights Reserved.</div>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
