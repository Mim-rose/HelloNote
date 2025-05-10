import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleValueChange = (e) => setValue(e.target.value);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    pasteId ? dispatch(updateToPastes(paste)) : dispatch(addToPastes(paste));
    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className="w-full px-4 py-8 flex justify-center bg-slate-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-5">
        <h2 className="text-xl font-semibold text-slate-700 text-center">
          {pasteId ? 'Edit Your Paste' : 'Create a New Paste'}
        </h2>

        <input
          type="text"
          placeholder="Optional: Title for your paste"
          value={title}
          onChange={handleTitleChange}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 transition"
        />

        <textarea
          value={value}
          placeholder="Paste your text here..."
          onChange={handleValueChange}
          rows={12}
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 transition resize-none"
        />
                <div className="flex justify-end">
          <button
            onClick={createPaste}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-md font-medium transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            {pasteId ? 'Update Paste' : 'Create Paste'}
          </button>
        </div>




      </div>
    </div>
  );
};

export default Home;
