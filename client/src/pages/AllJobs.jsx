import { useEffect, useState } from "react";
import { getAllJobsPublic } from "../api/jobs";
import { FiBriefcase, FiDollarSign, FiMapPin, FiUser, FiClock, FiExternalLink } from "react-icons/fi";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobsPublic();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch public jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Jobs</h1>
          <p className="text-gray-500">Browse through our latest opportunities and find your perfect match</p>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-teal-50 rounded-2xl p-12 text-center border border-teal-100">
            <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <FiBriefcase className="text-teal-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No jobs available</h3>
            <p className="text-gray-400">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl border border-teal-100 hover:border-teal-400 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-50">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {job.company?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">{job.title}</h3>
                      <p className="text-teal-600 text-sm font-medium">{job.company}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">{job.description}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><FiMapPin size={11} />{job.location}</span>
                    {job.price && <span className="flex items-center gap-1 text-teal-600 font-semibold"><FiDollarSign size={11} />{Number(job.price).toLocaleString()}</span>}
                    <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{job.remoteOnsite}</span>
                  </div>

                  {job.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{tech}</span>
                      ))}
                      {job.technologies.length > 3 && (
                        <span className="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">+{job.technologies.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-5 py-4 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center">
                      <FiUser className="text-teal-600" size={12} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        <FiClock className="inline mr-1" size={10} />
                        {getTimeAgo(job.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => job.applyLink ? window.open(job.applyLink, '_blank') : alert('No apply link provided.')}
                    className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200"
                  >
                    Apply Now <FiExternalLink size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;