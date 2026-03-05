import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { initializeDatabase, getMovies, getFeaturedMovies, getMoviesByGenre, getAllGenres, searchMovies } from './services/database';
import { Movie } from './types/Movie';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MovieCard from './components/MovieCard';
import MovieDetailModal from './components/MovieDetailModal';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import Footer from './components/Footer';

// Initialize the database on app load
initializeDatabase();

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const loadData = () => {
    const allMovies = getMovies();
    const featured = getFeaturedMovies();
    setMovies(allMovies);
    setGenres(getAllGenres());
    if (featured.length > 0) {
      setFeaturedMovie(featured[Math.floor(Math.random() * featured.length)]);
    } else if (allMovies.length > 0) {
      setFeaturedMovie(allMovies[0]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (currentView === 'home') {
      loadData();
    }
  }, [currentView]);

  // Filter movies based on search and genre
  const filteredMovies = React.useMemo(() => {
    let result = movies;
    
    if (searchQuery.trim()) {
      result = searchMovies(searchQuery);
    } else if (selectedGenre !== 'All') {
      result = getMoviesByGenre(selectedGenre);
    }
    
    return result;
  }, [movies, searchQuery, selectedGenre]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailModalOpen(true);
  };

  if (currentView === 'admin') {
    return (
      <>
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onAdminClick={() => setCurrentView('admin')}
          currentView={currentView}
        />
        <AdminDashboard onBack={() => setCurrentView('home')} />
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onAdminClick={() => setCurrentView('admin')}
        currentView={currentView}
      />

      {/* Hero Section */}
      {featuredMovie && !searchQuery && (
        <HeroSection movie={featuredMovie} onPlay={handleMovieClick} />
      )}

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 ${searchQuery ? 'pt-24' : '-mt-32 relative z-10'}`}>
        {/* Genre Filter */}
        {!searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Browse by Genre</h2>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedGenre === genre
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Search results for "{searchQuery}"
            </h2>
            <p className="text-gray-400">{filteredMovies.length} movies found</p>
          </div>
        )}

        {/* Movies Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {searchQuery ? '' : selectedGenre === 'All' ? 'All Movies' : `${selectedGenre} Movies`}
            </h2>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No movies found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-red-500 hover:text-red-400 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </section>

        {/* Featured Section */}
        {!searchQuery && selectedGenre === 'All' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Trending Now 🔥</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.slice(0, 3).map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="relative group rounded-xl overflow-hidden cursor-pointer aspect-video"
                >
                  <img
                    src={movie.backdrop}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                    <p className="text-gray-300 text-sm">{movie.year} • {movie.genre[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedMovie(null);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
