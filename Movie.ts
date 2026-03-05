export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  duration: string;
  description: string;
  poster: string;
  backdrop: string;
  videoUrl: string;
  trailerUrl: string;
  cast: string[];
  director: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MovieFormData {
  title: string;
  year: number;
  genre: string[];
  rating: number;
  duration: string;
  description: string;
  poster: string;
  backdrop: string;
  videoUrl: string;
  trailerUrl: string;
  cast: string;
  director: string;
  featured: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}
