import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import playIcon from '../../assets/Images/playIcon.png';
import heartIcon from '../../assets/Images/heartIcon.png';

function TVSHOWS() {
  const [TVShows, setTVShows] = useState([]);
   const handleAddToFavourite = (id, name, poster_path) => {
    const favoriteItem = { id, name, poster_path, type: 'tvShow' }; // Include type as 'tvShow'
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...existingFavorites, favoriteItem];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  const getTVShows = async () =>{
    try {
      const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1');
      const data = await response.json();
      setTVShows(data.results);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTVShows();
  }, []);

  return (
    <div className="bg-[#213547]">
      <h1 className="text-3xl text-center pt-8 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans">Popular TV Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TVShows.map((data) => (
          <div key={data.id} className="flex flex-col items-center relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              className="w-80 h-98 object-cover shadow-lg mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
              alt={data.name}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/watchlists`}>
                <img
                  src={playIcon}
                  className="w-16 h-16 text-white fill-current cursor-pointer"
                />
              </Link>
            </div>
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleAddToFavourite(data.id, data.name, data.poster_path)} className="flex items-center text-black text-sm">
                Add to Favourite
                <img src={heartIcon} alt="Heart Icon" className="w-5 h-5 ml-1 mr-1" />
              </button>
            </div>
            <div className="text-white text-center">
              <p className="cursor-pointer">{data.name}</p>
              <div className="flex justify-center space-x-10 mr-7 mt-3">
                <span className="bg-gray-900 text-white px-5 rounded-full">HD</span>
                <span>{data.vote_average}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TVSHOWS;
