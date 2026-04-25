import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { createJob } from "../api/jobs";
import { FiBriefcase, FiMapPin, FiDollarSign, FiFileText, FiCode, FiGlobe, FiPlus } from "react-icons/fi";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "", company: "", location: "", description: "",
    price: "", remoteOnsite: "Onsite", technologies: "", applyLink: "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-teal-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentication Required</h3>
          <p className="text-gray-500 mb-4">You need to be logged in to post a job.</p>
          <button onClick={() => window.location.href = '/login'} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return Swal.fire("Error", "You must be logged in to add a job", "error");

    const jobPayload = {
      ...formData,
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
    };

    try {
      setLoading(true);
      await createJob(jobPayload, token);
      Swal.fire({ title: "Success!", text: "Job posted successfully!", icon: "success", confirmButtonColor: "#0d9488" });
      setFormData({ title: "", company: "", location: "", description: "", price: "", remoteOnsite: "Onsite", technologies: "", applyLink: "" });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.msg || "Failed to create job", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2";

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Post a New Job</h1>
        <p className="text-teal-600">Reach qualified professionals with your job posting</p>
      </div>

      <div className="bg-white overflow-hidden">
        {/* Form Header Banner */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white rounded-2xl mb-6">
          <div className="flex items-center">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <FiPlus className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Create Job Listing</h2>
              <p className="opacity-90 text-sm">Fill in the details below to post your job</p>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div>
            <label className={labelClass}><FiBriefcase className="text-teal-500" />Job Title *</label>
            <input type="text" name="title" placeholder="e.g. Senior Web Developer" value={formData.title} onChange={handleChange} className={inputClass} required />
          </div>

          {/* Company & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input type="text" name="company" placeholder="Your company name" value={formData.company} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}><FiMapPin className="text-teal-500" />Location *</label>
              <input type="text" name="location" placeholder="e.g. New York, NY or Remote" value={formData.location} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          {/* Work Type & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}><FiGlobe className="text-teal-500" />Work Type *</label>
              <select name="remoteOnsite" value={formData.remoteOnsite} onChange={handleChange} className={inputClass}>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className={labelClass}><FiDollarSign className="text-teal-500" />Budget (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400 text-sm">$</span>
                <input type="number" name="price" placeholder="e.g. 5000" value={formData.price} onChange={handleChange} className={`${inputClass} pl-8`} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}><FiFileText className="text-teal-500" />Job Description *</label>
            <textarea name="description" placeholder="Describe the responsibilities, requirements, and benefits..." value={formData.description} onChange={handleChange} rows={5} className={inputClass} required />
          </div>

          {/* Technologies */}
          <div>
            <label className={labelClass}><FiCode className="text-teal-500" />Required Technologies</label>
            <input type="text" name="technologies" placeholder="e.g. React, Node.js, MongoDB (comma separated)" value={formData.technologies} onChange={handleChange} className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">Separate technologies with commas</p>
          </div>

          {/* Apply Link */}
          <div>
            <label className={labelClass}><FiGlobe className="text-teal-500" />Application Link (Optional)</label>
            <input type="url" name="applyLink" placeholder="e.g. https://forms.google.com/your-form" value={formData.applyLink} onChange={handleChange} className={inputClass} />
            <p className="text-xs text-gray-400 mt-1">Where should applicants apply?</p>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? (
                <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Posting Job...</>
              ) : "Post Job"}
            </button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-teal-50 rounded-2xl p-6 border border-teal-100">
        <h3 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Tips for a great job post
        </h3>
        <ul className="text-teal-700 text-sm space-y-2">
          {["Be specific about role responsibilities", "Include required skills and experience level", "Mention your company culture and benefits", "Add a budget range to attract qualified candidates"].map((tip, i) => (
            <li key={i} className="flex items-start gap-2"><span className="text-teal-400 mt-0.5">•</span>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddJob;
