import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react'; // Feather-style icon

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((paste) => paste._id === id);

  // Handle paste not found
  if (!paste) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Paste not found.
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content)
      .then(() => toast.success('Copied to clipboard!'))
      .catch(() => toast.error('Failed to copy!'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 transition-all duration-300">

        {/* Header with Copy Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">View Paste</h2>
          <button onClick={handleCopy}
     className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium rounded-md transition">
  <Copy size={18} /> Copy
</button>

        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
          <textarea
            value={paste.content}
            disabled
            rows={12}
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-700 bg-gray-100 cursor-not-allowed resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
