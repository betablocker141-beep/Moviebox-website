import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Image, Film } from 'lucide-react';
import { Movie, MovieFormData } from '../../types/Movie';
import { createMovie, updateMovie } from '../../services/database';

interface MovieFormProps {
  movie: Movie | null;
  onClose: () => void;
}

const availableGenres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror',
  'Music', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
];

const MovieForm: React.FC<MovieFormProps> = ({ movie, onClose }) => {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    year: new Date().getFullYear(),
    genre: [],
    rating: 7.0,
    duration: '2h 0m',
    description: '',
    poster: '',
    backdrop: '',
    videoUrl: '',
    trailerUrl: '',
    cast: '',
    director: '',
    featured: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof MovieFormData, string>>>({});

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        description: movie.description,
        poster: movie.poster,
        backdrop: movie.backdrop,
        videoUrl: movie.videoUrl,
        trailerUrl: movie.trailerUrl,
        cast: movie.cast.join(', '),
        director: movie.director,
        featured: movie.featured
      });
    }
  }, [movie]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof MovieFormData, string>> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.poster.trim()) newErrors.poster = 'Poster URL is required';
    if (!formData.backdrop.trim()) newErrors.backdrop = 'Backdrop URL is required';
    if (formData.genre.length === 0) newErrors.genre = 'Select at least one genre';
    if (!formData.director.trim()) newErrors.director = 'Director is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const movieData = {
      title: formData.title,
      year: formData.year,
      genre: formData.genre,
      rating: formData.rating,
      duration: formData.duration,
      description: formData.description,
      poster: formData.poster,
      backdrop: formData.backdrop,
      videoUrl: formData.videoUrl,
      trailerUrl: formData.trailerUrl,
      cast: formData.cast.split(',').map(c => c.trim()).filter(c => c),
      director: formData.director,
      featured: formData.featured
    };

    if (movie) {
      updateMovie(movie.id, movieData);
    } else {
      createMovie(movieData);
    }

    onClose();
  };

  const toggleGenre = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onClose}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {movie ? 'Edit Movie' : 'Add New Movie'}
            </h1>
            <p className="text-gray-400">Fill in the details below</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Film className="w-5 h-5 text-red-500" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.title ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Enter movie title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Year *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="e.g., 2h 30m"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Rating (0-10)</label>
                <input
                  type="number"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Director *</label>
                <input
                  type="text"
                  value={formData.director}
                  onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                  className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.director ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Director name"
                />
                {errors.director && <p className="text-red-500 text-sm mt-1">{errors.director}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm mb-2">Cast (comma-separated)</label>
                <input
                  type="text"
                  value={formData.cast}
                  onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Actor 1, Actor 2, Actor 3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 resize-none ${errors.description ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Enter movie description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Genres *</h2>
            {errors.genre && <p className="text-red-500 text-sm mb-2">{errors.genre}</p>}
            <div className="flex flex-wrap gap-2">
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.genre.includes(genre)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Media URLs */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Image className="w-5 h-5 text-red-500" />
              Media URLs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Poster URL *</label>
                <input
                  type="url"
                  value={formData.poster}
                  onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                  className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.poster ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="https://example.com/poster.jpg"
                />
                {errors.poster && <p className="text-red-500 text-sm mt-1">{errors.poster}</p>}
                {formData.poster && (
                  <img src={formData.poster} alt="Poster preview" className="mt-2 w-24 h-36 object-cover rounded" />
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Backdrop URL *</label>
                <input
                  type="url"
                  value={formData.backdrop}
                  onChange={(e) => setFormData({ ...formData, backdrop: e.target.value })}
                  className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.backdrop ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="https://example.com/backdrop.jpg"
                />
                {errors.backdrop && <p className="text-red-500 text-sm mt-1">{errors.backdrop}</p>}
                {formData.backdrop && (
                  <img src={formData.backdrop} alt="Backdrop preview" className="mt-2 w-40 h-24 object-cover rounded" />
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="https://example.com/movie.mp4"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Trailer URL</label>
                <input
                  type="url"
                  value={formData.trailerUrl}
                  onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400 text-sm">
                <strong className="text-white">💡 Tip:</strong> For testing, you can use image URLs from{' '}
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                  Unsplash
                </a>{' '}
                or{' '}
                <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                  Picsum Photos
                </a>
              </p>
            </div>
          </div>

          {/* Featured */}
          <div className="bg-gray-900 rounded-xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-red-600 focus:ring-red-600 focus:ring-offset-gray-900"
              />
              <div>
                <span className="text-white font-medium">Featured Movie</span>
                <p className="text-gray-400 text-sm">Display this movie in the hero section</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition-colors"
            >
              <Save className="w-5 h-5" />
              {movie ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
