import React from "react";
import { Link } from "react-router";
import { FiSearch, FiBriefcase, FiUsers, FiTrendingUp } from "react-icons/fi";
import AllJobs from "./AllJobs";

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 px-4 border-b border-teal-100">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🚀 New jobs added daily
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Find Your <span className="text-teal-500">Dream Job</span> Today
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Thousands of opportunities from top companies. Browse, apply, and get hired.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-white border border-teal-200 rounded-full px-4 py-2 shadow-md max-w-xl mx-auto gap-2 mb-8">
            <FiSearch className="text-teal-400" size={18} />
            <input
              type="text"
              placeholder="Search job title, company, or keyword..."
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <Link to="/all-jobs" className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all">
              Search
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-1.5"><FiBriefcase className="text-teal-500" /> <span><strong className="text-gray-700">500+</strong> Jobs</span></div>
            <div className="flex items-center gap-1.5"><FiUsers className="text-teal-500" /> <span><strong className="text-gray-700">200+</strong> Companies</span></div>
            <div className="flex items-center gap-1.5"><FiTrendingUp className="text-teal-500" /> <span><strong className="text-gray-700">1k+</strong> Hired</span></div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <AllJobs />
    </div>
  );
};

export default Home;