import React from 'react';

const JobForm = ({ formData, onChange, onSubmit, loading, buttonLabel = "Submit" }) => {
return (
    <form onSubmit={onSubmit} className="space-y-4">
    <input
        type="text" name="title" placeholder="Job Title"
        value={formData.title || ''} onChange={onChange} required
        className="w-full px-4 py-3 rounded-lg bg-transparent border border-green-700 text-white text-sm outline-none focus:border-green-500"
    />
    <input
        type="text" name="company" placeholder="Company Name"
        value={formData.company || ''} onChange={onChange} required
        className="w-full px-4 py-3 rounded-lg bg-transparent border border-green-700 text-white text-sm outline-none focus:border-green-500"
    />
    <input
        type="text" name="location" placeholder="Location"
        value={formData.location || ''} onChange={onChange} required
        className="w-full px-4 py-3 rounded-lg bg-transparent border border-green-700 text-white text-sm outline-none focus:border-green-500"
    />
    <textarea
        name="description" placeholder="Job Description"
        value={formData.description || ''} onChange={onChange} required rows={4}
        className="w-full px-4 py-3 rounded-lg bg-transparent border border-green-700 text-white text-sm outline-none focus:border-green-500"
    />
    <input
        type="number" name="price" placeholder="Salary (optional)"
        value={formData.price || ''} onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-transparent border border-green-700 text-white text-sm outline-none focus:border-green-500"
    />
    <select
        name="remoteOnsite" value={formData.remoteOnsite || 'Onsite'} onChange={onChange}
        className="w-full px-4 py-3 rounded-lg bg-[#0B1A0B] border border-green-700 text-white text-sm outline-none"
    >
        <option value="Onsite">Onsite</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
    </select>
    <button
        type="submit" disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-50"
    >
        {loading ? 'Submitting...' : buttonLabel}
    </button>
    </form>
);
};

export default JobForm;