import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const link = ({ isActive }:any) => `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`;
  return (
    <nav className="bg-slate-900 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-black text-xl text-white">
          <span className="bg-indigo-500 w-9 h-9 rounded-xl flex items-center justify-center">✓</span>
          TaskFlow
        </Link>
        <div className="flex gap-2">
          <NavLink to="/" className={link}>Tareas</NavLink>
          <NavLink to="/crear" className={link}>+ Nueva</NavLink>
        </div>
      </div>
    </nav>
  );
}