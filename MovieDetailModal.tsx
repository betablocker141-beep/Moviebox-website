import React, { useState } from 'react';
import { X, Play, Plus, Share2, Star, Clock, Calendar, User, Film } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieDetailModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video/Backdrop section */}
        <div className="relative aspect-video">
          {isPlaying ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <video
                src={movie.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          ) : (
            <>
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              
              {/* Play button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="hidden md:block w-48 flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h2>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-semibold">{movie.rating}</span>/10
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {movie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.duration}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">{movie.description}</p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Play Now
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <Plus className="w-5 h-5" />
                  Add to List
                </button>
                <button className="flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Credits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Film className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-gray-500">Director:</span>
                    <span className="text-gray-300 ml-2">{movie.director}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-gray-500">Cast:</span>
                    <span className="text-gray-300 ml-2">{movie.cast.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
