import React, { useState, useEffect } from 'react';
function Favorite() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteTVShows, setFavoriteTVShows] = useState([]);

  // Retrieve favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const movies = storedFavorites.filter(item => item.type === 'movie');
    const tvShows = storedFavorites.filter(item => item.type === 'tvShow');
    setFavoriteMovies(movies);
    setFavoriteTVShows(tvShows);
  }, []);

  // Function to handle removing a favorite item
  const removeFavorite = (id) => {
    const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = updatedFavorites.findIndex(item => item.id === id);
    if (index !== -1) {
      updatedFavorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      const movies = updatedFavorites.filter(item => item.type === 'movie');
      const tvShows = updatedFavorites.filter(item => item.type === 'tvShow');
      setFavoriteMovies(movies);
      setFavoriteTVShows(tvShows);
    }
  };
   const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };
  return (
    <div className="bg-[#213547] text-white">
      <h1 className="text-2xl   mb-2"> Favourite Movies</h1>
      <div className="grid grid-cols-3 gap-4">
        {favoriteMovies.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <img 
              src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} 
              alt={favorite.original_title} 
              className="w-full h-auto shadow-lg cursor-pointer"
            />
            <p className="text-center">{favorite.original_title}</p>
            {/* User Reviews */}
            <div className="mb-2">
              <textarea placeholder="Leave a review" className="w-full h-16 resize-none border rounded p-2"></textarea>
              <button className="bg-green-500 px-3 py-1 rounded text-white mt-2">Submit Review</button>
            </div>
            {/* Display other information about the favorite movie */}
            <button onClick={() => removeFavorite(favorite.id)} className="block mx-auto mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>

      <h1 className="text-2xl mt-8 mb-2"> Favorite TV Shows</h1>
      <div className="grid grid-cols-3 gap-4">
        {favoriteTVShows.map((favorite) => (
          <div key={favorite.id} className="favorite-item">
            <img 
              src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} 
              alt={favorite.name} 
              className="w-full h-auto shadow-lg  cursor-pointer"
            />
            <p className="text-center">{favorite.name}</p>
            {/* User Reviews */}
            <div className="mb-2">
              <textarea placeholder="Leave a review" className="w-full h-16 resize-none border rounded p-2"></textarea>
              <button className="bg-green-500 px-3 py-1 rounded text-white mt-2">Submit Review</button>
            </div>
            {/* Display other information about the favorite TV show */}
            <button onClick={() => removeFavorite(favorite.id)} className="block mx-auto mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
