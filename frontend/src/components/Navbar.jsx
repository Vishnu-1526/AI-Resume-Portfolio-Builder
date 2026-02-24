import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ATS</span>
          </div>
          <span className="font-bold text-gray-900 text-lg hidden sm:block">
            AI Resume & Portfolio Builder
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {[
            { path: '/', label: 'Home' },
            { path: '/builder', label: 'Build Resume' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                pathname === path
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
