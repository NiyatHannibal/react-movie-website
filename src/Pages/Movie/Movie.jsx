import React, { useEffect, useState } from 'react';
import Moviepagecard from '../../Components/Moviepagecard';
function Movie() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const handleAddToFavourite = (id, original_title, poster_path) => {
    const favoriteItem = { id, original_title, poster_path, type: 'movie' };
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...existingFavorites, favoriteItem];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const getPopularMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setPopularMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };
 
  const getTrendingMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };


  const getUpcomingMovies = async () => {
   try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setUpcomingMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getTrendingMovies();
    getUpcomingMovies();
  }, []);

  return (
    <div className="bg-[#213547]">
      <h1 className="text-3xl pt-8 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans">Popular Movies</h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {popularMovies.map((movie) => (
         <Moviepagecard key={movie.id} movie={movie} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
            <h1 className="text-3xl pt-8 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans">Popular Movies</h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {trendingMovies.map((movie) => (
         <Moviepagecard key={movie.id} movie={movie} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
          <h1 className="text-3xl pt-8 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans">Popular Movies</h1>
      <div className="w-full overflow-x-scroll whitespace-nowrap scrollbar-none scroll-smooth relative">
        <div className="flex space-x-4 p-4">
          {upcomingMovies.map((movie) => (
         <Moviepagecard key={movie.id} movie={movie} handleAddToFavourite={handleAddToFavourite} />
          ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Movie;
