import React from 'react';
import { Play, Star, Info } from 'lucide-react';
import { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2 mb-3">
            <button className="flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
              <Play className="w-5 h-5 text-white fill-white" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors">
              <Info className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {movie.rating}
            </span>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>
        </div>

        {/* Featured badge */}
        {movie.featured && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-medium">
            Featured
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-md">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-white text-xs font-medium">{movie.rating}</span>
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
        <p className="text-gray-400 text-xs truncate">{movie.genre.slice(0, 2).join(' • ')}</p>
      </div>
    </div>
  );
};

export default MovieCard;
