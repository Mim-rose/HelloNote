import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateToPastes } from '../redux/pasteSlice';

const EditPaste = () => {
  const { id } = useParams();
  const paste = useSelector((state) =>
    state.paste.pastes.find((paste) => paste._id === id)
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setContent(paste.content);
    }
  }, [paste]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPaste = { ...paste, title, content };
    dispatch(updateToPastes(updatedPaste));
    navigate(`/pastes/${id}`);
  };

  if (!paste) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-slate-700">Edit Your Paste</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Edit Content"
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700 transition"
            >
              Update Paste
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaste;
