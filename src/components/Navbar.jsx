import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText } from 'lucide-react'; // npm install lucide-react

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-slate-700 drop-shadow-sm tracking-tight">
        Note<span className="text-slate-500">Saver</span>
      </h1>

      <nav className="flex gap-6 text-slate-600">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 transition-colors duration-150 rounded-md hover:text-slate-700 hover:bg-slate-100 ${
              isActive ? 'text-slate-800 font-medium' : ''
            }`
          }
        >
          <Home className="w-5 h-5" />
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 transition-colors duration-150 rounded-md hover:text-slate-700 hover:bg-slate-100 ${
              isActive ? 'text-slate-800 font-medium' : ''
            }`
          }
        >
          <FileText className="w-5 h-5" />
          Pastes
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
