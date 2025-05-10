import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success('Paste deleted');
  };

  return (
    <div className="mt-10 px-4">
      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          className="w-full max-w-md p-3 rounded-md border border-slate-400 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          type="search"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Paste List */}
      <div className="flex flex-col gap-6 mt-8 max-w-3xl mx-auto">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div key={paste._id} className="rounded-lg border border-slate-300 bg-white shadow-md p-5 transition hover:shadow-lg">
              <div className="text-lg font-semibold text-slate-800">{paste.title || 'Untitled Paste'}</div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => navigate(`/edit/${paste._id}`)}
                  className="px-4 py-1.5 rounded-md bg-slate-600 hover:bg-slate-700 text-white text-sm transition"
                >
                  Edit
                </button>

                <a
                  href={`/pastes/${paste?._id}`}
                  className="px-4 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
                >
                  View
                </a>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard
                      .writeText(paste?.content)
                      .then(() => toast.success('Copied to clipboard'))
                      .catch(() => toast.error('Failed to copy'));
                  }}
                  className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition"
                >
                  Copy
                </button>

                <button
                  onClick={() => {
                    const shareLink = `${window.location.origin}/paste/${paste?._id}`;
                    navigator.clipboard
                      .writeText(shareLink)
                      .then(() => toast.success('Share link copied!'))
                      .catch(() => toast.error('Failed to generate share link'));
                  }}
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                >
                  Share
                </button>
              </div>

              <div className="text-sm text-gray-500 mt-3">{new Date(paste.createdAt).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
