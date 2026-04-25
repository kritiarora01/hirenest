import React, { useState, useContext } from "react";
import { FiMenu, FiX, FiBriefcase } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white border-b border-teal-100 sticky top-0 z-50 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-md">
              <FiBriefcase className="text-white" size={16} />
            </div>
            <span className="text-gray-900 font-bold text-xl tracking-tight">
              Hire<span className="text-teal-500">Nest</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/all-jobs"
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive ? "text-teal-600 font-semibold" : "text-gray-600 hover:text-teal-600"
                }`
              }
            >
              Browse Jobs
            </NavLink>
            <Link
              to={user ? "/seller" : "/login"}
              className="text-teal-600 hover:text-teal-700 text-sm font-semibold tracking-wide transition-colors duration-200"
            >
              POST A JOB
            </Link>

            {user ? (
              <>
                <span className="text-gray-700 text-sm font-medium">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-teal-600 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white px-4 py-4 border-t border-teal-100"
        >
          <nav className="flex flex-col space-y-3">
            <Link to="/all-jobs" onClick={() => setMenuOpen(false)} className="text-gray-700 py-2">Browse Jobs</Link>
            <Link to={user ? "/seller" : "/login"} onClick={() => setMenuOpen(false)} className="text-teal-600 font-semibold py-2">Post a Job</Link>
            {user ? (
              <>
                <span className="text-gray-700 text-sm py-2">Hi, {user.name}</span>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-red-400 text-left py-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 py-2">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-teal-500 text-white px-4 py-2 rounded-full text-center">Sign Up</Link>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;