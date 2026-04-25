import React, { useState } from "react";
import AddJob from "./AddJob";
import JobListings from "./JobListings";

const Seller = () => {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="text-teal-600 mt-1">Manage your job postings and applications</p>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-teal-100 mb-6">
        <button
          className={`py-3 px-6 font-medium rounded-t-lg transition-all ${
            activeTab === "listings"
              ? "bg-teal-500 text-white"
              : "bg-white text-gray-500 hover:text-teal-600 hover:bg-teal-50"
          }`}
          onClick={() => setActiveTab("listings")}
        >
          Job Listings
        </button>
        <button
          className={`py-3 px-6 font-medium rounded-t-lg transition-all ${
            activeTab === "add"
              ? "bg-teal-500 text-white"
              : "bg-white text-gray-500 hover:text-teal-600 hover:bg-teal-50"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add New Job
        </button>
      </div>

      {/* Content */}
      <main>
        {activeTab === "listings" ? <JobListings /> : <AddJob />}
      </main>
    </div>
  );
};

export default Seller;