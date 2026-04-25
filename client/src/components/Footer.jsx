import React from "react";
import { Link } from "react-router";
import { FiBriefcase, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-teal-100 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                <FiBriefcase className="text-white" size={15} />
              </div>
              <span className="text-gray-900 font-bold text-lg">Hire<span className="text-teal-500">Nest</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Connecting talent with opportunity. Find your next role or hire the right person today.
            </p>
            <div className="flex space-x-3">
              {[FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Jobs */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/all-jobs" className="hover:text-teal-600 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register" className="hover:text-teal-600 transition-colors">Create Account</Link></li>
              <li><Link to="/login" className="hover:text-teal-600 transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/add-job" className="hover:text-teal-600 transition-colors">Post a Job</Link></li>
              <li><Link to="/seller" className="hover:text-teal-600 transition-colors">My Listings</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Design & Creative</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Development & IT</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Marketing</li>
              <li className="hover:text-teal-600 cursor-pointer transition-colors">Data & Analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-teal-100 py-5 text-center text-xs text-gray-400">
        © HireNest 2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;