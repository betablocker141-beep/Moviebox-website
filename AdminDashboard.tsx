import React, { useState, useEffect } from 'react';
import { Film, Star, Tag, TrendingUp, Plus, Edit2, Trash2, Search, ArrowLeft } from 'lucide-react';
import { Movie } from '../../types/Movie';
import { getMovies, deleteMovie, getStats } from '../../services/database';
import MovieForm from './MovieForm';

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [stats, setStats] = useState<{ totalMovies: number; featuredMovies: number; totalGenres: number; avgRating: string | number }>({ totalMovies: 0, featuredMovies: 0, totalGenres: 0, avgRating: '0' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadData = () => {
    setMovies(getMovies());
    setStats(getStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    deleteMovie(id);
    loadData();
    setDeleteConfirm(null);
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMovie(null);
    loadData();
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.director.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showForm) {
    return (
      <MovieForm
        movie={editingMovie}
        onClose={handleFormClose}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your movies and content</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Movie
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Movies</p>
                <p className="text-3xl font-bold text-white">{stats.totalMovies}</p>
              </div>
              <Film className="w-12 h-12 text-blue-300 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-sm">Featured</p>
                <p className="text-3xl font-bold text-white">{stats.featuredMovies}</p>
              </div>
              <Star className="w-12 h-12 text-red-300 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Genres</p>
                <p className="text-3xl font-bold text-white">{stats.totalGenres}</p>
              </div>
              <Tag className="w-12 h-12 text-purple-300 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Avg Rating</p>
                <p className="text-3xl font-bold text-white">{stats.avgRating}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-300 opacity-80" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        {/* Movies Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Movie</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Year</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Genre</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Rating</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Featured</th>
                  <th className="text-left text-gray-400 font-medium px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie) => (
                  <tr key={movie.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="text-white font-medium">{movie.title}</p>
                          <p className="text-gray-500 text-sm">{movie.director}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{movie.year}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {movie.genre.slice(0, 2).map((g) => (
                          <span key={g} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                            {g}
                          </span>
                        ))}
                        {movie.genre.length > 2 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                            +{movie.genre.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-gray-300">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {movie.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {movie.featured ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Yes</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-white" />
                        </button>
                        {deleteConfirm === movie.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(movie.id)}
                              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(movie.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMovies.length === 0 && (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500">No movies found</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-2">📁 Where are movies stored?</h3>
          <p className="text-gray-400 mb-4">
            This demo uses <span className="text-red-400">LocalStorage</span> as a simulated database. In a production environment, you would:
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span><strong className="text-white">Backend Server:</strong> Use Node.js, Python, or any backend framework with a database (MongoDB, PostgreSQL, MySQL)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span><strong className="text-white">Video Storage:</strong> Upload videos to cloud storage (AWS S3, Google Cloud Storage, Cloudflare R2)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span><strong className="text-white">CDN:</strong> Serve videos through a CDN for fast streaming (CloudFront, Bunny CDN)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span><strong className="text-white">Video Encoding:</strong> Use services like AWS MediaConvert or Mux for video transcoding</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
