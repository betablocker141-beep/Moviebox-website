import React from 'react';
import { Play, Plus, Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types/Movie';

interface HeroSectionProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative h-[85vh] min-h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            {/* Featured badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-white" />
              Featured Movie
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
              <span className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-semibold">{movie.rating}</span>/10
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                {movie.year}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-5 h-5" />
                {movie.duration}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 line-clamp-3">
              {movie.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onPlay(movie)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              >
                <Play className="w-6 h-6 fill-white" />
                Play Now
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 border border-white/20">
                <Plus className="w-6 h-6" />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
