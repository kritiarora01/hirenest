import React from 'react';
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi';

const JobCard = ({ job }) => {
const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
};

return (
    <div className="bg-[#0B1A0B] border border-green-900 rounded-xl p-5 hover:border-green-500 transition">
    <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold">
        {job.company?.charAt(0).toUpperCase()}
        </div>
        <div>
        <h3 className="text-white font-semibold text-sm">{job.title}</h3>
        <p className="text-gray-400 text-xs">{job.company}</p>
        </div>
    </div>
    <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-3">
        <span className="flex items-center gap-1"><FiMapPin size={12} /> {job.location}</span>
        {job.price && <span className="flex items-center gap-1"><FiDollarSign size={12} /> {job.price}</span>}
        <span className="flex items-center gap-1"><FiBriefcase size={12} /> {job.remoteOnsite}</span>
        <span className="flex items-center gap-1"><FiClock size={12} /> {getTimeAgo(job.createdAt)}</span>
    </div>
    {job.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-1">
        {job.technologies.map((tech, i) => (
            <span key={i} className="bg-green-900/50 text-green-400 text-xs px-2 py-0.5 rounded-full">{tech}</span>
        ))}
        </div>
    )}
    </div>
);
};

export default JobCard;