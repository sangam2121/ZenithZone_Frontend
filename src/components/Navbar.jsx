import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authenticate } from '../utils/auth';

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAuthenticated = await authenticate();
        if (isAuthenticated) {
          setLogin(true);
        }
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();

    if (localStorage.getItem('userImage')) {
      setImagePath(`http://127.0.0.1:8000${localStorage.getItem('userImage')}`);
    } else {
      setImagePath(`http://127.0.0.1:8000/media/default.png`);
    }
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-3 max-w-[1200px] mx-auto">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#F05423]">Zenith<span className="text-[#121F49]">Zone</span></span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {login ? (
            <div className="flex items-center gap-3">
              <p>{`Hi, ${localStorage.getItem('userName')}`}</p>
              <Link to={localStorage.getItem('userType') === 'doctor' ? '/doctor-dashboard' : '/user-dashboard'}>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button">
                  <img className="w-8 h-8 rounded-full" src={imagePath} alt="user photo" />
                </button>
              </Link>
            </div>
          ) : (
            <>
              <button type="button" className="text-white bg-[#121F49] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center me-3">
                <Link to="/register">Sign up</Link>
              </button>
              <button type="button" className="text-[#F05423] bg-[#FEEEE9] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center">
                <Link to="/login">Login</Link>
              </button>
            </>
          )}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <NavItem to="/" active={isActive('/')}>
              Home
            </NavItem>
            <NavItem to="/journal" active={isActive('/journal')}>
              Journal
            </NavItem>
            <NavItem to="/library" active={isActive('/library')}>
              Library
            </NavItem>
            <NavItem to="/book-psychiatrist" active={isActive('/book-psychiatrist')}>
              Book Psychiatrist
            </NavItem>
            <NavItem to="/contact" active={isActive('/contact')}>
              Contact
            </NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, active, children }) => (
  <li>
    <Link
      to={to}
      className={`block py-2 px-3 md:p-0 ${active ? 'text-[#F05423]': 'text-gray-900 hover:text-[#F05423]'}`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  </li>
);

export default Navbar;
