import React from 'react';
import { Film, Search, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLoginClick: () => void;
  onAdminClick: () => void;
  currentView: 'home' | 'admin';
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onLoginClick,
  onAdminClick,
  currentView
}) => {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <Film className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-white">
              Movie<span className="text-red-600">Box</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-red-500 transition-colors">Home</a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">Movies</a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">TV Shows</a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">My List</a>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center gap-4">
            {currentView === 'home' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/80 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-600 w-48 md:w-64"
                />
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <button
                    onClick={onAdminClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'admin' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="hidden md:inline">Admin</span>
                  </button>
                )}
                <div className="flex items-center gap-2 text-white">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
