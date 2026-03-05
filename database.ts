import { Movie, User } from '../types/Movie';

// Simulated Backend Database using LocalStorage
// In a real app, this would be API calls to a backend server

const MOVIES_KEY = 'moviebox_movies';
const USERS_KEY = 'moviebox_users';
const AUTH_KEY = 'moviebox_auth';

// Default movies data
const defaultMovies: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    year: 2024,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 8.8,
    duration: '2h 46m',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin'],
    director: 'Denis Villeneuve',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Oppenheimer',
    year: 2023,
    genre: ['Drama', 'Biography', 'History'],
    rating: 8.9,
    duration: '3h',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Robert Downey Jr.', 'Matt Damon'],
    director: 'Christopher Nolan',
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'The Batman',
    year: 2022,
    genre: ['Action', 'Crime', 'Drama'],
    rating: 8.1,
    duration: '2h 56m',
    description: 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption.',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Colin Farrell'],
    director: 'Matt Reeves',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    genre: ['Animation', 'Action', 'Adventure'],
    rating: 8.7,
    duration: '2h 20m',
    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1920&h=1080&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac'],
    director: 'Joaquim Dos Santos',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'John Wick: Chapter 4',
    year: 2023,
    genre: ['Action', 'Crime', 'Thriller'],
    rating: 8.2,
    duration: '2h 49m',
    description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård', 'Laurence Fishburne'],
    director: 'Chad Stahelski',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Interstellar',
    year: 2014,
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    rating: 8.7,
    duration: '2h 49m',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=750&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    director: 'Christopher Nolan',
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Default admin user
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@moviebox.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  }
];

// Initialize database
export const initializeDatabase = () => {
  if (!localStorage.getItem(MOVIES_KEY)) {
    localStorage.setItem(MOVIES_KEY, JSON.stringify(defaultMovies));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Movie CRUD Operations
export const getMovies = (): Movie[] => {
  const movies = localStorage.getItem(MOVIES_KEY);
  return movies ? JSON.parse(movies) : [];
};

export const getMovieById = (id: string): Movie | undefined => {
  const movies = getMovies();
  return movies.find(movie => movie.id === id);
};

export const createMovie = (movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Movie => {
  const movies = getMovies();
  const newMovie: Movie = {
    ...movie,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  movies.push(newMovie);
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
  return newMovie;
};

export const updateMovie = (id: string, updates: Partial<Movie>): Movie | null => {
  const movies = getMovies();
  const index = movies.findIndex(movie => movie.id === id);
  if (index === -1) return null;
  
  movies[index] = {
    ...movies[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
  return movies[index];
};

export const deleteMovie = (id: string): boolean => {
  const movies = getMovies();
  const filtered = movies.filter(movie => movie.id !== id);
  if (filtered.length === movies.length) return false;
  
  localStorage.setItem(MOVIES_KEY, JSON.stringify(filtered));
  return true;
};

// Authentication
export const login = (email: string, password: string): User | null => {
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...safeUser } = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = (): Omit<User, 'password'> | null => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

// Search and Filter
export const searchMovies = (query: string): Movie[] => {
  const movies = getMovies();
  const lowercaseQuery = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(lowercaseQuery) ||
    movie.director.toLowerCase().includes(lowercaseQuery) ||
    movie.cast.some(actor => actor.toLowerCase().includes(lowercaseQuery)) ||
    movie.genre.some(g => g.toLowerCase().includes(lowercaseQuery))
  );
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  const movies = getMovies();
  if (genre === 'All') return movies;
  return movies.filter(movie => movie.genre.includes(genre));
};

export const getFeaturedMovies = (): Movie[] => {
  const movies = getMovies();
  return movies.filter(movie => movie.featured);
};

// Get all unique genres
export const getAllGenres = (): string[] => {
  const movies = getMovies();
  const genres = new Set<string>();
  movies.forEach(movie => movie.genre.forEach(g => genres.add(g)));
  return ['All', ...Array.from(genres).sort()];
};

// Statistics for admin dashboard
export const getStats = () => {
  const movies = getMovies();
  return {
    totalMovies: movies.length,
    featuredMovies: movies.filter(m => m.featured).length,
    totalGenres: getAllGenres().length - 1,
    avgRating: movies.length > 0 
      ? (movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1)
      : 0
  };
};
