import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJobs, updateJob, deleteJob } from "../api/jobs";
import {
  FiBriefcase, FiMapPin, FiDollarSign, FiClock,
  FiEdit2, FiTrash2, FiEye, FiSearch, FiFilter,
  FiX, FiSave, FiCheck, FiXCircle,
} from "react-icons/fi";
import Swal from "sweetalert2";

const JobListings = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };
    if (user) fetchJobs();
  }, [user]);

  useEffect(() => {
    let result = jobs;
    if (searchTerm) result = result.filter(j =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (statusFilter !== "all") result = result.filter(j => j.status === statusFilter);
    if (locationFilter) result = result.filter(j => j.location.toLowerCase().includes(locationFilter.toLowerCase()));
    if (typeFilter !== "all") result = result.filter(j => j.remoteOnsite === typeFilter);
    if (priceRange.min) result = result.filter(j => parseInt(j.price || 0) >= parseInt(priceRange.min));
    if (priceRange.max) result = result.filter(j => parseInt(j.price || 0) <= parseInt(priceRange.max));
    setFilteredJobs(result);
  }, [searchTerm, statusFilter, locationFilter, typeFilter, priceRange, jobs]);

  const formatPrice = (price) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);

  const getTimeAgo = (dateString) => {
    const diffInHours = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60));
    return diffInHours < 24 ? `${diffInHours} hours ago` : `${Math.floor(diffInHours / 24)} days ago`;
  };

  const clearFilters = () => { setSearchTerm(""); setStatusFilter("all"); setLocationFilter(""); setTypeFilter("all"); setPriceRange({ min: "", max: "" }); };
  const hasActiveFilters = searchTerm || statusFilter !== "all" || locationFilter || typeFilter !== "all" || priceRange.min || priceRange.max;

  const handleEditClick = (job) => {
    setEditingJobId(job._id);
    setEditFormData({ ...job, technologies: job.technologies.join(", ") });
  };
  const handleEditChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleSaveClick = async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const updatedJob = await updateJob(jobId, { ...editFormData, technologies: editFormData.technologies.split(",").map(t => t.trim()).filter(Boolean) }, token);
      setJobs(jobs.map(j => j._id === jobId ? updatedJob : j));
      setEditingJobId(null);
      Swal.fire({ icon: "success", title: "Updated!", timer: 2000, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to update job." });
    } finally { setLoading(false); }
  };

  const handleDeleteJob = async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      await deleteJob(jobId, token);
      setJobs(jobs.filter(j => j._id !== jobId));
      setDeleteConfirm(null);
      Swal.fire({ icon: "success", title: "Deleted!", timer: 2000, showConfirmButton: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed to delete job." });
    } finally { setLoading(false); }
  };

  const inputClass = "w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none text-sm";

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-0">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Your Job Listings</h1>
          <p className="text-teal-600">Manage and track all your posted jobs in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Jobs", value: jobs.length, color: "teal", icon: <FiBriefcase /> },
            { label: "Active Jobs", value: jobs.filter(j => j.status === "active").length, color: "blue", icon: <FiEye /> },
            { label: "Applications", value: 24, color: "purple", icon: <FiBriefcase /> },
            { label: "Total Value", value: formatPrice(jobs.reduce((s, j) => s + parseInt(j.price || 0), 0)), color: "amber", icon: <FiDollarSign /> },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-xl shadow-sm p-4 border-l-4 border-${stat.color}-400`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-700`}>{stat.value}</p>
                </div>
                <div className={`bg-${stat.color}-100 p-3 rounded-full text-${stat.color}-500 text-lg`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-lg w-full justify-center">
            <FiFilter />{isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filter Sidebar */}
          <div className={`lg:w-1/4 bg-white rounded-xl shadow-sm border border-teal-100 p-5 h-fit ${isFilterOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2"><FiFilter className="text-teal-500" />Filters</h2>
              {hasActiveFilters && <button onClick={clearFilters} className="text-xs text-teal-600 hover:text-teal-800">Clear All</button>}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={13} />
                  <input type="text" placeholder="Search jobs..." className={`${inputClass} pl-9`} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Status</label>
                <select className={inputClass} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Location</label>
                <input type="text" placeholder="Filter by location..." className={inputClass} value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Job Type</label>
                <select className={inputClass} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Price Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Min $" className={inputClass} value={priceRange.min} onChange={e => setPriceRange({ ...priceRange, min: e.target.value })} />
                  <input type="number" placeholder="Max $" className={inputClass} value={priceRange.max} onChange={e => setPriceRange({ ...priceRange, max: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl border border-teal-100 p-4 mb-5 flex justify-between items-center">
              <p className="text-sm text-gray-600">Showing <strong>{filteredJobs.length}</strong> of <strong>{jobs.length}</strong> jobs</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center text-xs text-red-500 hover:text-red-700">
                  <FiX className="mr-1" />Clear filters
                </button>
              )}
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-teal-50 rounded-2xl p-10 text-center border border-teal-100">
                <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <FiBriefcase className="text-teal-500 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No jobs found</h3>
                <p className="text-gray-400 text-sm mb-4">Try adjusting your filters or create a new job posting</p>
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full text-sm transition-all">Post a Job</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <div key={job._id} className="bg-white rounded-2xl border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all overflow-hidden">
                    <div className="p-5">
                      {editingJobId === job._id ? (
                        <div className="space-y-3">
                          {["title", "company", "location"].map(field => (
                            <input key={field} type="text" name={field} value={editFormData[field]} onChange={handleEditChange} className={inputClass} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
                          ))}
                          <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} className={inputClass} placeholder="Price" />
                          <select name="remoteOnsite" value={editFormData.remoteOnsite} onChange={handleEditChange} className={inputClass}>
                            <option value="Onsite">Onsite</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                          <textarea name="description" value={editFormData.description} onChange={handleEditChange} rows="3" className={inputClass} placeholder="Description" />
                          <input type="text" name="technologies" value={editFormData.technologies} onChange={handleEditChange} className={inputClass} placeholder="Technologies (comma separated)" />
                          <div className="flex justify-between pt-1">
                            <button onClick={() => handleSaveClick(job._id)} disabled={loading} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50">
                              <FiSave size={14} />{loading ? "Saving..." : "Save"}
                            </button>
                            <button onClick={() => { setEditingJobId(null); setEditFormData({}); }} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">
                              <FiXCircle size={14} />Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
                                {job.company?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 text-sm">{job.title}</h3>
                                <p className="text-teal-600 text-xs">{job.company}</p>
                              </div>
                            </div>
                            <span className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full border border-teal-200">Active</span>
                          </div>

                          <div className="space-y-1.5 mb-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5"><FiMapPin className="text-teal-400" size={11} />{job.location}</div>
                            <div className="flex items-center gap-1.5"><FiDollarSign className="text-teal-400" size={11} /><span className="font-semibold text-gray-700">{formatPrice(job.price)}</span></div>
                            <div className="flex items-center gap-1.5"><FiClock className="text-teal-400" size={11} />{getTimeAgo(job.createdAt)}</div>
                          </div>

                          <p className="text-gray-500 text-xs line-clamp-2 mb-3">{job.description}</p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {job.technologies.slice(0, 3).map((tech, i) => (
                              <span key={i} className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full">{tech}</span>
                            ))}
                            {job.technologies.length > 3 && <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">+{job.technologies.length - 3}</span>}
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                            <span className="text-xs text-teal-600 font-medium">{job.remoteOnsite}</span>
                            <div className="flex gap-1">
                              <button className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"><FiEye size={14} /></button>
                              <button onClick={() => handleEditClick(job)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><FiEdit2 size={14} /></button>
                              {deleteConfirm === job._id ? (
                                <div className="flex gap-1">
                                  <button onClick={() => handleDeleteJob(job._id)} disabled={loading} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><FiCheck size={14} /></button>
                                  <button onClick={() => setDeleteConfirm(null)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"><FiX size={14} /></button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirm(job._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><FiTrash2 size={14} /></button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
